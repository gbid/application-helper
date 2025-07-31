use crate::core::error::{Error, LogErrAndFatal};
use indoc::eprintdoc;
use std::path::PathBuf;
use std::process::{Output, Stdio};
use tempfile::tempdir;
use tempfile::NamedTempFile;
use tempfile::TempDir;
use tokio::fs::File;
use tokio::io::AsyncReadExt;
use tokio::io::AsyncWriteExt;
use tokio::process::Command;

async fn prepare_pdf(pdf: &[u8]) -> Result<String, Error> {
    match prepare_pdf_with_pdftotext(pdf).await {
        Ok(text) if !text.trim().is_empty() => Ok(text),
        _ => prepare_pdf_with_tesseract(pdf).await,
    }
}

async fn prepare_pdf_with_tesseract(pdf: &[u8]) -> Result<String, Error> {
    // First convert PDF to images using pdftoppm
    let temp_dir = TempDir::new().map_err(|e| {
        eprintln!("Failed to create temporary directory: {}", e);
        Error::Fatal
    })?;
    let output_path = temp_dir.path().to_path_buf();

    let mut pdftoppm = Command::new("pdftoppm")
        .arg("-png")
        .arg("-r")
        .arg("300")
        .arg("-")
        .arg(output_path.join("page"))
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|e| {
            eprintln!("Failed to spawn pdftoppm: {}", e);
            Error::Fatal
        })?;

    pdftoppm
        .stdin
        .as_mut()
        .expect("Failed to get pdftoppm stdin")
        .write_all(pdf)
        .await
        .map_err(|e| {
            eprintln!("Failed to write to pdftoppm stdin: {}", e);
            Error::Fatal
        })?;

    let output = pdftoppm.wait_with_output().await.map_err(|e| {
        eprintln!("Failed to wait for pdftoppm: {}", e);
        Error::Fatal
    })?;

    if !output.status.success() {
        eprintln!("pdftoppm failed: {:?}", output);
        return Err(Error::Fatal);
    }

    // Process each page with tesseract
    let mut full_text = String::new();
    let mut entries = tokio::fs::read_dir(&output_path).await.map_err(|e| {
        eprintln!("Failed to read temporary directory: {}", e);
        Error::Fatal
    })?;

    while let Some(entry) = entries.next_entry().await.map_err(|e| {
        eprintln!("Failed to read directory entry: {}", e);
        Error::Fatal
    })? {
        let path = entry.path();
        if path.is_file() && path.extension().map_or(false, |ext| ext == "png") {
            let tesseract = Command::new("tesseract")
                .arg(&path)
                .arg("stdout")
                .arg("-l")
                // TODO: just German + English for now
                .arg("deu+eng")
                .stdout(Stdio::piped())
                .stderr(Stdio::piped())
                .spawn()
                .map_err(|e| {
                    eprintln!("Failed to spawn tesseract: {}", e);
                    Error::Fatal
                })?;

            let output = tesseract.wait_with_output().await.map_err(|e| {
                eprintln!("Failed to wait for tesseract: {}", e);
                Error::Fatal
            })?;

            if !output.status.success() {
                eprintln!("tesseract failed: {:?}", output);
                return Err(Error::Fatal);
            }

            let page_text = String::from_utf8(output.stdout).unwrap_or_else(|err| {
                eprintln!("tesseract output is not unicode: {}", err);
                String::from_utf8_lossy(&err.into_bytes()).into_owned()
            });

            full_text.push_str(&page_text);
            full_text.push('\n');
        }
    }

    Ok(full_text)
}

