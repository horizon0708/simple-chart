import * as React from "react";

interface footerProps {

}

const Footer = (props: footerProps) => {

    return <footer style={{display: "flex", justifyContent:"center", backgroundColor:"#D1C2A4" ,minHeight:"100px"}}>
        <div className={"content"} style={{textAlign: "center"}}>
            <div style={{padding: "40px 0px"}}>
                Made by James Kim <br />
                Using React, MobX, InversifyJS, D3, React-Color and Typescript <br />
                Typescript is {`<3`}

            </div>

        </div>
    </footer>
};

export {Footer}
