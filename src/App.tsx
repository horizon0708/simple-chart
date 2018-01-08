import * as React from 'react';
import './App.css';
import Main from './pages/mainCanvas/pMain';
import './Chart.css';
import ConfigSideBar from "./components/configSideBar/configSideBar";
class App extends React.Component {
  render() {
    return (
      <div className="App">
          <div className="columns">
              <div className="column is-narrow">
                  <Main />
              </div>
            <div className="column is-4">
                <ConfigSideBar/>
            </div>

          </div>
      </div>
    );
  }
}

export default App;
