import clsx from 'clsx';
import { useRef } from 'react';
import { RovingTabIndexProvider, useFocusEffect, useRovingTabIndex } from 'react-roving-tabindex';
import './Menu.scss';
import styled from "styled-components";
import {useImmerAtom} from "jotai/immer";
import {activeAppStore, openAppsStore} from "../../../stores/apps.store";
import {useAtom} from "jotai";
import {openApp} from "../../../helpers/open-app";


export const Menu = ({ menu }) => {
    const [, setOpenApps] = useImmerAtom(openAppsStore);
    const [, setActiveApp] = useAtom(activeAppStore);
    const Container = styled.div`
      // Initial invisible border
      --additional-box-shadow: 0 0 0 0 white;

      display: block;

      min-width: 16rem;
      width: max-content;

      padding: 0.5rem;

      position: relative;

      user-select: none;

      background-color: hsla(var(--app-color-light-hsl), 0.3);
      backdrop-filter: blur(25px);

      border-radius: 0.5rem;

      box-shadow: hsla(0, 0%, 0%, 0.3) 0px 0px 11px 0px, var(--additional-box-shadow);

      :global(body.dark) & {
        --additional-box-shadow: inset 0 0 0 0.9px hsla(var(--app-color-dark-hsl), 0.3),
        0 0 0 1.2px hsla(var(--app-color-light-hsl), 0.3);
      }
    `
    return (
        <Container tabIndex={-1}>
            <RovingTabIndexProvider options={{ direction: 'vertical', loopAround: true }}>
                {Object.keys(menu).map((key) => (
                    <>
                        <MenuItemButton
                            key={key}
                            className={"menuItem " + (menu[key].disabled ? "disabled" : "")}
                            disabled={menu[key].disabled}
                            setActiveApp={setActiveApp}
                            setOpenApps={setOpenApps}
                        >
                            {menu[key].title}
                        </MenuItemButton>
                        {menu[key].breakAfter && <div key={`divider-${key}`} className={"divider"} />}
                    </>
                ))}
            </RovingTabIndexProvider>
        </Container>
    );
};

const MenuItemButton = ({
                            children,
                            disabled = false,
                            setOpenApps,
                            setActiveApp,
                            ...props
                        }) => {
    const ref = useRef();

    const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(ref, disabled);
    useFocusEffect(focused, ref);
    return (
        <button
            tabIndex={tabIndex}
            ref={ref}
            onKeyDown={handleKeyDown}
            onClick={() => {
                if(children === "About This Mac") {
                    openApp({appID: "about-mac",config: {
                            "shouldOpenWindow": true,
                            "dockBreaksBefore": false,
                            "resizable": false,
                            "expandable": false,
                            "width": 600,
                            "height": 500,
                            "title": "About This Mac"
                        },setOpenApps,setActiveApp})
                    console.log("Open About This Mac")
                } else {
                    handleClick()
                }
            }}
            {...props}
        >
            {children}
        </button>
    );
};
