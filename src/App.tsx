import * as React from 'react';
import './App.css';
import Main from './pages/pMain';
import './Chart.css';
import PieControl from "./pages/pieControl";
import DataControl from './pages/dataControl';
import LegendControl from './pages/legendControl';
class App extends React.Component {
  render() {
    return (
      <div className="App">
          <div className="columns">
            <div className="column is-4">
                <div>
                    <div>
                        Graph Parameters
                    </div>
                    <PieControl />
                </div>
                <div>
                    <div>
                        Data
                    </div>
                    <DataControl />
                </div>
                <div>
                    <div>
                        Legend
                    </div>
                    <LegendControl />
                </div>

            </div>
              <div className="column">
                  <Main />

              </div>
          </div>
      </div>
    );
  }
}

export default App;
