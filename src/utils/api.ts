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
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRCNlFJSUJJZGRWcklDdkRaR09ZSyJ9.eyJpc3MiOiJodHRwczovL3dldmFsdS1kZXYuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY3NDZkNDNlMmQ0MzY0NDYyOTRjODdkMiIsImF1ZCI6WyJodHRwczovL3dldmFsdS1kZXYuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3dldmFsdS1kZXYuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTc1NDAyNTU0MCwiZXhwIjoxNzU0MDI2NDQwLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwiYXpwIjoiS3c5aldEZWdRamJwUjVUR0lGMUowZVNBdzVjcnZjQTcifQ.DfJTqXL836G3XE7XDVKrBIyPSW6nIe8vbZDcYdIHslSCxoY49TSH2xTVA9O8sBYd_vyB5I19AZyry_SQQ9vQc12UXCJyGZezZwrwyln_qZDTQl7u03-JhJiKqUWTkzvvY8SM3v8twaU4pkQXbvFPiWfYhGI0W1mtBFBHQrwiUc0YjIT5kKd-ai8FLJ-FptC6QSZn4dsSwc89o4BOSxH_Vj_pDEmY6n9OJrV4hFGpce0CySdjhNlkliatr5us4J3ljGJX6L4PZmq6sQtbe7fYtJBn2zMZEpVntCjwds40pO-HepNf1FVfEhvb3i1Wf39knJp5l8qYUktSKMRkSDDB7A";
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
}

export const apiInstance = new ApiInstance();
