import React, {useEffect, useRef} from 'react';
import Dock from "../Dock/Dock";
import styled from "styled-components";
import {ContextMenu} from "./ContextMenu/ContextMenu";
import {TopBar} from "../TopBar/TopBar";
import {WindowsArea} from "./Window/WindowsArea";
import {useTheme} from "../../hooks/use-theme";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function Desktop(props) {

    const outerRef = useRef();
    const [theme,setTheme] = useTheme();
    const Main = styled.main`
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-rows: auto 1fr auto;
    `

    const BackgroundCover = styled.div`
      
        height: 100%;
        width: 100%;

        z-index: -1;
        position: fixed;
        top: 0;
        left: 0;

        will-change: background-image;

        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        background-image: url(./../../assets/wallpapers/37-2.jpg);

        &.dark {
          background-image: url(./../../assets/wallpapers/37-1.jpg);
        }
      
    `

    return (
        <>
            <main ref={outerRef}>
                <ContextMenu outerRef={outerRef}/>
                <TopBar/>
                <WindowsArea/>
                <Dock/>
            </main>

            {/*<BackgroundCover style={{backgroundImage: theme === "dark" ? "./../../assets/wallpapers/37-1.jpg" : "./../../assets/wallpapers/37-2.jpg"}}/>*/}
            <BackgroundCover className={theme === "dark" ? "dark" : ""}/>
        </>
    );
}

export default Desktop;
