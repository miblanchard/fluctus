// require npm modules
const React = require('react');
const ReactDOM = require('react-dom');
const LineChart = require('react-chartjs').Line;
let xAvg = 0;
let yAvg = 0;
let zAvg = 0;
const xDataArray = [0, 1, 2, 3, 4];
const yDataArray = [0, 1, 2, 3, 4];
const zDataArray = [0, 1, 2, 3, 4];

const App = React.createClass({
  getInitialState() {
    return {
      startingData: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            fillColor: 'rgba(220,220,220,0)',
            strokeColor: 'rgba(88, 36, 169, 1)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
            fillColor: 'rgba(151,187,205,0)',
            strokeColor: 'rgba(44, 53, 172, 1)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
            fillColor: 'rgba(151,187,205,0)',
            strokeColor: 'rgba(249, 226, 34, 1)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      chartOptions: {
        animationSteps: 1,
        scaleGridLineColor: 'rgba(255, 230, 161, 1)',
        scaleOverride: true,
        scaleSteps: 8,
        scaleStepWidth: 5,
        scaleStartValue: -20,
        datasetStrokeWidth: 8,
        scalefontSize: 50,
      },
    };
  },

  componentDidMount() {
    imperio.listenerRoomSetup();
    imperio.accelerationListener(this.calculateRunningAverage);
    this.setState({latestLabel: this.state.startingData.labels[9]})
    const canvas = document.getElementById('accel-chart');
    // const ctx = canvas.getContext('2d');
  },

  calculateRunningAverage(accelerationDataObject) {
    console.log('accel event heard');
    xDataArray.shift();
    xDataArray.push(accelerationDataObject.x);
    xAvg = xDataArray.reduce((a, b) => a + b) / 5;
    yDataArray.shift();
    yDataArray.push(accelerationDataObject.y);
    yAvg = yDataArray.reduce((a, b) => a + b) / 5;
    zDataArray.shift();
    zDataArray.push(accelerationDataObject.z);
    zAvg = zDataArray.reduce((a, b) => a + b) / 5;
  },

  addData() {
    LineChart.removeData();
    LineChart.addData([xAvg, yAvg, zAvg], ++this.state.latestLabel);
  },
  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    // setInterval(this.addData, 60);
    return (
      <div id="app">
        <h1>fluctus</h1>
        <div id="nonceContainer">Mobile code: {imperio.nonce}</div>
        <LineChart data={this.state.startingData} options={this.state.chartOptions} />
        {/*<canvas id="accel-chart"></canvas>*/}
      </div>
    );
  },
});

ReactDOM.render(<App />, document.getElementById('content'));
