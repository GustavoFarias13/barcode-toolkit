const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export async function apiGet<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`);
    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Erro na requisição: ${response.status} - ${message}`);
    }
    return response.json();
}
