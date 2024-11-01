export interface APIErrorList {
  [key: string]: string[] | string;
}

export interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  errors: APIErrorList;
  traceId: string;
}

export type GenericAPIResponse<T> = T | ErrorResponse;

type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