async fn prepare_pdf_with_pdftotext(pdf: &[u8]) -> Result<String, crate::core::error::Error> {
    let mut pdftotext = Command::new("pdftotext")
        // Input pdf from stdin.
        .arg("-")
        // Output text to stdout.
        .arg("-")
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .log_and_fatal()?;
    let stdin = pdftotext.stdin.as_mut().ok_or_else(|| {
        eprintln!("Failed to get pdftotext stdin");
        Error::Fatal
    })?;

    stdin.write_all(pdf).await.log_and_fatal()?;

    let Output {
        status,
        stdout,
        stderr,
    } = pdftotext.wait_with_output().await.log_and_fatal()?;
    if !status.success() {
        let stderr = String::from_utf8_lossy(&stderr);
        eprintdoc! {"
            pdftotext exited with status {status}:
            {stderr}
        "};
    }
    let result = String::from_utf8(stdout).unwrap_or_else(|err| {
        eprintdoc! {"
            pdftotext output is not unicode: {err}
        "};
        String::from_utf8_lossy(&err.into_bytes()).into_owned()
    });
    Ok(result)
}

pub async fn prepare_document(document: &[u8]) -> Result<String, Error> {
    let pdf = convert_document_to_pdf(document).await?;
    prepare_pdf(&pdf).await
}

#[derive(Debug)]
enum PdfImagesOutputFormat {
    Png,
}

impl PdfImagesOutputFormat {
    fn to_arg(&self) -> String {
        match self {
            PdfImagesOutputFormat::Png => "-png",
        }
        .to_string()
    }
}

#[derive(Debug)]
enum PdfImagesInputSource {
    Stdin,
}

impl PdfImagesInputSource {
    fn to_arg(&self) -> String {
        match self {
            PdfImagesInputSource::Stdin => "-",
        }
        .to_string()
    }
}

#[derive(Debug)]
struct PdfImagesImageRoot {
    output_directory: PathBuf,
}

impl PdfImagesImageRoot {
    fn to_arg(&self) -> String {
        format!("{}/", self.output_directory.display())
    }
}

#[derive(Debug)]
struct PdfImagesOptions {
    input_source: PdfImagesInputSource,
    output_format: PdfImagesOutputFormat,
    image_root: PdfImagesImageRoot,
}

impl PdfImagesOptions {
    fn to_args(&self) -> Vec<String> {
        vec![
            self.output_format.to_arg(),
            self.input_source.to_arg(),
            self.image_root.to_arg(),
        ]
    }
}

/// Currently, we spawn a separate LibreOffice process with its own profile for every call to this
/// function.
/// The following thread in the LibreOffice forum however rather suggests to keep the libreoffice
/// instances running (I guess as a systemd service) for performance reasons.
/// https://ask.libreoffice.org/t/running-several-instances-of-headless-libreoffice-wheres-race/104816/4
/// We should consider doing this in case we notice performance issues.
///
/// LibreOffice wants the following packages, otherwise it complains:
/// - default-jre libreoffice-java-common
/// - warning if not present: `Warning: failed to launch javaldx -
///   java may not function correctly`
/// - I have not noticed any acutal functional errors before installing these package though.
///
/// Alternatives to LibreOffice:
/// - docx2txt: does not extract images
///
/// In general, I would rather have a standard way of converting different formats to pdf and then
/// have a standard way of extracting text and images from pdf as we currently do.
async fn convert_docx_to_pdf(docx: &[u8]) -> Result<Vec<u8>, Error> {
    let profile_dir = tempdir().map_err(|e| {
        eprintln!(
            "Failed to create temporary LibreOffice profile directory: {}",
            e
        );
        Error::Fatal
    })?;
    let profile_path = profile_dir.path().to_path_buf();

    let temp_docx = NamedTempFile::new().map_err(|e| {
        eprintln!("Failed to create temporary DOCX file: {}", e);
        Error::Fatal
    })?;
    let temp_docx_path = temp_docx.path().to_path_buf();

    tokio::fs::write(&temp_docx_path, docx).await.map_err(|e| {
        eprintln!("Failed to write DOCX to temporary file: {}", e);
        Error::Fatal
    })?;

    let temp_pdf_path = temp_docx_path.with_extension("pdf");

    let soffice = Command::new("soffice")
        .arg("--headless")
        .arg("--norestore")
        .arg(format!(
            "-env:UserInstallation=file://{}",
            profile_path.display()
        ))
        .arg("--convert-to")
        .arg("pdf")
        .arg("--outdir")
        .arg(temp_docx_path.parent().unwrap())
        .arg(&temp_docx_path)
        .spawn()
        .map_err(|e| {
            eprintln!("Failed to start LibreOffice for conversion: {}", e);
            Error::Fatal
        })?;

    let output = soffice.wait_with_output().await.map_err(|e| {
        eprintln!("Failed to wait for LibreOffice process: {}", e);
        Error::Fatal
    })?;

    if !output.status.success() {
        eprintln!("LibreOffice conversion failed: {:?}", output);
        return Err(Error::Fatal);
    }

    let pdf_content = tokio::fs::read(&temp_pdf_path).await.map_err(|e| {
        eprintln!("Failed to read converted PDF: {}", e);
        Error::Fatal
    })?;

    profile_dir.close().map_err(|e| {
        eprintln!("Failed to clean up temporary profile directory: {}", e);
        Error::Fatal
    })?;

    Ok(pdf_content)
}

async fn convert_document_to_pdf(document: &[u8]) -> Result<Vec<u8>, Error> {
    let file_type = infer::get(document).ok_or_else(|| {
        eprintln!("Unknown file type");
        Error::Fatal
    })?;
    let pdf = match file_type.mime_type() {
        "application/pdf" => document.to_vec(),
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        | "application/msword" => convert_docx_to_pdf(document).await?,
        _ => {
            eprintln!("Unsupported file type {}", file_type.mime_type());
            return Err(Error::Fatal);
        }
    };
    Ok(pdf)
}

async fn extract_images_from_pdf(pdf: &[u8]) -> Result<Vec<Vec<u8>>, Error> {
    let temp_dir = TempDir::new().map_err(|e| {
        eprintln!("Failed to create temporary directory: {}", e);
        Error::Fatal
    })?;
    let output_path = temp_dir.path().to_path_buf();

    let options = PdfImagesOptions {
        input_source: PdfImagesInputSource::Stdin,
        output_format: PdfImagesOutputFormat::Png,
        image_root: PdfImagesImageRoot {
            output_directory: output_path.clone(),
        },
    };

    let mut pdfimages = Command::new("pdfimages")
        .args(options.to_args())
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|e| {
            eprintln!("Failed to spawn pdfimages: {}", e);
            Error::Fatal
        })?;

    let stdin = pdfimages.stdin.as_mut().ok_or_else(|| {
        eprintln!("Failed to get pdfimages stdin");
        Error::Fatal
    })?;
    stdin.write_all(pdf).await.map_err(|e| {
        eprintln!("Failed to write to pdfimages stdin: {}", e);
        Error::Fatal
    })?;

    let output = pdfimages.wait_with_output().await.map_err(|e| {
        eprintln!("Failed to wait for pdfimages: {}", e);
        Error::Fatal
    })?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        eprintln!("pdfimages exited with status {}: {}", output.status, stderr);
        return Err(Error::Fatal);
    }

    let mut images = Vec::new();
    let mut entries = tokio::fs::read_dir(&output_path).await.map_err(|e| {
        eprintln!("Failed to read temporary directory: {}", e);
        Error::Fatal
    })?;

    while let Some(entry) = entries.next_entry().await.map_err(|e| {
        eprintln!("Failed to read directory entry: {}", e);
        Error::Fatal
    })? {
        let path = entry.path();
        if path.is_file() {
            let mut file = File::open(&path).await.map_err(|e| {
                eprintln!("Failed to open file {}: {}", path.display(), e);
                Error::Fatal
            })?;
            let mut buffer = Vec::new();
            file.read_to_end(&mut buffer).await.map_err(|e| {
                eprintln!("Failed to read file {}: {}", path.display(), e);
                Error::Fatal
            })?;
            images.push(buffer);
        }
    }

    Ok(images)
}

pub async fn extract_images_from_document(document: &[u8]) -> Result<Vec<Vec<u8>>, Error> {
    let pdf = convert_document_to_pdf(document).await?;
    extract_images_from_pdf(&pdf).await
}
