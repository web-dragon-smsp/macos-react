import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useImmerAtom } from 'jotai/immer';
import { CloseIcon} from "../../../assets/traffic-icons/Close.svg";
import { GreenLightIcon} from "../../../assets/traffic-icons/GreenLightIcon";
import { MinimizeIcon} from "../../../assets/traffic-icons/Minimize.svg";
import { appsConfig} from "../../../config/apps/apps.config";
import { activeAppStore, openAppsStore, AppID} from "../../../stores/apps.store";
import css from './TrafficLights.module.scss';

export const TrafficLights = ({ appID, onMaximizeClick, class: className }) => {
  const [, setOpenApps] = useImmerAtom(openAppsStore);
  const [activeApp] = useAtom(activeAppStore);

  const closeApp = () =>
    setOpenApps((openApps) => {
      openApps[appID] = false;
      return openApps;
    });

  const greenLightAction = () => {
    if (appsConfig[appID].expandable) {
      // Action not available right now!
    } else {
      onMaximizeClick();
    }
  };

  return (
    <div className={clsx(css.container, activeApp !== appID && css.unFocussed, className)}>
      <button className={css.closeLight} onClick={closeApp}>
        <CloseIcon />
      </button>
      <button className={css.minimizeLight}>
        <MinimizeIcon />
      </button>
      <button className={css.stretchLight} onClick={greenLightAction}>
        <GreenLightIcon {...appsConfig[appID]} />
      </button>
    </div>
  );
};
