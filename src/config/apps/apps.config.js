import {createAppConfig} from "../../helpers/create-app-config";

const wallpapers = createAppConfig({
    title: 'Wallpapers',
    resizable: true,

    height: 600,
    width: 800,
    dockBreaksBefore: true,

});

const tv = createAppConfig({
    title: "TV",
    resizable: true,

    height: 600,
    width: 800,

})

const calculator = createAppConfig({
    title: 'Calculator',

    expandable: true,
    resizable: false,

    height: 300 * 1.414,
    width: 300,
});

const calendar = createAppConfig({
    title: 'Calendar',
    resizable: true,
});

const vscode = createAppConfig({
    title: 'VSCode',
    resizable: true,

    height: 600,
    width: 800,
});

const finder = createAppConfig({
    title: 'Finder',
    resizable: true,

    dockBreaksBefore: false,
    expandable: true
});

const safari = createAppConfig({
    title: 'Safari',
    resizable: true,
});

const systemPreferences = createAppConfig({
    title: 'System Preferences',
    resizable: true,
});

const launchpad = createAppConfig({
    title: "Launch Pad",
    resizable: false,

})

// const devUtils = createAppConfig({
//   title: `DevUtils`,
//   resizable: true,

//   shouldOpenWindow: false,
//   externalAction: () => window.open('https://devutils.app/?ref=puru', '_blank'),

//   dockBreaksBefore: true,
// });

const appstore = createAppConfig({
    title: 'App Store',
    resizable: true,
});

const mail = createAppConfig({
    title: "Mail",
    resizable: true,
})

const aboutMac = createAppConfig({
    title: "About This Mac",
    resizable: false,
    height: 300,
    width: 500,
    dockBreaksBefore: true,
})

const viewSource = createAppConfig({
    title: `View Source`,
    resizable: true,

    shouldOpenWindow: false,
    externalAction: () => window.open('https://github.com/web-dragon-smsp/macos-react', '_blank'),
});


export const appsConfig = {
    finder,
    launchpad,
    appstore,
    'system-preferences': systemPreferences,
    mail,
    safari,
    calculator,
    calendar,
    tv,
    'about-mac': aboutMac,
    vscode,
    'view-source': viewSource,
};
