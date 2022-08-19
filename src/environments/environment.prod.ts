import {environment as commonEnvironment} from "./environment.common";

/** Base url for making requests. */
const baseUrl = window.location.origin + "/";

/** Environment for the dev mode. */
export const environment = Object.assign({}, commonEnvironment, {
  production: true,
  baseUrl,
  apiUrl: baseUrl + "api/"
});
