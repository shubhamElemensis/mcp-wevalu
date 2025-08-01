const BASE_URL = "http://localhost:5001/api";

export interface ApiResponse<T = any> {
  data: T;
  count?: number;
  message: string;
  success: boolean;
}

class ApiInstance {
  private baseUrl: string;
  private authToken: string;

  constructor(baseUrl: string = BASE_URL, authToken?: string) {
    this.baseUrl = baseUrl;
    this.authToken =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRCNlFJSUJJZGRWcklDdkRaR09ZSyJ9.eyJpc3MiOiJodHRwczovL3dldmFsdS1kZXYuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY3NDZkNDNlMmQ0MzY0NDYyOTRjODdkMiIsImF1ZCI6WyJodHRwczovL3dldmFsdS1kZXYuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3dldmFsdS1kZXYuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTc1NDAyODUyMywiZXhwIjoxNzU0MDI5NDIzLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwiYXpwIjoiS3c5aldEZWdRamJwUjVUR0lGMUowZVNBdzVjcnZjQTcifQ.MDwUpTHoxjT0tddMRlHHkVcy1zniEPMwgkdAuCzlf10nr0FhYzCs1t3PO-QesCOj7XB4NMAy09IcmyI-7bXMBi6Kh79GFbSNxcwRc968H2eFKTQUegzWCLKoxpqgyr6_vn7Ob-hzyGVvl55H65UubMpThPgit50ne6cfw6zE0izrf1wSzEz3bqIY7Pk3bqvUFoTWMXldsZOdqafdWkvZxo3pwhJH8Us-Y2LKlArMkhHGFXrqnkkktNvDkJ8WSHJwciwpoYNLE6mc39aE3D7YRv3usvMQ3whPr-adlAffjWvTCY7nM9b9njx8KmiRMhyOs2pkdbxU1Fd1cHXQrF_9CQ";
  }

  private getHeaders(): HeadersInit {
    return {
      "x-auth-token": this.authToken,
      "Content-Type": "application/json",
    };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      console.log(`API response status for ${endpoint}:`, response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as ApiResponse<T>;
    } catch (error) {
      console.error(`Error making API request to ${endpoint}:`, error);
      throw error;
    }
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      console.log(`API response status for ${endpoint}:`, response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as ApiResponse<T>;
    } catch (error) {
      console.error(`Error making API request to ${endpoint}:`, error);
      throw error;
    }
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      console.log(`API response status for ${endpoint}:`, response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as ApiResponse<T>;
    } catch (error) {
      console.error(`Error making API request to ${endpoint}:`, error);
      throw error;
    }
  }
}

export const apiInstance = new ApiInstance();
