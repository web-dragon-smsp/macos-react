import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import {directoriesConfig} from "../../../config/finder/directories.config";
function AboutMac(props) {
    const [activeTab,setActiveTab] = useState({items: []})

    useEffect(() => {
        setActiveTab(directoriesConfig[1])
        setTimeout(() => console.log(activeTab),10000)
    },[])
    const Container = styled.section`
      height: 100%;
      width: 100%;
      //background-color: hsla(0, 0%, 27%, 0.7);
      backdrop-filter: blur(40px);

      backgroun-color: "#251E1E";

      //display: grid;
      //grid-template-rows: auto auto 1fr;

      font-family: var(--app-font-family) !important;
    `

    return (
        <Container>
            <Row style={{flexDirection: 'row',height: '100%',backgroundColor: "#251E1E"}}>
                <Col span={4} style={{height: '100%',maxWidth: 250}}>
                    <h1>M1 Max</h1>
                </Col>
                <Col span={8} style={{background: "#251E1E",height: "100%",maxWidth: 800}}>
                    <h1>Macos </h1>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutMac;
