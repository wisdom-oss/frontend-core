/** Custom error type containing infos to display in the main container. */
export interface Error {
  /** Http code of the error. */
  httpCode?: number | string;
  /** Http code name of the error. */
  httpError?: string;
  /** Internal error code. */
  error?: string;
  /** Internal error name. */
  errorName?: string;
  /** Internal error description. */
  errorDescription?: string;
}
