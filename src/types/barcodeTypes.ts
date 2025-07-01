export interface BarcodeDecodedResponse {
    encodingType: string;
    barcode: string;
    prefixInfo?: string;
    manufacturer?: string;
    product?: string;
    checkDigit?: string;
    systemNumberInfo?: string;
    compressBody?: string;
    indicatorDigit?: string;
    gtinBase?: string;
    length?: number;
}

export interface BarcodeGeneratedResponse {
    encodingType: string;
    barcode: string;
    base64Image: string;
}
