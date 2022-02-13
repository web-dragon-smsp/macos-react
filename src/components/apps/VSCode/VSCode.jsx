import clsx from 'clsx';
import css from './VSCode.module.scss';

const VSCode = ({ isBeingDragged }) => {
  return (
    <section className={css.container}>
      <header className={clsx(css.header, 'app-window-drag-handle')}></header>
      <div>
        <iframe
          className={clsx(css.iframe, isBeingDragged && css.iframeDragged)}
          src="https://vscode.dev/"
        />
      </div>
    </section>
  );
};

export default VSCode;
