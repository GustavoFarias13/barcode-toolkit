import { useState } from "react";
import { decodeBarcode, generateBarcode } from "../api/BarcodeService";
import "../App.css";

export default function BarcodePage() {
  const [barcode, setBarcode] = useState("");
  const [decodedData, setDecodedData] = useState<any>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = async () => {
    setError(null);
    setGeneratedImage(null);
    setDecodedData(null);
    try {
      const data = await decodeBarcode(barcode);
      setDecodedData(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleGenerate = async () => {
    setError(null);
    setDecodedData(null);
    setGeneratedImage(null);
    try {
      const data = await generateBarcode(barcode);
      setGeneratedImage(`data:image/png;base64,${data.imageBase64}`);
    } catch (err) {
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

      {generatedImage && (
        <div className="image-preview">
          <img src={generatedImage} alt="Generated Barcode" />
        </div>
      )}
    </div>
  );
}