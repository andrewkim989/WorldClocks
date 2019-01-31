import React, { Component } from 'react';
import './App.css';
import moment from 'moment-timezone';

class App extends Component {
  render() {
    return (
      <div className = "App">
        <Main/>
      </div>
    );
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "",
      submit: false,
      zones: []
    };

    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.submitinput = this.submitinput.bind(this);
  }

  handleChangeSelect(event) {
    var select = event.target.value;
    this.setState({select: select, submit: true});
  }

  submitinput(e) {
    e.preventDefault();
    this.setState({zones: [...this.state.zones, this.state.select], select: "", submit: false});
  }

  render() {
    return (
      <div id = "all">
        <div id = "top">
          <h1>World Clocks</h1><br/>
          <h4>Select a time zone, then add the clock corresponding to that zone in the application.</h4>
        </div>
        <div id = "clockform">
          <form onSubmit = {this.submitinput}>
            <select onChange = {this.handleChangeSelect} value = {this.state.select}>
              <Select/>
            </select>
            <br></br><br></br>

            <input type = "submit" className = "btn btn-primary" disabled = {!this.state.submit}
            value = "Add Clock"></input>
          </form>
        </div>
        <div id = "clocks">
          <Clocks zones = {this.state.zones} />
        </div>
      </div>
    )
  }
}

class Select extends Component {

  render() {
    var z = [];
    var zones = moment.tz.names();

    z.push(<option value = "" key = {"select"} disabled>Select a time zone</option>);
    zones.map((zone, index) => {
      return (z.push(<option value = {zone} key = {index}>{zone}</option>));
    });

    return z;
  }
}

class Clocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zones: this.props.zones
    }
  }

  seconds() {
    this.setState({
      zones: this.props.zones
    })
  }

  componentDidMount() {
    this.interval = setInterval( () => this.seconds(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  close(index) {
    this.props.zones.splice(index, 1);
  }

  render() {
    var c = this.state.zones.map ((zone, index) => {
      return (
        <div className = "clock" key = {index}>
          <h4>{zone}</h4>
          <p>{moment().tz(zone).format("h:mm:ss A")}</p>
          <button type = "button" className = "btn btn-link" onClick = 
          {() => this.close(index)}>Close</button>
        </div>
      )
    });

    return c;
  }
}

export default App;
