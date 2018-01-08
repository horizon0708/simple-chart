import * as React from 'react';
import './App.css';
import Main from './pages/mainCanvas/pMain';
import './Chart.css';
import PieControl from "./pages/pieControl/pieControl";
import DataControl from './pages/dataControl/dataControl';
import LegendControl from './pages/legendControl/legendControl';
import CollapsableBox from './components/collapsableBox/collapsableBox';
import CollapsableControlBox from "./components/collapsableControlBox/collapsableControlBox";
class App extends React.Component {
  render() {
    return (
      <div className="App">
          <div className="columns">
              <div className="column is-narrow">
                  <Main />
              </div>
            <div className="column is-4">
                <CollapsableControlBox selector={"svg-chart"} header={"Chart"}><PieControl /></CollapsableControlBox>
                <CollapsableControlBox selector={"svg-legend"} header={"Legend"}><LegendControl /></CollapsableControlBox>
                <CollapsableBox header={"Data"}><DataControl /></CollapsableBox>
            </div>

          </div>
      </div>
    );
  }
}

export default App;
