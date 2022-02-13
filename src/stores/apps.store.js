import { atom } from 'jotai';
import {appsConfig} from "../config/apps/apps.config";

/** Which apps are currently open */
export const openAppsStore = atom({
    finder: true,
    vscode: false,
    calculator: false,
    safari: false,
    messages: false,
    mail: false,
    photos: false,
    facetime: false,
    calendar: false,
    launchpad: false,
    appstore: false,
    'system-preferences': false,
    tv: false,
    'purus-twitter': false,
    'view-source': false,
    'about-mac': true,
});

/** Which app is currently focused */
export const activeAppStore = atom('finder');

/**
 * Maximum zIndex for the active app
 * Initialize with -2, so that it becomes 0 when initialised
 */
export const activeAppZIndexStore = atom(-2);
