import { useState } from "react";
import { barcodeApi } from "../../api/barcodeApi";
import type {
    BarcodeDecodedResponse,
    BarcodeGeneratedResponse,
} from "../../types/barcodeTypes";
import { BarcodeDecoderResult } from "./barcodeDecoderResult";
import type { ApiError } from "../../types/apiError";
import "../../App.css";

/**
 * Main page component for barcode decoding and generation.
 * Handles user input, API calls, error management and result display.
 */
export default function BarcodePage() {
    // State to store the input barcode string from the user
    const [barcode, setBarcode] = useState("");

    // State to hold the decoded barcode data returned from the API
    const [decodedData, setDecodedData] = useState<BarcodeDecodedResponse | null>(null);

    // State to hold the generated barcode data returned from the API
    const [generatedData, setGeneratedData] = useState<BarcodeGeneratedResponse | null>(null);

    // State to store any error information from API calls
    const [error, setError] = useState<{ status?: number; message: string } | null>(null);

    /**
     * Generic handler to perform API requests with error handling.
     * @param action The async function that performs the API call.
     * @param onSuccess Callback invoked with data if the request succeeds.
     */
    const handleRequest = async <T,>(
        action: () => Promise<T>,
        onSuccess: (data: T) => void
    ) => {
        // Clear previous error and results before new request
        setError(null);
        setDecodedData(null);
        setGeneratedData(null);

        try {
            const data = await action();
            onSuccess(data);
        } catch (err: any) {
            // Attempt to extract structured error from API response
            const apiError: ApiError | undefined = err?.response?.data;

            if (apiError && apiError.status && apiError.message) {
                setError({
                    status: apiError.status,
                    message: apiError.message,
                });
            } else {
                // Fallback for unexpected errors
                setError({
                    status: undefined,
                    message: err?.message || "Unexpected error occurred",
                });
            }
        }
    };

    /**
     * Wrapper that validates user input before making the API call.
     * Shows an error if the barcode input is empty.
     * @param action The async API call function.
     * @param onSuccess Callback to handle successful response data.
     */
    const handleClick = <T,>(
        action: () => Promise<T>,
        onSuccess: (data: T) => void
    ) => {
        if (!barcode.trim()) {
            setError({
                status: 400,
                message: "You must enter a barcode before continuing.",
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

            {/* Input field for user to type barcode */}
            <input
                type="text"
                className="inputField"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Enter barcode"
            />

            {/* Buttons to trigger decode or generate operations */}
            <div className="buttonGroup">
                <button
                    className="buttonPrimary"
                    onClick={() => handleClick(() => barcodeApi.decode(barcode), setDecodedData)}
                    disabled={!barcode.trim()}
                >
                    Decode
                </button>
                <button
                    className="buttonPrimary"
                    onClick={() => handleClick(() => barcodeApi.generate(barcode), setGeneratedData)}
                    disabled={!barcode.trim()}
                >
                    Generate
                </button>
            </div>

            {/* Display error box if an error occurred */}
            {error && (
                <div className="error-box">
                    <h4>Request Error</h4>
                    {error.status && <p><strong>Status:</strong> {error.status}</p>}

                    {/* Provide user-friendly messages based on error content */}
                    {error.message?.includes("checksum") ? (
                        <p>
                            The entered barcode is invalid: it failed the integrity check.
                            Please verify that the code is complete and correct.
                        </p>
                    ) : error.message?.includes("generate barcode image") ? (
                        <p>
                            The provided code could not be converted into an image. Try another valid value.
                        </p>
                    ) : error.message?.includes("decode") ? (
                        <p>
                            The provided code could not be decoded. Please check if it matches a recognized pattern.
                        </p>
                    ) : (
                        <p>{error.message}</p>
                    )}
                </div>
            )}

            {/* Render decoded barcode data if available */}
            {decodedData && <BarcodeDecoderResult data={decodedData} />}

            {/* Render generated barcode image and info if available */}
            {generatedData && (
                <div className="imagePreview">
                    <p><strong>Type:</strong> {generatedData.encodingType}</p>
                    <p><strong>Code:</strong> {generatedData.barcode}</p>
                    <img
                        src={`data:image/png;base64,${generatedData.base64Image}`}
                        alt="Generated barcode"
                    />
                </div>
            )}
        </div>
    );
}
