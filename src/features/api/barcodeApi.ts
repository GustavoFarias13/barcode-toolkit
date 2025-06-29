import { apiGet } from "./axiosClient.ts";
import type {BarcodeDecodedResponse, BarcodeGeneratedResponse} from "../types/barcodeTypes.ts";

export const barcodeApi = {
  decode(barcode: string): Promise<BarcodeDecodedResponse> {
    return apiGet(`/barcode/decode?barcode=${encodeURIComponent(barcode)}`);
  },

  generate(barcode: string): Promise<BarcodeGeneratedResponse> {
    return apiGet(`/barcode/generate?barcode=${encodeURIComponent(barcode)}`);
  }
};
