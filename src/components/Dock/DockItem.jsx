import React, {useRef, useState} from 'react';
import styled from "styled-components";
import { useAtom } from 'jotai';
import { useImmerAtom } from 'jotai/immer';
import useRaf from '@rooks/use-raf';
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {activeAppStore,AppID, openAppsStore} from "../../stores/apps.store";
import Dock from "./Dock";

const OpenAppButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    border-radius: 0.5rem;
    &:hover,
    &:focus-visible {
      .tooltip.tooltip-enabled {
        display: block;
      }
    }
    & > span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
`

const Image = styled.img`
    will-change: width
`

const Toolip = styled.p`
  --double-border: 0 0 0 0 white;
  white-space: nowrap;
  position: absolute;
  background-color: hsla(var(--system-color-light-hsl), 0.5);
  backdrop-filter: blur(5px);
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  box-shadow: hsla(0deg, 0%, 0%, 30%) 0px 1px 5px 2px, var(--double-border);
  color: var(--system-color-light-contrast);
  font-family: var(--system-font-family);
  font-weight: 400;
  font-size: 0.9rem;
  letter-spacing: 0.4px;
  display: none;
  &.dark {
    --double-border: inset 0 0 0 0.9px hsla(var(--system-color-dark-hsl), 0.3),
    0 0 0 1.2px hsla(var(--system-color-light-hsl), 0.3);
  }
`

const Dot = styled.div`
  height: 4px;
  width: 4px;
  margin: 0px;
  border-radius: 50%;
  background-color: var(--system-color-dark);
  opacity: var(--opacity);
`

const DockItem = ({appId,config,mouseX}) => {
    const {
        title,
        externalAction,
        isOpen,
        shouldOpenWindow,
    } = config;
    const appID = appId;
    const [, setOpenApps] = useImmerAtom(openAppsStore);
    const [, setActiveApp] = useAtom(activeAppStore);
    const [animateObj, setAnimateObj] = useState({ translateY: ['0%', '0%', '0%'] });

    const imgRef = useRef();

    const { width } = useDockHoverAnimation(mouseX, imgRef);

    function openApp(e) {
        if (!shouldOpenWindow) return void externalAction?.(e);

        setOpenApps((apps) => {
            apps['about-mac'] = true;
            apps[appID] = true;
            return apps;
        });
        setActiveApp(appID);
    }
    return (
        <>
            <OpenAppButton  aria-label={`Launch ${title}`} onClick={openApp}>
                    <Toolip>
                        {config.title}
                    </Toolip>
                <motion.span
                    onTap={() => setAnimateObj({ translateY: ['0%', '-39.2%', '0%'] })}
                    initial={false}
                    animate={animateObj}
                    transition={{ type: 'spring', duration: 0.7 }}
                    transformTemplate={({ translateY }) => `translateY(${translateY})`}
                >
                    <motion.img
                        ref={imgRef}
                        src={require(`./../../assets/app-icons/${appID}/256.png`)}
                        draggable={false}
                        style={{ width, willChange: 'width' }}
                        alt={`${title} app icon`}
                    />
                </motion.span>
                <Dot style={{'--opacity': +isOpen}}/>
            </OpenAppButton>
        </>
    );
}

const baseWidth = 57.6;
const distanceLimit = baseWidth * 6;
const beyondTheDistanceLimit = distanceLimit + 1;
const distanceInput = [
    -distanceLimit,
    -distanceLimit / 1.25,
    -distanceLimit / 2,
    0,
    distanceLimit / 2,
    distanceLimit / 1.25,
    distanceLimit,
];
const widthOutput = [
    baseWidth,
    baseWidth * 1.1,
    baseWidth * 1.414,
    baseWidth * 2,
    baseWidth * 1.414,
    baseWidth * 1.1,
    baseWidth,
];

const useDockHoverAnimation = (
    mouseX,
    ref,
) => {
    const distance = useMotionValue(beyondTheDistanceLimit);

    const widthPX = useSpring(
        useTransform(distance, distanceInput, widthOutput),
        {
            stiffness: 1300,
            damping: 82,
        },
    );

    const width = useTransform(widthPX, (width) => `${width / 16}rem`);

    useRaf(() => {
        const el = ref.current;
        const mouseXVal = mouseX.get();
        if (el && mouseXVal !== null) {
            const rect = el.getBoundingClientRect();

            const imgCenterX = rect.left + rect.width / 2;

            // difference between the x coordinate value of the mouse pointer
            // and the img center x coordinate value
            const distanceDelta = mouseXVal - imgCenterX;
            distance.set(distanceDelta);
            return;
        }

        distance.set(beyondTheDistanceLimit);
    }, true);

    return {width}
}

export default DockItem;
