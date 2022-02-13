import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss"
import Desktop from "./components/Desktop/Desktop";

ReactDOM.render(
    <React.Fragment>
        <Desktop/>
    </React.Fragment>,
    document.querySelector("div#root"))
