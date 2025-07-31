use crate::core::error::Error;
use crate::credentials;
use crate::utils::api_utils::ApiUtils;
use claid::{
    ClaidResponse, CropMethod, CropType, DecompressLevel, FitType, InnerOperations, Operations,
    Resizing, Restorations, SizeValue, UpscaleType,
};
use once_cell::sync::Lazy;
use reqwest::StatusCode;
use std::path::PathBuf;
use std::time::Duration;

const API_BASE_URL: &str = "https://api.claid.ai/v1-beta1";
const CACHE_DIR_PATH: &str = "/tmp/claid-cache";
const MAX_SIMULTANEOUS_REQUESTS: usize = 8;

static API_UTILS: Lazy<ApiUtils> = Lazy::new(|| {
    ApiUtils::new(
        PathBuf::from(CACHE_DIR_PATH),
        MAX_SIMULTANEOUS_REQUESTS,
        Duration::from_secs(60),
    )
});

// we have not used these functions yet, as we directly send the image to the claid API
// instead of sending a url to the image.
// async fn fetch_response(request_body: &str) -> Result<(StatusCode, String), Error> {
//     let http_client = reqwest::ClientBuilder::new()
//         .timeout(Duration::from_secs(60))
//         .build()
//         .map_err(|_| Error::Transient)?;
//     let api_key = credentials::CLAID_API_KEY;
//     let resp = http_client
//         .post(&format!("{}/image/edit", API_BASE_URL))
//         .header("Authorization", format!("Bearer {api_key}"))
//         .header("Content-Type", "application/json")
//         .body(request_body.to_string())
//         .send()
//         .await
//         .map_err(|_| Error::Transient)?;
//
//     let status = resp.status();
//     let body = resp.text().await.map_err(|_| Error::Transient)?;
//     Ok((status, body))
// }

// pub async fn send_request(request: ClaidRequest) -> Result<ClaidResponse, Error> {
//     let request_body = serde_json::to_string(&request).unwrap();
//
//     let response_body = match API_UTILS.get_cached(request_body.as_bytes()).await {
//         Some(response_body) => response_body,
//         None => {
//             let _permit = API_UTILS.acquire_permit().await;
//             let existing_rate_limit = API_UTILS.sleep_if_rate_limited().await;
//
//             let (status, response_body) = fetch_response(&request_body).await?;
//             if status.is_success() {
//                 API_UTILS.record_no_rate_limit();
//                 API_UTILS
//                     .put_cached(request_body.as_bytes(), response_body.as_bytes())
//                     .await;
//             } else if status == StatusCode::TOO_MANY_REQUESTS {
//                 eprintln!("Error: Claid rate limited");
//                 API_UTILS.record_rate_limit(existing_rate_limit);
//                 return Err(Error::Transient);
//             } else {
//                 eprintln!("Error: {}", status);
//                 return Err(Error::Fatal);
//             }
//             response_body
//         }
//     };
//
//     serde_json::from_str(&response_body).map_err(|_| Error::Fatal)
// }

async fn fetch_upload_response(
    UploadRequest {
        image_data,
        file_name,
        operations,
        ..
    }: &UploadRequest,
) -> Result<(StatusCode, String), Error> {
    let http_client = reqwest::ClientBuilder::new()
        .timeout(Duration::from_secs(60))
        .build()
        .map_err(|_| Error::Transient)?;
    let api_key = credentials::CLAID_API_KEY;

    let form = reqwest::multipart::Form::new()
        .part(
            "file",
            reqwest::multipart::Part::bytes(image_data.clone()).file_name(file_name.to_string()),
        )
        .part(
            "data",
            reqwest::multipart::Part::text(serde_json::to_string(operations).unwrap()),
        );

    let resp = http_client
        .post(&format!("{}/image/edit/upload", API_BASE_URL))
        .header("Authorization", format!("Bearer {api_key}"))
        .multipart(form)
        .send()
        .await
        .map_err(|_| Error::Transient)?;

    let status = resp.status();
    let body = resp.text().await.map_err(|_| Error::Transient)?;
    Ok((status, body))
}

#[derive(Debug)]
pub struct UploadRequest {
    image_data: Vec<u8>,
    file_name: String,
    operations: Operations,
    byte_representation: Vec<u8>,
}

impl UploadRequest {
    fn new(image_data: Vec<u8>, file_name: String, operations: Operations) -> Self {
        let byte_representation = Self::to_bytes(&image_data, &file_name, &operations);
        Self {
            image_data,
            file_name,
            operations,
            byte_representation,
        }
    }
    fn to_bytes(image_data: &[u8], file_name: &str, operations: &Operations) -> Vec<u8> {
        let operations = serde_json::to_string(operations).unwrap();
        let mut bytes = Vec::new();
        bytes.extend_from_slice(image_data);
        bytes.extend_from_slice(file_name.as_bytes());
        bytes.extend_from_slice(operations.as_bytes());
        bytes
    }
}

pub async fn send_upload_request(upload_request: UploadRequest) -> Result<ClaidResponse, Error> {
    let response_body = match API_UTILS
        .get_cached(&[&upload_request.byte_representation])
        .await
    {
        Some(response_body) => response_body,
        None => {
            let _permit = API_UTILS.acquire_permit().await;
            let existing_rate_limit = API_UTILS.sleep_if_rate_limited().await;

            let (status, response_body) = fetch_upload_response(&upload_request).await?;
            if status.is_success() {
                API_UTILS.record_no_rate_limit();
                API_UTILS
                    .put_cached(
                        &[&upload_request.byte_representation],
                        response_body.as_bytes(),
                    )
                    .await;
            } else if status == StatusCode::TOO_MANY_REQUESTS {
                eprintln!("Error: Claid rate limited");
                API_UTILS.record_rate_limit(existing_rate_limit);
                return Err(Error::Transient);
            } else {
                eprintln!("Error: {}", status);
                return Err(Error::Fatal);
            }
            response_body
        }
    };

    serde_json::from_str(&response_body).map_err(|_| Error::Fatal)
}

pub async fn enhance_and_resize_image(
    image_data: Vec<u8>,
    file_name: &str,
) -> Result<Vec<u8>, Error> {
    let operations = InnerOperations {
        restorations: Some(Restorations {
            upscale: Some(UpscaleType::SmartEnhance),
            decompress: Some(DecompressLevel::Auto),
            polish: false,
        }),
        resizing: Some(Resizing {
            height: Some(SizeValue::Pixels(900)),
            width: Some(SizeValue::Pixels(700)),
            fit: Some(FitType::Crop(CropType {
                crop: CropMethod::Smart,
            })),
        }),
        ..Default::default()
    };
    let operations = Operations { operations };

    let upload_request = UploadRequest::new(image_data, file_name.to_owned(), operations);
    let response = send_upload_request(upload_request).await?;
    let image_url = response.data.output.tmp_url;
    // The claid API returns only an url to the response image, not the image itself,
    // so we need to fetch the image in a separate request.
    let image_data = reqwest::get(&image_url)
        .await
        .map_err(|_| Error::Fatal)?
        .bytes()
        .await
        .map_err(|_| Error::Fatal)?
        .to_vec();
    Ok(image_data)
}
