import axios, { AxiosInstance } from "axios";

export class APIService {
  private static _instance: APIService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_KESTREL_API_URL,
      //   timeout: 1000,
      //   headers: { "X-Custom-Header": "foobar" },
    });
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public static get instance(): APIService {
    return this._instance || (this._instance = new this());
  }

  public async getHealth(): Promise<Health> {
    try {
      const response = await this.axiosInstance.get("/health");
      const data = response.data as Health;
      return data;
    } catch (e) {
      throw e;
    }
  }
}
