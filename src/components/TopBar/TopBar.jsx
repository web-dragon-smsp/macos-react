import { MenuBar } from './MenuBar/MenuBar';
import { TopBarTime } from './TopBarTime';
import styled from "styled-components";
import {ActionCenterToggle} from "./ActionCenter/ActionCenterToggle";

const Header = styled.header`
  display: flex;
  align-items: center;

  width: 100%;
  height: 1.4rem;

  background-color: hsla(var(--app-color-light-hsl), 0.3);
  // backdrop-filter: blur(12px);

  color: var(--app-color-light-contrast);
  fill: var(--app-color-light-contrast);

  button {
    font-weight: 500;
    font-size: 0.8rem;
    font-family: var(--app-font-family);

    letter-spacing: 0.3px;

    position: relative;

    height: 100%;

    text-shadow: 0 0 1px hsla(0, 0%, 0%, 0.1);
  }
  &::before {
    content: '';

    width: inherit;
    height: inherit;

    position: fixed;
    left: 0;
    top: 0;

    z-index: 0;
    backdrop-filter: blur(12px);
  }

`

export const TopBar = () => {
    return (
        <Header id="top-bar" >
            <MenuBar />

            <span style={{ flex: '1 1 auto' }} />

            <ActionCenterToggle />

            <button>
                <TopBarTime />
            </button>
        </Header>
    );
};
