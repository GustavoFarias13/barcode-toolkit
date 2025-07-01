/**
 * Represents the structure of an error response returned by the API.
 */
export interface ApiError {
    /** HTTP status code of the error (e.g., 400, 404, 500) */
    status: number;

    /** Short title or summary of the error */
    title: string;

    /** Detailed message describing the error */
    message: string;

    /** Timestamp indicating when the error occurred */
    timestamp: string;
}
