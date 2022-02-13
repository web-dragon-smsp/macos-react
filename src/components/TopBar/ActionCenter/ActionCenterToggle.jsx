import clsx from 'clsx';
import { useRef, useState } from 'react';
import { SwitchSVG} from "../../../assets/sf-icons/switch.svg";
import { useFocusOutside, useOutsideClick} from "../../../hooks";
import { TopBarIconButton } from '../TopBarIconButton';
import { ActionCenter } from './ActionCenter';
import css from './ActionCenterToggle.module.scss';
import styled from "styled-components";

export const ActionCenterToggle = () => {
  const containerRef = useRef();
  const [state, setState] = useState('hidden');

  const show = () => setState('visible');
  const hide = () => setState('hidden');

  useOutsideClick(containerRef, hide);
  useFocusOutside(containerRef, hide);
  const Container = styled.div`
    height: 100%;
    width: max-content;
    padding: 0 0.5rem !important;
    border-radius: 0.25rem;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      height: 100%;
      width: 100%;
      border-radius: inherit;
      transform: scale(var(--scale));
      transform-origin: center center;
      transition: transform 100ms ease;
      background-color: hsla(0, 0%, 96%, 0.3);
    }
    :global(svg),
    :global(svg path) {
      height: 1rem;
      width: 1rem;
      fill: var(--system-color-light-contrast) !important;
      position: relative;
    }
  `
  return (
    <Container ref={containerRef}>
      <span>
        <TopBarIconButton onClick={show} onFocus={show}>
          <SwitchSVG />
        </TopBarIconButton>
      </span>
      <div className={clsx(css.menuParent, state === 'hidden' && css.hidden)}>
        <ActionCenter />
      </div>
    </Container>
  );
};
