import { lazy } from 'react';
import Placeholder from "./Placeholder/Placeholder";
import AboutMac from "./AboutMac/AboutMac";

const Calculator = lazy(() => import('./Calculator/Calculator'));
const Finder = lazy(() => import("./Finder/Finder"))
const VSCode = lazy(() => import('./VSCode/VSCode'));
// const Calendar = lazy(() => import('./Calendar/Calendar'));
//
// const PlaceholderApp = lazy(() => import('./Placeholder/Placeholder'));

export const AppNexus = ({ appID, isBeingDragged }) => {
  if (appID === 'calculator') return <Calculator />;
  if (appID === 'vscode') return <VSCode isBeingDragged={isBeingDragged} />;
  if (appID === 'about-mac') return <AboutMac/>;
  // if (appID === 'calendar') return <Calendar />;
  if (appID === 'finder') return <Finder />;

  return <Placeholder appID={appID}/>;
};
