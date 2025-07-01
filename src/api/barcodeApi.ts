import axiosClient from "./axiosClient";
import type {
  BarcodeDecodedResponse,
  BarcodeGeneratedResponse,
} from "../types/barcodeTypes";

/**
 * Encapsulates API calls related to barcode operations.
 * Provides methods to decode and generate barcodes via the backend.
 */
export const barcodeApi = {
  /**
   * Sends a GET request to decode the provided barcode string.
   * @param barcode The barcode string to decode.
   * @returns A Promise resolving to the decoded barcode data typed as BarcodeDecodedResponse.
   */
  async decode(barcode: string): Promise<BarcodeDecodedResponse> {
    const response = await axiosClient.get("/barcode/decode", { params: { barcode } });
    return response.data;
  },

  /**
   * Sends a GET request to generate a barcode based on the provided value.
   * @param barcode The value used to generate the barcode.
   * @returns A Promise resolving to the generated barcode data typed as BarcodeGeneratedResponse.
   */
  async generate(barcode: string): Promise<BarcodeGeneratedResponse> {
    const response = await axiosClient.get("/barcode/generate", { params: { barcode } });
    return response.data;
  },
};
