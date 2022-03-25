import {Injectable} from "@angular/core";

/** Key for the sidebar hide setting. */
const HIDE_SIDEBAR_KEY = "hide-sidebar";
/** key for the user bar hide setting. */
const HIDE_USER_BAR_KEY = "hide-user-bar";

/** Storage service for storing settings in the session storage. */
@Injectable({
  providedIn: 'root'
})
export class SettingsStorageService {

  /**
   * Internal function to set session storage values.
   *
   * Store undefined or null to clear the storage.
   * @param key Key of the storage item
   * @param data Data to store
   */
  private static setStorage(key: string, data: string | null | undefined): void {
    if (data) globalThis.sessionStorage.setItem(key, data);
    else globalThis.sessionStorage.removeItem(key);
  }
  /**
   * Internal function to get session storage values.
   *
   * @param key Key of the storage item
   * @returns The stored value or null if missing
   */
  private static getStorage(key: string): string | null {
    return globalThis.sessionStorage.getItem(key);
  }

  /**
   * Internal function to set boolean session storage values.
   *
   * Store undefined or null to clear the storage.
   * @param key Key of the storage item
   * @param data Data to store
   */
  private static setBoolStorage(key: string, data: boolean | null): void {
    if (typeof data === "boolean") {
      SettingsStorageService.setStorage(key, `${data}`);
    }
    else SettingsStorageService.setStorage(key, data);
  }
  /**
   * Internal function to get boolean session storage values.
   *
   * @param key Key of the storage item
   * @returns The stored value or null if missing
   */
  private static getBoolStorage(key: string): boolean | null {
    let data = SettingsStorageService.getStorage(key);
    if (!data) return null;
    return data === "true";
  }

  /**
   * Set hide sidebar setting.
   * @param setting
   */
  set hideSidebar(setting: boolean | null) {
    SettingsStorageService.setBoolStorage(HIDE_SIDEBAR_KEY, setting);
  }
  /** Get hide sidebar setting. */
  get hideSidebar(): boolean | null {
    return SettingsStorageService.getBoolStorage(HIDE_SIDEBAR_KEY);
  }

  /**
   * Set hide user bar setting.
   * @param setting
   */
  set hideUserBar(setting: boolean | null) {
    SettingsStorageService.setBoolStorage(HIDE_USER_BAR_KEY, setting);
  }
  /** Get hide user bar setting. */
  get hideUserBar(): boolean | null {
    return SettingsStorageService.getBoolStorage(HIDE_USER_BAR_KEY);
  }

}
