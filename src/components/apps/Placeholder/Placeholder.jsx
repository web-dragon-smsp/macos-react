import clsx from 'clsx';
import { motion } from 'framer-motion';
import css from './Placeholder.module.scss';

const PlaceholderApp = ({ appID }) => {
  return (
    <section className={clsx(css.container)}>
      <header className={clsx('app-window-drag-handle', css.titleBar)}/>
      <section className={css.mainArea}>
        <motion.img
          className={css.img}
          initial={{ scale: 0, rotate: 180 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 20,
          }}
          draggable={false}
          src={`/assets/app-icons/${appID}/256.png`}
        />
        <h1>This App coming soon! ⚡️</h1>
      </section>
    </section>
  );
};

export default PlaceholderApp;
