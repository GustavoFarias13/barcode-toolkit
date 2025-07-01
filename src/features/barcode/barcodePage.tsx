import { useState } from "react";
import { barcodeApi } from "../../api/barcodeApi";
import type {
    BarcodeDecodedResponse,
    BarcodeGeneratedResponse,
} from "../../types/barcodeTypes";
import { BarcodeDecoderResult } from "./barcodeDecoderResult";
import type { ApiError } from "../../types/apiError";
import "../../App.css";

export default function BarcodePage() {
    const [barcode, setBarcode] = useState("");
    const [decodedData, setDecodedData] = useState<BarcodeDecodedResponse | null>(null);
    const [generatedData, setGeneratedData] = useState<BarcodeGeneratedResponse | null>(null);
    const [error, setError] = useState<{ status?: number; message: string } | null>(null);

    // Faz a requisição e trata sucesso e erro
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
            const apiError: ApiError | undefined = err?.response?.data;

            if (apiError && apiError.status && apiError.message) {
                setError({
                    status: apiError.status,
                    message: apiError.message,
                });
            } else {
                setError({
                    status: undefined,
                    message: err?.message || "Erro inesperado",
                });
            }
        }
    };

    // Valida campo vazio antes de chamar handleRequest
    const handleClick = <T,>(
        action: () => Promise<T>,
        onSuccess: (data: T) => void
    ) => {
        if (!barcode.trim()) {
            setError({
                status: 400,
                message: "Você precisa digitar um código de barras antes de continuar.",
            });
            setDecodedData(null);
            setGeneratedData(null);
            return;
        }

        handleRequest(action, onSuccess);
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
                    onClick={() => handleClick(() => barcodeApi.decode(barcode), setDecodedData)}
                    disabled={!barcode.trim()}
                >
                    Decodificar
                </button>
                <button
                    className="buttonPrimary"
                    onClick={() => handleClick(() => barcodeApi.generate(barcode), setGeneratedData)}
                    disabled={!barcode.trim()}
                >
                    Gerar
                </button>
            </div>

            {error && (
                <div className="error-box">
                    <h4>Erro na requisição</h4>
                    {error.status && <p><strong>Status:</strong> {error.status}</p>}

                    {error.message?.includes("checksum") ? (
                        <p>
                            O código de barras informado é inválido: ele não passou na verificação de integridade.
                            Verifique se o código está completo e correto.
                        </p>
                    ) : error.message?.includes("generate barcode image") ? (
                        <p>
                            O código informado não pôde ser convertido em imagem. Tente usar outro valor válido.
                        </p>
                    ) : error.message?.includes("decode") ? (
                        <p>
                            O código informado não pôde ser decodificado. Verifique se o valor corresponde a um padrão reconhecido.
                        </p>
                    ) : (
                        <p>{error.message}</p>
                    )}
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
