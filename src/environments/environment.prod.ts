import {environment as commonEnvironment} from "./environment.common";

const baseUrl = "https://wisdom-demo.uol.de/"

export const environment = Object.assign({}, commonEnvironment, {
  production: true,
  baseUrl,
  apiUrl: baseUrl + "api/"
});
