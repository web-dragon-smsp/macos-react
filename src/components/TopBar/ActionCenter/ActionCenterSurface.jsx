import css from './ActionCenterSurface.module.scss';


export const ActionCenterSurface = ({ grid, children }) => {
  const [[columnStart, columnSpan], [rowStart, rowSpan]] = grid;

  return (
    <section
      className={css.container}
      style={
        {
          '--column-start': columnStart,
          '--column-span': columnSpan,
          '--row-start': rowStart,
          '--row-span': rowSpan,
        }
      }
    >
      {children}
    </section>
  );
};
