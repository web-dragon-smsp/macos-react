export const createAppConfig = (app) => ({
    shouldOpenWindow: true,
    dockBreaksBefore: false,

    resizable: true,
    expandable: false,

    width: 600,
    height: 500,
    ...app,
});
