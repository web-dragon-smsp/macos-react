import clsx from 'clsx';
import css from './TopBarIconButton.module.scss';

export const TopBarIconButton = (props) => (
  <button {...props} className={clsx(css.button, props.class)} />
);
