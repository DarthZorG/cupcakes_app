export interface APIErrorList {
  [key: string]: string[] | string;
}

export interface ErrorResponse {
  status?: string | null;
  message: string | null;
  errors?: APIErrorList | null;
}

export interface GenericAPIResponse<T> extends ErrorResponse {
  data?: T;
}
