import type {BarcodeDecodedResponse} from "../types/barcodeTypes.ts";

interface Props {
    data: BarcodeDecodedResponse;
}

export function BarcodeDecoderResult({ data }: Props) {
    const { encodingType } = data;

    switch (encodingType) {
        case "EAN-13":
        case "EAN-8":
        case "DUN-14":
        case "UPC-A":
        case "UPC-E":
        case "CODE 128":
            return (
                <div className="result">
                    <p><strong>Tipo:</strong> {encodingType}</p>
                    {Object.entries(data).map(([key, value]) =>
                        key !== "encodingType" && value ? (
                            <p key={key}>
                                <strong>{formatLabel(key)}:</strong> {value}
                            </p>
                        ) : null
                    )}
                </div>
            );
        default:
            return <pre className="result">{JSON.stringify(data, null, 2)}</pre>;
    }
}

function formatLabel(key: string) {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace("Id", "ID");
}
