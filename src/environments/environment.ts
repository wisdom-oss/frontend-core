import {environment as commonEnvironment} from "./environment.common";

/** Url used to call the original window location, will be captured by the proxy. */
const baseUrl = window.location.origin + "/";

/** Environment for the dev mode. */
export const environment = Object.assign({}, commonEnvironment, {
  production: false,
  baseUrl,
  apiUrl: baseUrl + "api/"
});
