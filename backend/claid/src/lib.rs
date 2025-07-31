use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct ClaidRequest {
    pub input: Option<String>,
    pub operations: Operations,
    pub output: Option<Output>,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct InnerOperations {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub restorations: Option<Restorations>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub resizing: Option<Resizing>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub adjustments: Option<Adjustments>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub background: Option<Background>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub padding: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub privacy: Option<Privacy>,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct Operations {
    pub operations: InnerOperations,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Restorations {
    pub decompress: Option<DecompressLevel>,
    pub upscale: Option<UpscaleType>,
    pub polish: bool,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum DecompressLevel {
    Moderate,
    Strong,
    Auto,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum UpscaleType {
    SmartEnhance,
    SmartResize,
    Faces,
    DigitalArt,
    Photo,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Resizing {
    pub width: Option<SizeValue>,
    pub height: Option<SizeValue>,
    pub fit: Option<FitType>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum SizeValue {
    Auto,
    Pixels(u32),
    Percentage(String),
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum FitType {
    Simple(SimpleFitType),
    Crop(CropType),
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum SimpleFitType {
    Bounds,
    Cover,
    Canvas,
    Outpaint,
    Crop,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CropType {
    pub crop: CropMethod,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum CropMethod {
    Center,
    Smart,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Adjustments {
    pub hdr: Option<HdrAdjustment>,
    pub exposure: Option<i32>,
    pub saturation: Option<i32>,
    pub contrast: Option<i32>,
    pub sharpness: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum HdrAdjustment {
    Simple(i32),
    Advanced { intensity: i32, stitching: bool },
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct Background {
    pub remove: RemoveBackground,
    pub blur: Option<BlurBackground>,
    pub color: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum RemoveBackground {
    Simple(bool),
    Advanced(RemoveBackgroundOptions),
}
impl Default for RemoveBackground {
    fn default() -> Self {
        RemoveBackground::Simple(false)
    }
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct RemoveBackgroundOptions {
    pub category: Option<BackgroundCategory>,
    pub selective: Option<SelectiveOption>,
    pub clipping: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum BlurBackground {
    Simple(bool),
    Advanced(BlurBackgroundOptions),
}

#[derive(Debug, Serialize, Deserialize)]
pub struct BlurBackgroundOptions {
    pub category: BackgroundCategory,
    pub selective: Option<SelectiveOption>,
    #[serde(rename = "type")]
    pub blur_type: BlurType,
    pub level: BlurLevel,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum BackgroundCategory {
    General,
    Cars,
    Products,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SelectiveOption {
    pub object_to_keep: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum BlurType {
    Regular,
    Lens,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum BlurLevel {
    Low,
    Medium,
    High,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Privacy {
    pub blur_car_plate: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum Output {
    StorageUrl(String),
    Options(OutputOptions),
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OutputOptions {
    pub destination: Option<String>,
    pub metadata: Option<Metadata>,
    pub format: OutputFormat,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Metadata {
    pub dpi: Option<u32>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum OutputFormat {
    Simple(SimpleFormat),
    Jpeg(JpegFormat),
    Png(PngFormat),
    WebpAvif(WebpAvifFormat),
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum SimpleFormat {
    Jpeg,
    Png,
    Webp,
    Avif,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct JpegFormat {
    #[serde(rename = "type")]
    pub format_type: String,
    pub quality: u8,
    pub progressive: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PngFormat {
    #[serde(rename = "type")]
    pub format_type: String,
    pub compression: PngCompression,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum PngCompression {
    Fast,
    Best,
    Optimal,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct WebpAvifFormat {
    #[serde(rename = "type")]
    pub format_type: String,
    pub compression: WebpAvifCompression,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct WebpAvifCompression {
    #[serde(rename = "type")]
    pub compression_type: CompressionType,
    pub quality: u8,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum CompressionType {
    Lossy,
    Lossless,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ClaidResponse {
    pub data: ResponseData,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ResponseData {
    pub input: ImageInfo,
    pub output: OutputInfo,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ImageInfo {
    pub ext: String,
    pub mps: f64,
    pub mime: String,
    pub width: u32,
    pub format: String,
    pub height: u32,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct OutputInfo {
    pub ext: String,
    pub mps: f64,
    pub mime: String,
    pub width: u32,
    pub format: String,
    pub height: u32,
    pub tmp_url: String,
}
