
export const openApp = ({appID,config,setOpenApps,setActiveApp}) => {
    const {
        title,
        externalAction,
        isOpen,
        shouldOpenWindow,
    } = config;
    if (!shouldOpenWindow) return ;
    setOpenApps((apps) => {
        apps[appID] = true;
        return apps;
    });
    setActiveApp(appID);
}

