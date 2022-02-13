import { ExpandIcon } from './Expand.svg';
import { StretchIcon } from './Stretch.svg';


export const GreenLightIcon = ({ expandable }) => {
  if (expandable) {
    return <ExpandIcon />;
  }

  return <StretchIcon />;
};
