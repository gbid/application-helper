pub fn hash(s: &[u8]) -> String {
    use sha2::{Digest, Sha256};
    let mut hasher = Sha256::new();
    hasher.update(s);
    format!("{:x}", hasher.finalize())
}
