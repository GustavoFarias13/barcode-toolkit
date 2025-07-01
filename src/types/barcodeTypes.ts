/**
 * Represents the decoded information from a barcode.
 */
export interface BarcodeDecodedResponse {
    /** Type of barcode encoding (e.g., EAN-13, UPC-A) */
    encodingType: string;

    /** The original barcode string */
    barcode: string;

    /** Optional information about barcode prefix */
    prefixInfo?: string;

    /** Optional manufacturer name or code */
    manufacturer?: string;

    /** Optional product name or code */
    product?: string;

    /** Optional check digit used for validation */
    checkDigit?: string;

    /** Optional system number information */
    systemNumberInfo?: string;

    /** Optional compressed body of the barcode */
    compressBody?: string;

    /** Optional indicator digit */
    indicatorDigit?: string;

    /** Optional base GTIN (Global Trade Item Number) */
    gtinBase?: string;

    /** Optional length of the barcode */
    length?: number;
}

/**
 * Represents the response from generating a barcode image.
 */
export interface BarcodeGeneratedResponse {
    /** Type of barcode encoding used */
    encodingType: string;

    /** The original barcode string */
    barcode: string;

    /** Base64 encoded PNG image of the generated barcode */
    base64Image: string;
}
