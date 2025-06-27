const API_BASE = import.meta.env.VITE_API_BASE_URL;


export async function decodeBarcode(barcode: string) {
    if (!/^\d{12,14}$/.test(barcode)) {
        alert('Invalid barcode');
        return;
      }

    const response = await fetch(`${API_BASE}/barcode/decode?barcode=${barcode}`);
    if (!response.ok) throw new Error('Failed to decode barcode');
    return response.json();
  }
  