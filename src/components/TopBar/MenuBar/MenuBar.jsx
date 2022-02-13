import { mdiApple } from '@mdi/js';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import {AppIcon} from "../../utils/AppIcon";
import { useFocusOutside, useOutsideClick} from "../../../hooks";
import { activeMenuStore, menuBarMenusStore} from "../../../stores/menubar.store";
import { Menu } from './Menu';
import styled from "styled-components";
import "./MenuBar.scss"
export const MenuBar = () => {
    const Container = styled.div`
      height: 100%;

      display: flex;
      position: relative;
    `


    const [currentAppMenus] = useAtom(menuBarMenusStore);
    const [activeMenu, setActiveMenu] = useAtom(activeMenuStore);

    const parentRef = useRef();

    /** Close when document focus isn't in any menubar */
    useFocusOutside(parentRef, () => setActiveMenu(''));

    /** Close when clicked outside */
    useOutsideClick(parentRef, () => setActiveMenu(''));



    return (
        <Container  ref={parentRef}>
            {Object.keys(currentAppMenus).map((menuID) => (
                <div key={menuID}>
          <span style={{ height: '100%' }}>
            <button
                onClick={() => setActiveMenu(menuID)}
                onMouseOver={() => activeMenu && setActiveMenu(menuID)}
                onFocus={() => setActiveMenu(menuID)}
                // className={clsx({
                //     [styles.menuButton]: true,
                //     [styles.defaultMenu]: menuID === 'default',
                //     [styles.appleIconButton]: menuID === 'apple',
                // })}
                className={"menuButton " + (menuID === "default" ? "defaultMenu " : (menuID === "apple" && "appleIconButton"))}
                style={{ '--scale': activeMenu === menuID ? 1 : 0 }}
            >
              {menuID === 'apple' ? (
                  <AppIcon size={18} path={mdiApple} />
              ) : (
                  currentAppMenus[menuID].title
              )}
            </button>
          </span>
                    <div
                        className={"menuParent"}
                        style={{
                            visibility: activeMenu !== menuID ? 'hidden' : 'visible',
                        }}
                    >
                        <Menu menu={currentAppMenus[menuID].menu} />
                    </div>
                </div>
            ))}
        </Container>
    );
};
