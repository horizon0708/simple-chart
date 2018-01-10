import * as React from 'react';
import Main from './pages/mainCanvas/pMain';
import ConfigSideBar from "./components/configSideBar/configSideBar";
import {Header} from "./components/header/Header";
import * as style from './App.css';
import CollapsableBox from "./components/collapsableBox/collapsableBox";
import DataControl from "./pages/dataControl/dataControl";
import {Footer} from "./components/footer/footer";

class App extends React.Component {
  render() {
    return (
      <div className={`App ${style.background}`}>
          <Header />
          <div  className="columns is-gapless" style={{minHeight:"950px"}}>
              <div className="column is-7 follow">
                  <Main />
              </div>
              <div className="column is-5 follow">
                  <div className={"columns is-desktop is-gapless"}>
                      <div className="column">
                          <ConfigSideBar/>
                      </div>
                      <div className={"column"}>
                          <CollapsableBox header={"Data"}><DataControl modelName={"graphOption"}  arraySize={9}/></CollapsableBox>
                      </div>
                  </div>

              </div>

          </div>
          <Footer/>

      </div>
    );
  }
}

export default App;
