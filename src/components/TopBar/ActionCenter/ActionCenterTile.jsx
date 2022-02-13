import css from './ActionCenterTile.module.scss';
import styled from "styled-components";

export const ActionCenterTile = ({ grid, children }) => {
  const [rowStart, rowsPan] = grid;
  const Container = styled.div`
    display: flex;
    gap: 0.4rem;
    align-items: center;

    font-size: 0.85rem;
    font-weight: 600;
    color: var(--app-color-dark);

    grid-row: var(--row-start) / span var(--row-end);
    border-radius: inherit;
    text-align: start;
  `
  return (
    <Container
      style={{ '--row-start': rowStart, '--row-span': rowsPan }}
    >
      {children}
    </Container>
  );
};
