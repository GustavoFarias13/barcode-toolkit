import type { BarcodeDecodedResponse } from "../../types/barcodeTypes.ts";

interface Props {
    data: BarcodeDecodedResponse;
}

/**
 * Component that renders the decoded barcode result.
 * It displays specific fields if the encodingType is one of the recognized barcode types,
 * otherwise it shows the raw JSON data.
 */
export function BarcodeDecoderResult({ data }: Props) {
    const { encodingType } = data;

    switch (encodingType) {
        // For known encoding types, display formatted key-value pairs
        case "EAN-13":
        case "EAN-8":
        case "DUN-14":
        case "UPC-A":
        case "UPC-E":
        case "CODE 128":
            return (
                <div className="result">
                    {/* Display the encoding type */}
                    <p><strong>Tipo:</strong> {encodingType}</p>

                    {/* Iterate over all keys except "encodingType" and render them if they have a value */}
                    {Object.entries(data).map(([key, value]) =>
                        key !== "encodingType" && value ? (
                            <p key={key}>
                                {/* Format the label for better readability */}
                                <strong>{formatLabel(key)}:</strong> {value}
                            </p>
                        ) : null
                    )}
                </div>
            );

        // For unrecognized encoding types, render the raw JSON prettily
        default:
            return <pre className="result">{JSON.stringify(data, null, 2)}</pre>;
    }
}

/**
 * Utility function to format object keys into readable labels.
 * Examples:
 *  - "productId" -> "Product ID"
 *  - "encodingType" -> "Encoding Type"
 */
function formatLabel(key: string) {
    return key
        // Add space before uppercase letters (camelCase to separate words)
        .replace(/([A-Z])/g, " $1")
        // Capitalize the first character
        .replace(/^./, (str) => str.toUpperCase())
        // Replace "Id" substring with uppercase "ID"
        .replace("Id", "ID");
}
