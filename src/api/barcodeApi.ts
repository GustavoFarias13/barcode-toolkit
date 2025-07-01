import axiosClient from "./axiosClient";
import type {
  BarcodeDecodedResponse,
  BarcodeGeneratedResponse,
} from "../types/barcodeTypes";

export const barcodeApi = {
  async decode(barcode: string): Promise<BarcodeDecodedResponse> {
    const response = await axiosClient.get(`/barcode/decode?barcode=${barcode}`);
    return response.data;
  },

  async generate(barcode: string): Promise<BarcodeGeneratedResponse> {
    const response = await axiosClient.get(`/barcode/generate?barcode=${barcode}`);
    return response.data;
  },
};
