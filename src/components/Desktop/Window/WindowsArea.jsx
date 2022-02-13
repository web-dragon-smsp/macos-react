import { useAtom } from 'jotai';
import { lazy } from 'react';
import { useEffect } from 'react';
import { Suspense } from 'react';
import { appsConfig } from "../../../config/apps/apps.config";
import { activeAppStore, activeAppZIndexStore , openAppsStore} from "../../../stores/apps.store";
import css from './WindowsArea.module.scss';

const Window = lazy(() => import('./Window'));

export const WindowsArea = () => {
  const [openApps] = useAtom(openAppsStore);
  const [activeApp] = useAtom(activeAppStore);
  const [activeAppZIndex, setActiveAppZIndex] = useAtom(activeAppZIndexStore);

  // Update the active app Z Index here
  useEffect(() => {
    setActiveAppZIndex(activeAppZIndex + 2);
  }, [activeApp]);

  return (
    <section className={css.container}>
      <Suspense fallback={<span/>}>
        {Object.keys(appsConfig).map(
          (appID) =>
            openApps[appID] &&
            appsConfig[appID].shouldOpenWindow && <Window key={appID} appID={appID} />,
        )}
      </Suspense>
    </section>
  );
};
