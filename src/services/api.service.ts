import axios, { AxiosInstance } from "axios";
import { Ticker } from "@/models/ticker";
import { Health } from "@/models/health";
import { Exchange } from "@/models/exchange";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type APIResponse<T> = T extends Array<any>
  ? { statusCode: number; items: T }
  : { statusCode: number; item: T };

export default class APIService {
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

  public async getExchanges(): Promise<APIResponse<Exchange[]>> {
    try {
      const response = await this.axiosInstance.get("/api/v1/info/exchanges");
      const data = response.data as APIResponse<Exchange[]>;
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async getTickers(
    exchange_provider: string | undefined
  ): Promise<APIResponse<Ticker[]>> {
    try {
      const queryParams = {
        exchange_provider,
      };
      const response = await this.axiosInstance.get("/api/v1/info/tickers", {
        params: queryParams,
      });
      const data = response.data as APIResponse<Ticker[]>;
      return data;
    } catch (e) {
      throw e;
    }
  }
}
