import { AxiosError } from "axios";

// https://developer.mozilla.org/ko/docs/Web/HTTP/Status

type ErrorCodeType = {
  [key: string]: { code: string; message: string; requireLogin?: boolean };
};

export const ERROR_CODE: ErrorCodeType = {
  default: { code: "ERROR", message: "An unknown error has occurred." },

  // axios error
  ERR_NETWORK: {
    code: "Network Error",
    message:
      "The server is not responding. \nPlease restart the program or contact the administrator.",
  },
  ECONNABORTED: {
    code: "Request Timeout",
    message: "The request has timed out.",
  },
  ECONNREFUSED: {
    code: "Connection Refused",
    message: "The server is not responding.",
  },

  // http status code and defined codes
  400: { code: "400", message: "Bad Request." },
  4001: { code: "4001", message: "Request Validation Error." },
  401: { code: "401", message: "Authentication Error.", requireLogin: true },
  4011: {
    code: "4011",
    message: "Authentication has expired.",
    requireLogin: true,
  },
  403: { code: "403", message: "Access Denied." },
  404: { code: "404", message: "Page Not Found." },
} as const;

export const getErrorDataByCode = (
  error: AxiosError<{ code: number; message: string }>
) => {
  const serverErrorCode = error?.response?.data?.code ?? "";
  const httpErrorCode = error?.response?.status ?? "";
  const axiosErrorCode = error?.code ?? "";

  if (serverErrorCode in ERROR_CODE) {
    return ERROR_CODE[serverErrorCode as keyof typeof ERROR_CODE];
  }
  if (httpErrorCode in ERROR_CODE) {
    return ERROR_CODE[httpErrorCode as keyof typeof ERROR_CODE];
  }
  if (axiosErrorCode in ERROR_CODE) {
    return ERROR_CODE[axiosErrorCode as keyof typeof ERROR_CODE];
  }

  return ERROR_CODE.default;
};
