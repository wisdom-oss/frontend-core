import {environment as commonEnvironment} from "./environment.common";

/** Base url for making requests. */
const baseUrl = "https://wisdom-demo.uol.de/";
// TODO: the build process should be able to change this

/** Environment for the dev mode. */
export const environment = Object.assign({}, commonEnvironment, {
  production: true,
  baseUrl,
  apiUrl: baseUrl + "api/"
});
