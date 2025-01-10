import axios, { AxiosInstance } from "axios";
import { error } from "console";

export class HTTPService {
  private static _instance: HTTPService;
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

  public static get instance(): HTTPService {
    return this._instance || (this._instance = new this());
  }

  public get axios(): AxiosInstance {
    return this.axiosInstance;
  }

  public async get(path: string, queryParams?: any) {
    return this.axios.get(path, { params: queryParams });
  }

  public async post(path: string, queryParams?: any, data?: any) {
    return this.axios.post(path, { params: queryParams, data });
  }
}

export class APIPath {
  static health = "/health";
}

export class KestrelAPIService {
  private static _instance: KestrelAPIService;

  private constructor() {}

  public static get instance(): KestrelAPIService {
    return this._instance || (this._instance = new this());
  }

  public async getHealth(): Promise<{ data: Health | null; error: any }> {
    try {
      const response = await HTTPService.instance.get(APIPath.health);
      const data = response.data;
      return { data: data, error: null };
    } catch (e) {
      return { data: null, error: e };
    }
  }
}
