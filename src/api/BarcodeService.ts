const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

/**
 * Decodes a barcode string by calling the backend service.
 * @param barcode - The barcode string to decode.
 */
export async function decodeBarcode(barcode: string) {
  const response = await fetch(`${API_BASE}/barcode/decode?barcode=${barcode}`);
  if (!response.ok) throw new Error("Failed to decode barcode");
  return response.json();
}

/**
 * Generates a barcode image for a given string.
 * @param barcode - The barcode string to generate.
 */
export async function generateBarcode(barcode: string) {
  const response = await fetch(`${API_BASE}/barcode/generate?barcode=${barcode}`);
  if (!response.ok) throw new Error("Failed to generate barcode");
  return response.json();
}