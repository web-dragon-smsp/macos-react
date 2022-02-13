import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {appsConfig} from "../../config/apps/apps.config";
import DockItem from "./DockItem";
import { useMotionValue } from 'framer-motion';
import {openAppsStore} from "../../stores/apps.store";
import {useAtom} from "jotai";

const DockContainer = styled.section`
  position: fixed;
  margin-bottom: 0.3rem;
  bottom: 0;
  left: 0;
  z-index: 9900;

  width: 100%;
  height: 5.2rem;

  padding: 0.4rem;

  display: flex;
  justify-content: center;

`

const HoverStrip = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
`

const DockEl = styled.div`
  background-color: hsla(var(--app-color-light-hsl), 0.4);

  box-shadow: inset 0 0 0 0.2px hsla(var(--app-color-grey-100-hsl), 0.7),
  0 0 0 0.2px hsla(var(--app-color-grey-900-hsl), 0.7), hsla(0, 0%, 0%, 0.3) 2px 5px 19px 7px;

  position: relative;

  padding: 0.3rem;

  border-radius: 1.2rem;

  height: 100%;

  display: flex;
  align-items: flex-end;
  &.auto-hidden {
    transform: translate3d(0, 200%, 0);

    &::before {
      width: calc(100% - 2px);
      height: calc(100% - 2px);

      margin-top: 1px;
      margin-left: 1px;
    }
  }

  &::before {
    content: '';

    width: 100%;
    height: 100%;

    border: inherit;

    backdrop-filter: blur(10px);

    position: absolute;
    top: 0;
    left: 0;

    z-index: -1;
  }
`

const Divider = styled.div`
  height: 100%;
  width: 0.2px;
  background-color: hsla(var(--system-color-dark-hsl), 0.3);
  margin: 0 4px;
`

const Dock = (props) => {
    const mouseX = useMotionValue(null);
    const [apps,setApps] = useState([]);
    const [openApps] = useAtom(openAppsStore);

    useEffect(() => {
        setApps(Object.entries(appsConfig))
        return () => setApps([]);
    },[])
    return (
        <>
            <DockContainer className="auto-hide">
                <HoverStrip/>
                <DockEl
                    onMouseMove={(event) => mouseX.set(event.nativeEvent.x)}
                    onMouseLeave={() => mouseX.set(null)}>
                    {apps.map(item => {
                        const [appId, config] = item;
                        config.isOpen = openApps[appId];
                        return (<React.Fragment key={appId + " " + config.title}>
                            {config.dockBreaksBefore && <Divider/>}
                            <DockItem  mouseX={mouseX} appId={appId} config={config}/>
                        </React.Fragment>)
                    })}
                </DockEl>
            </DockContainer>
        </>
    );
}

export default Dock;
