import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import {directoriesConfig} from "../../../config/finder/directories.config";
import styles from './AboutMac.module.scss'
function AboutMac(props) {
    const [activeTab,setActiveTab] = useState({items: []})

    useEffect(() => {
        setActiveTab(directoriesConfig[1])
        setTimeout(() => console.log(activeTab),10000)
    },[])

    const MacOsTitle = styled.h1`
      font-size: 20px;
      font-weight: 300;
    `

    const MacOsSpan = styled.span`
      font-weight: bold;
    `

    const MacOsVersionTitle = styled.h4`
      font-weight: 400;
      font-size: 12px;
      padding-top: 2px;
    `
    const MacOsVersionSpan = styled.span`
      font-weight: 450;
    `
    const MacOsDetailsContainer = styled.div`
      padding-top: 20px;
    `
    const MacOsDetailsTitle = styled.h3`
      font-weight: bold;
      font-size: 13px;
    `

    const MacOsDetailsRow = styled.div`
      display: flex;
      justify-content: left;
      padding-top: 10px;
    `

    const MacOsDetailsValue = styled.h4`
      font-size: 13px;
      padding-left: 20px;
      font-weight: 350;
    `

    return (
        <section className={styles.container}>
            <div className={styles.header} style={{textAlign: 'center',color: "#fff",fontWeight: "bold"}}>
                <h3>Overview</h3>
            </div>
            <Row style={{background: "#251E1E"}} className={styles.content}>
                <Col span={4} style={{height: '100%',maxWidth: 250,display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                    <img src={require("./../../../assets/macos12-logo.png")} className={styles.maclogo} alt={""}/>
                </Col>
                <Col span={8} style={{background: "#251E1E",height: "100%",maxWidth: 800}}>
                    <div className={styles.macdetails}>
                        <MacOsTitle><MacOsSpan>macOS</MacOsSpan> Monterey</MacOsTitle>
                        <MacOsVersionTitle><MacOsVersionSpan>Version</MacOsVersionSpan> 12.2</MacOsVersionTitle>
                        <MacOsDetailsContainer>
                            <MacOsDetailsTitle>MacBook Pro (16-inch, 2021)</MacOsDetailsTitle>
                            <MacOsDetailsRow>
                                <MacOsDetailsTitle>Chip </MacOsDetailsTitle>
                                <MacOsDetailsValue>Apple M1 Max</MacOsDetailsValue>
                            </MacOsDetailsRow>
                            <MacOsDetailsRow>
                                <MacOsDetailsTitle>Memory </MacOsDetailsTitle>
                                <MacOsDetailsValue>32 GB</MacOsDetailsValue>
                            </MacOsDetailsRow>
                            <MacOsDetailsRow>
                                <MacOsDetailsTitle>Serial Number </MacOsDetailsTitle>
                                <MacOsDetailsValue>12345678</MacOsDetailsValue>
                            </MacOsDetailsRow>
                        </MacOsDetailsContainer>
                    </div>
                </Col>
            </Row>
        </section>
    );
}

export default AboutMac;
