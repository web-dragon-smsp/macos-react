import {useEffect,useRef} from "react";
import { RovingTabIndexProvider, useFocusEffect, useRovingTabIndex } from 'react-roving-tabindex';
import {contextMenuConfig} from "../../../config/menu/context.menu.config";
import { useContextMenu, useFocusOutside} from "../../../hooks";
import styled from "styled-components";

const ContextContainer = styled.div`
  --additional-shadow: 0 0 0 0 white;
  display: block;
  z-index: 99999999;

  min-width: 16rem;

  padding: 0.5rem;

  position: absolute;

  user-select: none;

  background-color: hsla(var(--app-color-light-hsl), 0.3);
  backdrop-filter: blur(15px);

  border-radius: 0.5rem;

  box-shadow: hsla(0, 0%, 0%, 0.3) 0px 0px 11px 0px, var(--additional-shadow);

  :global(body.dark) & {
    --additional-shadow: inset 0 0 0 0.9px hsla(var(--app-color-dark-hsl), 0.3),
    0 0 0 1.2px hsla(var(--app-color-light-hsl), 0.3);
  }
`

const MenuItem = styled.div`
  --alpha: 1;

  display: flex;
  justify-content: flex-start;

  width: 100%;

  padding: 0.3rem 0.4rem;
  margin: 0.2rem 0;

  letter-spacing: 0.4px;
  font-weight: 400;
  font-size: 0.9rem;

  border-radius: 0.3rem;

  transition: none;

  color: hsla(var(--app-color-dark-hsl), var(--alpha));

  &.disabled {
    --alpha: 0.5;
  }

  &:not(.disabled) {
    &:hover,
    &:focus-visible {
      background-color: var(--app-color-primary);
      color: var(--app-color-primary-contrast);
    }
  }
`

const Divider = styled.div`
  width: 100%;
  height: 0.2px;

  background-color: hsla(var(--app-color-dark-hsl), 0.2);

  margin: 2px 0;
`

export const ContextMenu = ({ outerRef }) => {
    const { xPos, yPos, isMenuVisible, setIsMenuVisible } = useContextMenu(outerRef);

    const containerRef = useRef();

    const defMenu = contextMenuConfig.default;

    useEffect(() => {
        isMenuVisible && containerRef.current.focus();
    }, [isMenuVisible]);

    useFocusOutside(containerRef, () => isMenuVisible && setIsMenuVisible(false));

    return isMenuVisible ? (
        <ContextContainer
            tabIndex={-1}
            ref={containerRef}
            style={{ top: yPos, left: xPos }}
        >
            <RovingTabIndexProvider options={{ direction: 'vertical', loopAround: true }}>
                {Object.keys(defMenu).map((key) => (
                    <>
                        <ContextMenuButton>{defMenu[key].title}</ContextMenuButton>
                        {(defMenu[key]).breakAfter && <Divider/>}
                    </>
                ))}
            </RovingTabIndexProvider>
        </ContextContainer>
    ) : (
        <></>
    );
};


const ContextMenuButton = ({ children }) => {
    const ref = useRef();

    const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(ref, false);

    useFocusEffect(focused, ref);

    return (
        <MenuItem
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            tabIndex={tabIndex}
            ref={ref}
        >
            {children}
        </MenuItem>
    );
};
