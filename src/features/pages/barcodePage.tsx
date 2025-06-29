import { useState } from "react";
import { barcodeApi } from "../api/barcodeApi.ts";
import type {BarcodeDecodedResponse, BarcodeGeneratedResponse} from "../types/barcodeTypes.ts";
import { BarcodeDecoderResult } from "../components/barcodeDecoderResult.tsx";
import "../../App.css";

export default function BarcodePage() {
    const [barcode, setBarcode] = useState("");
    const [decodedData, setDecodedData] = useState<BarcodeDecodedResponse | null>(null);
    const [generatedData, setGeneratedData] = useState<BarcodeGeneratedResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRequest = async <T,>(
        action: () => Promise<T>,
        onSuccess: (data: T) => void
    ) => {
        setError(null);
        setDecodedData(null);
        setGeneratedData(null);
        try {
            const data = await action();
            onSuccess(data);
        } catch (err: any) {
            const message = err?.message || "Erro inesperado";
            setError(message);
        }
    };

    return (
        <div className="pageContainer">
            <h1>Barcode Toolkit</h1>

            <input
                type="text"
                className="inputField"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Digite o código de barras"
            />

            <div className="buttonGroup">
                <button
                    className="buttonPrimary"
                    onClick={() => handleRequest(() => barcodeApi.decode(barcode), setDecodedData)}
                >
                    Decodificar
                </button>
                <button
                    className="buttonPrimary"
                    onClick={() => handleRequest(() => barcodeApi.generate(barcode), setGeneratedData)}
                >
                    Gerar
                </button>
            </div>

            {error && (
                <div className="errorBox">
                    <h4>Erro</h4>
                    <p>{error}</p>
                </div>
            )}

            {decodedData && <BarcodeDecoderResult data={decodedData} />}

            {generatedData && (
                <div className="imagePreview">
                    <p><strong>Tipo:</strong> {generatedData.encodingType}</p>
                    <p><strong>Código:</strong> {generatedData.barcode}</p>
                    <img
                        src={`data:image/png;base64,${generatedData.base64Image}`}
                        alt="Código de barras gerado"
                    />
                </div>
            )}
        </div>
    );
}
