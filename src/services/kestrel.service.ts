import axios, { AxiosInstance } from "axios";

export class APIPath {
  static health = "/health";
}

export class KestrelAPIService {
  private static _instance: KestrelAPIService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_KESTREL_API_URL,
      //   timeout: 1000,
      //   headers: { "X-Custom-Header": "foobar" },
    });
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Can be modified response
        return response;
      },
      (error) => {
        // Handle response errors here
        return Promise.reject(error);
      }
    );
  }

  public static get instance(): KestrelAPIService {
    return this._instance || (this._instance = new this());
  }

  public async getHealth(): Promise<Health> {
    try {
      const response = await this.axiosInstance.get(APIPath.health);
      const data = response.data as Health;
      return data;
    } catch (e) {
      throw e;
    }
  }
}
