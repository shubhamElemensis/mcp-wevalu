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
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRCNlFJSUJJZGRWcklDdkRaR09ZSyJ9.eyJpc3MiOiJodHRwczovL3dldmFsdS1kZXYuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY4Nzc0YjBmM2RmOTYwYjc1ZDk3Y2VjNCIsImF1ZCI6WyJodHRwczovL3dldmFsdS1kZXYuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3dldmFsdS1kZXYuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTc1Mzk1OTMwMCwiZXhwIjoxNzUzOTYwMjAwLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwiYXpwIjoiS3c5aldEZWdRamJwUjVUR0lGMUowZVNBdzVjcnZjQTcifQ.lKpjon4fomtEndTsaqiWCvQqRfESqNvqal2Vdj_wyBcYWv7TNe0B998DYzG8AYAWAKOQnjNhk8OoYDNpTGiU27rmEX2ARnZcEO3vadwVWXAPU21fH0zbdurIjqwhjgqfZklhUg8g39ZNpU3_1rejO0OHGQd3kljPm66xagABjVsWjsV_mzd11xXtk4K5QVLD18trblXDKg5GmcGutka9sPiTbY3YezxtO0Ys7JA6MAvfyCOY4MZ3WYuw2v3MLuUC6Auc2zyabM07Mry1lXimDwHzoBGIRUSumGw6VjeyHivZfUPlLcHeBd8HN2OsLIWOFWlhBHu0h2ji95QduitzKg";
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
