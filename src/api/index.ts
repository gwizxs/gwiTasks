import qs from 'query-string';

 export const DOMAIN = 'http://localhost:3001'

 interface requestData extends Record<string, string | number | boolean> {
 }

 interface requestConfig {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    body?: string | FormData;
 }

 type ApiResponse<T> = Promise<T>;

class ApiCall {
    domain: string;

    constructor(domain: string ) {
        this.domain = domain;
    }

  // метод perform
  async perform<T>(url: string, data?: requestData, config?: requestConfig): ApiResponse<T> {
    const request = await fetch(`${this.domain}/${url}`, {
      body: data ? JSON.stringify(data) : undefined, 
      headers: {
        'Content-Type': 'application/json', 
        ...config?.headers,
      },
      ...config,
    });

    return await request.json() as T; 
  }

  // методы для разных HTTP-методов
  async get<T>(path: string, searchParams?: requestData): ApiResponse<T> {
    return this.perform<T>(`${path}?${searchParams ? qs.stringify(searchParams) : ''}`); 
  }

  async post<T>(path: string, data: requestData): ApiResponse<T> {
    return this.perform<T>(path, data, { method: 'POST' });
  }

  async put<T>(path: string, data: requestData): ApiResponse<T> {
    return this.perform<T>(path, data, { method: 'PUT' });
  }

  async delete<T>(path: string): ApiResponse<T> {
    return this.perform<T>(path, undefined, { method: 'DELETE' });
  }
}

export default new ApiCall(DOMAIN);