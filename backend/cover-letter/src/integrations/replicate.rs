use crate::core::error::Error;
use crate::core::error::LogErrAndTransient;
use crate::core::model::HeadshotGenerationImage;
use crate::credentials::REPLICATE_API_TOKEN;
use crate::utils::api_utils::ApiUtils;
use chrono::{DateTime, Utc};
use once_cell::sync::Lazy;
use reqwest::multipart;
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::io::Write;
use std::time::Duration;
use url::Url;

const CACHE_DIR: &str = "/tmp/bewerbungshelfer/cache/replicate";
static API_UTILS: Lazy<ApiUtils> = Lazy::new(|| {
    ApiUtils::new(
        std::path::PathBuf::from(CACHE_DIR),
        // TODO: set this more appropriately
        5,
        Duration::from_secs(10),
    )
});

static HTTP_CLIENT: Lazy<reqwest::Client> = Lazy::new(|| {
    reqwest::ClientBuilder::new()
        .timeout(Duration::from_secs(60))
        .build()
        .expect("Failed to create HTTP client")
});

const USER_NAME: &str = "gbid";

#[derive(Debug, Serialize, Deserialize)]
pub struct FileResponse {
    pub id: String,
    pub name: String,
    pub content_type: String,
    pub size: i64,
    pub etag: String,
    pub checksums: FileChecksums,
    pub metadata: HashMap<String, serde_json::Value>,
    pub created_at: DateTime<Utc>,
    pub expires_at: DateTime<Utc>,
    pub urls: FileUrls,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FileChecksums {
    pub sha256: String,
    pub md5: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FileUrls {
    pub get: Url,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TrainingResponse {
    pub id: String,
    pub model: String,
    // the version of the model being trained
    pub version: String,
    pub input: TrainingInput,
    pub logs: String,
    pub error: Option<String>,
    pub status: TrainingResponseStatus,
    pub created_at: DateTime<Utc>,
    pub started_at: Option<DateTime<Utc>>,
    pub completed_at: Option<DateTime<Utc>>,
    pub urls: TrainingUrls,
    pub output: Option<TrainingOutput>,
    pub metrics: Option<TrainingMetrics>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum TrainingResponseStatus {
    Starting,
    Processing,
    Succeeded,
    Failed,
    Canceled,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TrainingUrls {
    pub get: String,
    pub cancel: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TrainingOutput {
    // the version (actually, the complete URL) of the model resulting from training
    pub version: Option<String>,
    pub weights: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TrainingInput {
    pub input_images: String,
    pub trigger_word: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TrainingMetrics {
    pub predict_time: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PredictionResponse {
    pub id: String,
    pub model: String,
    pub version: String,
    pub input: HashMap<String, serde_json::Value>,
    pub logs: String,
    pub error: Option<String>,
    pub status: PredictionStatus,
    pub created_at: DateTime<Utc>,
    pub started_at: Option<DateTime<Utc>>,
    pub completed_at: Option<DateTime<Utc>>,
    pub urls: PredictionUrls,
    pub output: Option<PredictionOutput>,
    pub metrics: Option<PredictionMetrics>,
    pub data_removed: bool,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub enum PredictionStatus {
    Starting,
    Processing,
    Succeeded,
    Failed,
    Canceled,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PredictionUrls {
    pub get: String,
    pub cancel: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub stream: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PredictionMetrics {
    pub predict_time: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PredictionOutput(pub Vec<String>);

pub async fn upload_training_data(zip_data: Vec<u8>) -> Result<FileResponse, Error> {
    let part = multipart::Part::bytes(zip_data)
        .file_name("data.zip")
        .mime_str("application/zip")
        .map_err(|e| {
            eprintln!("Failed to create multipart part: {e}");
            Error::Fatal
        })?;

    let form = multipart::Form::new().part("content", part);

    let response = HTTP_CLIENT
        .post(Endpoint::Files.url())
        .header("Authorization", format!("Bearer {REPLICATE_API_TOKEN}"))
        .multipart(form)
        .send()
        .await
        .map_err(|e| {
            eprintln!("Failed to upload training data: {e}");
            Error::Fatal
        })?;

    handle_response(response).await
}

pub async fn start_training(
    model_name: &str,
    images: &[HeadshotGenerationImage],
    trigger_word: &str,
) -> Result<TrainingResponse, Error> {
    let mut image_refs: Vec<&HeadshotGenerationImage> = images.iter().collect();
    image_refs.sort_by(|a, b| a.filename.cmp(&b.filename));

    let mut zip_buffer = Vec::new();
    let mut zip = zip::ZipWriter::new(std::io::Cursor::new(&mut zip_buffer));

    for image in &image_refs {
        zip.start_file::<_, zip::write::ExtendedFileOptions>(
            &image.filename,
            zip::write::FileOptions::default().compression_method(zip::CompressionMethod::Stored),
        )
        .map_err(|e| {
            eprintln!("Failed to start zip file: {e}");
            Error::Fatal
        })?;
        zip.write_all(&image.byte_content).map_err(|e| {
            eprintln!("Failed to write zip file: {e}");
            Error::Fatal
        })?;
    }

    zip.finish().map_err(|e| {
        eprintln!("Failed to finish zip: {e}");
        Error::Fatal
    })?;

    let mut cache_slices: Vec<&[u8]> = Vec::with_capacity(2 * image_refs.len() + 2);
    for img in &image_refs {
        cache_slices.push(img.filename.as_bytes());
        cache_slices.push(&img.byte_content);
    }
    cache_slices.push(trigger_word.as_bytes());
    cache_slices.push(model_name.as_bytes());

    let response_body = match API_UTILS.get_cached(&cache_slices).await {
        Some(response_body) => response_body,
        None => {
            let input_images_url = upload_training_data(zip_buffer).await?.urls.get.to_string();

            let response = HTTP_CLIENT
                .post(Endpoint::FluxDevLoraTrainer.url())
                .header("Authorization", format!("Bearer {REPLICATE_API_TOKEN}"))
                .json(&serde_json::json!({
                    "destination": format!("{}/{}", USER_NAME, model_name),
                    "input": {
                        "input_images": input_images_url,
                        "trigger_word": trigger_word,
                        "steps": 1000,
                    }
                }))
                .send()
                .await
                .map_err(|e| {
                    eprintln!("Failed to start training: {e}");
                    Error::Fatal
                })?;
            let status = response.status();
            if !status.is_success() {
                eprintln!("Replicate request to start training failed with status {status}");
                return Err(Error::Fatal);
            }
            let response_body = response.text().await.map_err(|e| {
                eprintln!("Failed to read response body: {e}");
                Error::Fatal
            })?;
            API_UTILS
                .put_cached(&cache_slices, &response_body.as_bytes())
                .await;
            response_body
        }
    };

    serde_json::from_str(&response_body).map_err(|e| {
        eprintln!("Failed to parse response body: {e}");
        Error::Fatal
    })
}

pub async fn check_training_status(training_id: &str) -> Result<TrainingResponse, Error> {
    let response = HTTP_CLIENT
        .get(Endpoint::Trainings(TrainingsEndpoint::Get(training_id.to_owned())).url())
        .header("Authorization", format!("Bearer {REPLICATE_API_TOKEN}"))
        .send()
        .await
        .map_err(|e| {
            eprintln!("Failed to check training status: {e}");
            Error::Fatal
        })?;

    handle_response(response).await
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum AspectRatio {
    #[serde(rename = "1:1")]
    #[allow(dead_code)]
    OneByOne,
    #[serde(rename = "16:9")]
    #[allow(dead_code)]
    SixteenByNine,
    #[serde(rename = "21:9")]
    #[allow(dead_code)]
    TwentyOneByNine,
    #[serde(rename = "3:2")]
    #[allow(dead_code)]
    ThreeByTwo,
    #[serde(rename = "2:3")]
    #[allow(dead_code)]
    TwoByThree,
    #[serde(rename = "4:5")]
    #[allow(dead_code)]
    FourByFive,
    #[serde(rename = "5:4")]
    #[allow(dead_code)]
    FiveByFour,
    #[serde(rename = "3:4")]
    #[allow(dead_code)]
    ThreeByFour,
    #[serde(rename = "4:3")]
    #[allow(dead_code)]
    FourByThree,
    #[serde(rename = "9:16")]
    #[allow(dead_code)]
    NineBySixteen,
    #[serde(rename = "9:21")]
    #[allow(dead_code)]
    NineByTwentyOne,
    #[allow(dead_code)]
    Custom,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum Model {
    #[allow(dead_code)]
    Dev,
    #[allow(dead_code)]
    Schnell,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum OutputFormat {
    Webp,
    #[allow(dead_code)]
    Jpg,
    #[allow(dead_code)]
    Png,
}

#[derive(Debug, Serialize)]
pub struct PredictionRequest {
    prompt: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    image: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    mask: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    aspect_ratio: Option<AspectRatio>,
    #[serde(skip_serializing_if = "Option::is_none")]
    width: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    height: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    num_outputs: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    lora_scale: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    num_inference_steps: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    model: Option<Model>,
    #[serde(skip_serializing_if = "Option::is_none")]
    guidance_scale: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    prompt_strength: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    seed: Option<i32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    extra_lora: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    extra_lora_scale: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    output_format: Option<OutputFormat>,
    #[serde(skip_serializing_if = "Option::is_none")]
    output_quality: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    disable_safety_checker: Option<bool>,
}

impl PredictionRequest {
    pub fn new(prompt: String) -> Self {
        Self {
            prompt,
            image: None,
            mask: None,
            aspect_ratio: None,
            width: None,
            height: None,
            num_outputs: None,
            lora_scale: None,
            num_inference_steps: None,
            model: None,
            guidance_scale: None,
            prompt_strength: None,
            seed: None,
            extra_lora: None,
            extra_lora_scale: None,
            output_format: None,
            output_quality: None,
            disable_safety_checker: None,
        }
    }
}

// TODO: Implement proper caching.
// Currently, we just cache the initial PredictionResponse we get from the creation of the
// prediction. For cached results, this includes the id of the prediction, which is then polled.
// This is not ideal, as the prediction might have been deleted in the meantime.
// Also, the prediction returns a URL to the resulting prediction which most probably expires.
// The latter of the two problems should be solved by downloading the prediction and caching
// or storing it in the database.
pub async fn create_prediction(
    model_id: &str,
    trigger_word: &str,
    prompt: &str,
    num_outputs: u32,
    seed: i32,
) -> Result<PredictionResponse, Error> {
    // TODO: can we assert at compile time that the trigger_word is present in the prompt?
    assert!(prompt.contains(trigger_word));
    let request = PredictionRequest {
        prompt: prompt.to_string(),
        num_outputs: Some(num_outputs),
        model: Some(Model::Dev),
        width: Some(1024),
        height: Some(1024),
        num_inference_steps: Some(28),
        guidance_scale: Some(3.5),
        output_format: Some(OutputFormat::Webp),
        output_quality: Some(90),
        seed: Some(seed),
        aspect_ratio: Some(AspectRatio::ThreeByFour),
        ..PredictionRequest::new(String::new())
    };

    let request_input: serde_json::Value =
        serde_json::to_value(&request).expect("Failed to serialize request");

    let request = serde_json::json!({
        "version": model_id,
        "input": request_input,
    });
    let request_body = serde_json::to_string_pretty(&request).expect("Failed to serialize request");

    let endpoint = Endpoint::Predictions(PredictionsEndpoint::Post);
    let (status, response_body) = fetch_response(&request_body, endpoint).await?;

    if !status.is_success() {
        eprintln!("Failed to create prediction: {response_body}");
        return Err(Error::Fatal);
    }

    serde_json::from_str(&response_body).map_err(|e| {
        eprintln!("Failed to parse response body: {e}");
        Error::Fatal
    })
}
#[derive(Debug, Serialize, Deserialize)]
pub struct GeneratedImagesWithPredictionId {
    pub replicate_prediction_id: String,
    pub images: Vec<Vec<u8>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum CachedPrediction {
    Images(GeneratedImagesWithPredictionId),
    Status(PredictionResponse),
}

pub async fn create_prediction_and_poll(
    model_id: &str,
    trigger_word: &str,
    prompt: &str,
    num_outputs: u32,
    seed: i32,
) -> Result<GeneratedImagesWithPredictionId, Error> {
    let request = PredictionRequest {
        prompt: prompt.to_string(),
        num_outputs: Some(num_outputs),
        model: Some(Model::Dev),
        width: Some(1024),
        height: Some(1024),
        num_inference_steps: Some(28),
        guidance_scale: Some(3.5),
        output_format: Some(OutputFormat::Webp),
        output_quality: Some(90),
        seed: Some(seed),
        aspect_ratio: Some(AspectRatio::ThreeByFour),
        ..PredictionRequest::new(String::new())
    };
    let request_json = serde_json::json!({
        "version": model_id,
        "input": request,
    });
    let cache_key = serde_json::to_string_pretty(&request_json)
        .expect("Failed to serialize request")
        .into_bytes();
    let cached_data = API_UTILS
        .get_cached(&[&cache_key])
        .await
        .map(|cached_data| {
            serde_json::from_str(&cached_data).map_err(|e| {
                eprintln!("Failed to deserialize cached prediction: {e}");
                Error::Fatal
            })
        })
        .transpose()?;

    let mut prediction_result = match cached_data {
        Some(CachedPrediction::Images(images)) => {
            return Ok(images);
        }
        Some(CachedPrediction::Status(status)) => status,
        // TODO: I think we are constructing the prediction request twice here.
        None => create_prediction(model_id, trigger_word, prompt, num_outputs, seed).await?,
    };

    loop {
        // TODO: once we handle retries upon failire / cancellaton, we should probably not cache
        // failed prediction results.
        let cached_prediction_result = CachedPrediction::Status(prediction_result.clone());
        let cached_data = serde_json::to_string(&cached_prediction_result).map_err(|e| {
            eprintln!("Failed to serialize prediction output: {e}");
            Error::Fatal
        })?;
        API_UTILS
            .put_cached(&[&cache_key], cached_data.as_bytes())
            .await;
        match prediction_result.status {
            PredictionStatus::Succeeded => {
                break;
            }
            PredictionStatus::Failed => {
                eprintln!("Prediction failed: {:?}", prediction_result.error);
                return Err(Error::Fatal);
            }
            PredictionStatus::Canceled => {
                eprintln!("Prediction was canceled");
                return Err(Error::Fatal);
            }
            _ => {
                tokio::time::sleep(Duration::from_secs(1)).await;
                prediction_result = check_prediction_status(&prediction_result.id).await?;
            }
        }
    }

    if let Some(PredictionOutput(image_urls)) = prediction_result.output {
        let mut downloaded_images = Vec::new();
        for url in image_urls {
            let response = HTTP_CLIENT.get(&url).send().await.map_err(|e| {
                eprintln!("Failed to download image: {e}");
                Error::Fatal
            })?;

            if !response.status().is_success() {
                eprintln!("Failed to download image, status: {}", response.status());
                return Err(Error::Fatal);
            }

            let image_data = response.bytes().await.map_err(|e| {
                eprintln!("Failed to read image data: {e}");
                Error::Fatal
            })?;

            downloaded_images.push(image_data.to_vec());
        }

        let generated_images = GeneratedImagesWithPredictionId {
            replicate_prediction_id: prediction_result.id,
            images: downloaded_images,
        };

        let cached_prediction = CachedPrediction::Images(generated_images);

        let cached_data = serde_json::to_string(&cached_prediction).map_err(|e| {
            eprintln!("Failed to serialize prediction output: {e}");
            Error::Fatal
        })?;

        API_UTILS
            .put_cached(&[&cache_key], cached_data.as_bytes())
            .await;

        // We construct the CachedPrediction::Images variant first to avoid cloning the images.
        let generated_images = match cached_prediction {
            CachedPrediction::Images(images) => images,
            _ => unreachable!(),
        };
        Ok(generated_images)
    } else {
        eprintln!("No output in prediction response");
        Err(Error::Fatal)
    }
}

enum Endpoint {
    FluxDevLoraTrainer,
    Trainings(TrainingsEndpoint),
    Predictions(PredictionsEndpoint),
    Files,
}

enum PredictionsEndpoint {
    Get(String),
    Post,
}

enum TrainingsEndpoint {
    Get(String),
}

impl Endpoint {
    fn url(&self) -> String {
        match self {
            Endpoint::FluxDevLoraTrainer => "https://api.replicate.com/v1/models/ostris/flux-dev-lora-trainer/versions/d995297071a44dcb72244e6c19462111649ec86a9646c32df56daa7f14801944/trainings".to_owned(),
            Endpoint::Trainings(endpoint) => endpoint.url(),
            Endpoint::Predictions(endpoint) => endpoint.url(),
            Endpoint::Files => "https://api.replicate.com/v1/files".to_owned(),
        }
    }
}

impl PredictionsEndpoint {
    fn url(&self) -> String {
        match self {
            PredictionsEndpoint::Get(id) => {
                format!("https://api.replicate.com/v1/predictions/{}", id)
            }
            PredictionsEndpoint::Post => "https://api.replicate.com/v1/predictions".to_owned(),
        }
    }
}

impl TrainingsEndpoint {
    fn url(&self) -> String {
        match self {
            TrainingsEndpoint::Get(id) => format!("https://api.replicate.com/v1/trainings/{}", id),
        }
    }
}

async fn fetch_response<'a>(
    request_body: &str,
    target_endpoint: Endpoint,
) -> Result<(reqwest::StatusCode, String), Error> {
    let resp = HTTP_CLIENT
        .post(target_endpoint.url())
        .header("Authorization", format!("Bearer {REPLICATE_API_TOKEN}"))
        .header("Content-Type", "application/json")
        .body(request_body.to_string())
        .send()
        .await
        .log_and_transient()?;

    let status = resp.status();
    if !status.is_success() {
        eprintln!("Failed to send request to replicate: {status}");
        return Err(match status {
            StatusCode::REQUEST_TIMEOUT
            | StatusCode::TOO_MANY_REQUESTS
            | StatusCode::PAYMENT_REQUIRED => Error::Transient,
            _ => Error::Fatal,
        });
    }

    let body = resp.text().await.log_and_transient()?;
    Ok((status, body))
}

pub async fn check_prediction_status(prediction_id: &str) -> Result<PredictionResponse, Error> {
    let response = HTTP_CLIENT
        .get(Endpoint::Predictions(PredictionsEndpoint::Get(prediction_id.to_owned())).url())
        .header("Authorization", format!("Bearer {REPLICATE_API_TOKEN}"))
        .send()
        .await
        .map_err(|e| {
            eprintln!("Failed to check prediction status: {e}");
            Error::Fatal
        })?;

    handle_response(response).await
}

async fn handle_response<T>(response: reqwest::Response) -> Result<T, Error>
where
    T: for<'de> Deserialize<'de>,
    T: std::fmt::Debug,
{
    let status = response.status();
    if !status.is_success() {
        eprintln!("Replicate request failed with status {status}");
        return Err(Error::Fatal);
    }
    let response_body = response.text().await.map_err(|e| {
        eprintln!("Failed to read response body: {e}");
        Error::Fatal
    })?;
    let response: T = serde_json::from_str(&response_body).map_err(|e| {
        eprintln!("Failed to parse response body: {e}");
        Error::Fatal
    })?;
    Ok(response)
}
