import {environment as commonEnvironment} from "./environment.common";

const baseUrl = window.location.origin + "/";

export const environment = Object.assign({}, commonEnvironment, {
  production: false,
  baseUrl,
  apiUrl: baseUrl + "api/"
});
