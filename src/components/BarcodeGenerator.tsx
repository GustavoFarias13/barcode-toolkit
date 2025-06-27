const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function generateBarcode(barcode: string) {
    if (!/^\d{12,14}$/.test(barcode)) {
        alert('Invalid barcode');
        return;
      }
      
    const response = await fetch(`${API_BASE}/barcode/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ barcode }),
    });
    if (!response.ok) throw new Error('Failed to generate barcode');
    return response.json();
  }
  