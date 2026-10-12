/**
 * Prudential Shared API Client Library
 * Handles HTTP requests, headers, correlation IDs, JSON parsing, error handling,
 * and request cancellation via AbortController.
 */

export const PROVISIONAL_CONTRACT_NOTICE = 
  "[PROVISIONAL API CONTRACT - Subject to change upon Java/Kotlin backend OpenAPI / Swagger specs delivery]";

export class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export function createApiClient(baseUrl = '') {
  const getHeaders = (customHeaders = {}) => {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Agent-Portal-Client': 'Prudential-Agent-Shell-v1.0',
      'X-Correlation-ID': `REQ-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      ...customHeaders
    };
  };

  const handleResponse = async (response) => {
    if (!response.ok) {
      let errorBody = {};
      try {
        errorBody = await response.json();
      } catch (e) {
        errorBody = { rawText: await response.text() };
      }
      throw new ApiError(
        errorBody.message || `HTTP Request failed with status ${response.status}`,
        response.status,
        errorBody
      );
    }
    if (response.status === 204) return null;
    return await response.json();
  };

  return {
    async get(endpoint, options = {}) {
      const { headers, signal } = options;
      console.info(`${PROVISIONAL_CONTRACT_NOTICE} GET ${baseUrl}${endpoint}`);
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        headers: getHeaders(headers),
        signal
      });
      return handleResponse(response);
    },

    async post(endpoint, data, options = {}) {
      const { headers, signal } = options;
      console.info(`${PROVISIONAL_CONTRACT_NOTICE} POST ${baseUrl}${endpoint}`);
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(headers),
        body: JSON.stringify(data),
        signal
      });
      return handleResponse(response);
    },

    createCancelToken() {
      return new AbortController();
    }
  };
}

export const defaultApiClient = createApiClient();
export const apiClient = defaultApiClient;

