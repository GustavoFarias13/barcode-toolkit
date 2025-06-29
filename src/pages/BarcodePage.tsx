import { useState } from "react";
import { decodeBarcode, generateBarcode } from "../api/BarcodeService";
import "../App.css";

export default function BarcodePage() {
  const [barcode, setBarcode] = useState("");
  const [decodedData, setDecodedData] = useState<any>(null);
  const [generatedData, setGeneratedData] = useState<{
    encodingType: string;
    barcode: string;
    base64Image: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = async () => {
    setError(null);
    setGeneratedData(null);
    setDecodedData(null);
    try {
      const data = await decodeBarcode(barcode);
      setDecodedData(data);
    } catch (err) {
      console.error("Decode error:", err);
      setError((err as Error).message);
    }
  };

  const handleGenerate = async () => {
    setError(null);
    setDecodedData(null);
    setGeneratedData(null);
    try {
      const data = await generateBarcode(barcode);
      setGeneratedData(data);
    } catch (err) {
      console.error("Generate error:", err);
      setError((err as Error).message);
    }
  };

  return (
      <div className="page-container">
        <h1>Barcode Toolkit</h1>

        <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Enter barcode"
        />

        <div className="button-group">
          <button onClick={handleDecode}>Decode</button>
          <button onClick={handleGenerate}>Generate</button>
        </div>

        {error && <div className="error">{error}</div>}

        {decodedData && (
            <pre className="result">{JSON.stringify(decodedData, null, 2)}</pre>
        )}

        {generatedData && (
            <div className="image-preview">
              <p><strong>Type:</strong> {generatedData.encodingType}</p>
              <p><strong>Barcode:</strong> {generatedData.barcode}</p>
              <img src={`data:image/png;base64,${generatedData.base64Image}`} alt="Generated Barcode" />
            </div>
        )}
      </div>
  );
}
