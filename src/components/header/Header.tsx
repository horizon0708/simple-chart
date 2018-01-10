import * as React from "react";
import * as ssap from "../../services/saveSvgAsPng";
import * as style from './header.css';
import {followWidthOnResize, initialResize} from "../../services/onResize";

interface HeaderProps {

}

class Header extends React.Component<HeaderProps, {}>{
    componentDidMount() {
        followWidthOnResize("navbar", "follow");
        initialResize("navbar","follow");
    }
    handleExport = () =>{
        ssap.saveSvgAsPng(document.getElementById("chart-canvas"),"test.png", {scale: 2});
    };
    render(){
        return <nav className={style.wrapper} role="navigation" aria-label="main navigation">
            <div id={"navbar"} className={style.container}>
                <div className={style.headerItemContainer}>
                    <div className={style.headerItem}><a style={{color: "#C95E54" ,fontSize:"2em",fontFamily: 'Lobster'}} >SimpleGraph</a></div>
                </div>

                <div className={style.headerItemContainer}>
                    <div className={style.headerItem}>
                        <div onClick={this.handleExport} className={'customButton'}> <i style={{marginRight: "5px"}} className="fa fa-download" aria-hidden="true" />
                            <b>download</b></div>
                    </div>

                </div>
            </div>

        </nav>
    }
}

export {Header}
