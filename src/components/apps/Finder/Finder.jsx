import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import {directoriesConfig} from "../../../config/finder/directories.config";
import {useTheme} from "../../../hooks/use-theme";
function Finder(props) {
    const [activeTab,setActiveTab] = useState({items: []})
    const [theme,setTheme] = useTheme();
    useEffect(() => {
        setActiveTab(directoriesConfig[1])
        setTimeout(() => console.log(activeTab),10000)
    },[])
    const isDark = theme === "dark";
    const Container = styled.section`
      height: 100%;
      width: 100%;
      //background-color: hsla(0, 0%, 27%, 0.7);
      backdrop-filter: blur(40px);

      backgroun-color: ${isDark => isDark ? "#251E1E" : "#E1DFDF"};

      ////display: grid;
      ////grid-template-rows: auto auto 1fr;
      //
      font-family: var(--app-font-family) !important;
      background-color: #252526;
      padding: 1px;

      border-radius: inherit;

    `
    const SideBar = styled.div`
      padding-top: 45px;
      background: #463F3F;
      height: 100%;
      //border: 2px solid transparent;
      border-radius: 0.75rem 0 0 0.75rem;
      box-shadow: inset 0 0 0 0.9px hsla(var(--app-color-dark-hsl), 0.3),
      0 0 0 1px hsla(var(--app-color-light-hsl), 0.5);
      padding-left: 25px;
    `

    const TitleSpan = styled.span`
      font-weight: bolder;
      font-size: 12px;
      color:${isDark => isDark ? "#8d8484" : "#fff"};
    `
    const SidebarItemsContainer = styled.div`
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;
    `

    const FilesBody = styled.tbody`
      &:before {
        /* This doesn't work because of border-collapse */
        content:"@";
        display:block;
        line-height:0.5px;
        text-indent:-99999px;
      }
    
    `
    const SidebarItem = ({item,icon = null,active}) => {
        const SidebarItemDiv = styled.div`
        `
        const SidebarItemText = styled.span`
          color: white;
          font-weight: bold;
          font-size: 13px;
        `
        if(active) setActiveTab(item)

        return (
            <>
                <div style={{paddingTop: 7}}/>
                <button onClick={() => setActiveTab(item)} style={active ? {backgroundColor: "rgb(90 87 96)",borderRadius: 6,padding: 5} : {}}>
                    <SidebarItemDiv style={active ? {marginTop: 0} : {}}>
                        <SidebarItemText>{item.title}</SidebarItemText>
                    </SidebarItemDiv>
                </button>
            </>
        )
    }
    return (
        <Container>
            <Row style={{flexDirection: 'row',height: '100%',backgroundColor: "#251E1E"}}>
                <Col span={4} style={{height: '100%',maxWidth: 250}}>
                    <SideBar>
                        <TitleSpan>Favorites</TitleSpan>
                        <SidebarItemsContainer>
                            {Object.entries(directoriesConfig).map((data,index) => {
                                const [id,item] = data;

                                return (<SidebarItem active={(activeTab ? (activeTab.title === item.title) : index === 1)} item={item}/>)
                            })}
                        </SidebarItemsContainer>
                    </SideBar>
                </Col>
                <Col span={8} style={{background: "#251E1E",height: "100%",maxWidth: 800}}>
                    <table style={{width: '100%',height: '100%',color: "white",textAlign: 'left',marginLeft: 30,marginTop: 20}}>
                        <thead>
                            <tr>
                                <th style={{fontWeight: "light",fontSize: 12}}>
                                    Name
                                </th>
                                <th style={{fontWeight: "light",fontSize: 12}}>
                                    Kind
                                </th>
                                <th style={{fontWeight: "light",fontSize: 12}}>
                                    Date Last Opened
                                </th>
                            </tr>
                        </thead>
                        <FilesBody>
                            {activeTab && !!(activeTab.items.length) && activeTab.items.map(item => (
                                <>
                                    <tr>
                                        <th style={{fontWeight: "bold"}}>
                                            {item.name}
                                        </th>
                                        <th style={{fontWeight: "light"}}>
                                            {item.type}
                                        </th>
                                        <th style={{fontWeight: "light",fontSize: 12}}>
                                            {(new Date()).toLocaleDateString()}
                                        </th>
                                    </tr>
                                </>
                            ))}
                            {(!activeTab|| !(activeTab.items.length)) && (
                                <h1 style={{paddingTop: 30,fontWeight: 'bold'}}>No Files Found!</h1>
                            )}
                        </FilesBody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
}

export default Finder;
