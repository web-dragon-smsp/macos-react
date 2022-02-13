import { useEffect, useRef } from 'react';
import css from './ActionCenterShell.module.scss';


export const ActionCenterShell = ({ children }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <section className={css.container} ref={ref} tabIndex={-1}>
      {children}
    </section>
  );
};
