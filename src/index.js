import React from "react";
import ReactDOM from "react-dom";
import Break from "../src/components/Lengths/BreakLength";
import Session from "../src/components/Lengths/SessionLength";
import Display from "../src/components/window/Display";
import Buttons from "../src/components/Buttons/ButtonControls";

import "./styles.css";
var accurateInterval = require("accurate-interval");

class TimerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //in seconds.convert back to minutes later on
      active: true,
      timer: 1500,
      intervalID: "",
      session: 25,
      break: 5,
      currentState: "Session"
    };
    this.decrementTimer = this.decrementTimer.bind(this);
    this.finishTimerWrapper = this.finishTimerWrapper.bind(this);
    this.remainingClockView = this.remainingClockView.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.phaseChange = this.phaseChange.bind(this);
    this.handleClickDecrease = this.handleClickDecrease.bind(this);
    this.handleClickIncrease = this.handleClickIncrease.bind(this);
  }

  handleClickIncrease(e) {
    if (!this.state.active) return;
    if (e.target.id === "session-increment") {
      if (this.state.session < 60) {
        this.setState(
          {
            session: this.state.session + 1
          },
          () => {
            if (this.state.currentState === "Session") {
              this.setState({
                timer: this.state.session * 60
              });
              this.remainingClockView();
            }
          }
        );
      }
    } else if (e.target.id === "break-increment") {
      if (this.state.break < 60) {
        this.setState(
          {
            break: this.state.break + 1
          },
          () => {
            if (this.state.currentState === "Break") {
              this.setState({
                timer: this.state.break * 60
              });
              this.remainingClockView();
            }
          }
        );
      }
    }
  }

  handleClickDecrease(e) {
    if (!this.state.active) return;
    if (e.target.id === "session-decrement") {
      if (this.state.session > 1) {
        this.setState(
          {
            session: this.state.session - 1
          },
          () => {
            if (this.state.currentState === "Session") {
              this.setState({
                timer: this.state.session * 60
              });
              this.remainingClockView();
            }
          }
        );
      }
    } else if (e.target.id === "break-decrement") {
      if (this.state.break > 1) {
        this.setState(
          {
            break: this.state.break - 1
          },
          () => {
            if (this.state.currentState === "Break") {
              this.setState({
                timer: this.state.break * 60
              });
              this.remainingClockView();
            }
          }
        );
      }
    }
  }

  decrementTimer() {
    this.setState({
      timer: this.state.timer - 1
    });
  }

  finishTimerWrapper() {
    console.log("timer start");
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTimer();
        this.buzzer(this.state.timer);
        this.phaseChange(this.state.timer);
      }, 1000)
    });
  }

  remainingClockView() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }

  togglePlay() {
    this.setState(
      {
        active: !this.state.active
      },
      () => {
        this.state.active ? this.pauseTimer() : this.finishTimerWrapper();
      }
    );
  }

  pauseTimer() {
    console.log("timer paused");
    console.log(this.state.intervalID);
    this.state.intervalID && this.state.intervalID.clear();
  }

  buzzer(timer) {
    if (timer === 0) {
      let sound = document.getElementById("beep");
      sound.play();
    }
  }

  phaseChange(time) {
    if (time < 0) {
      if (this.state.currentState === "Session") {
        this.state.intervalID && this.state.intervalID.clear();
        this.finishTimerWrapper();
        this.setState(
          {
            timer: this.state.break * 60,
            currentState: "Break"
          },
          () => {
            this.remainingClockView();
          }
        );
      } else {
        this.state.intervalID && this.state.intervalID.clear();
        this.finishTimerWrapper();
        this.setState(
          {
            timer: this.state.session * 60,
            currentState: "Session"
          },
          () => {
            this.remainingClockView();
          }
        );
      }
    }
  }

  resetTimer() {
    this.setState({
      active: true,
      timer: 1500,
      session: 25,
      break: 5,
      currentState: "Session"
    });
    this.state.intervalID && this.state.intervalID.clear();
    let sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#E7DECD";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render() {
    return (
      <div className="App mt-2">
        {/*controls display*/}
        <div className="row">
          <div className="col-12">
            <h1>Pomodoro Clock</h1>
          </div>
          <div className="col-6">
            <Break
              decrease={this.handleClickDecrease}
              increase={this.handleClickIncrease}
              break={this.state.break}
            />
          </div>
          <div className="col-6">
            <Session
              decrease={this.handleClickDecrease}
              increase={this.handleClickIncrease}
              session={this.state.session}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-8 mx-auto mt-2">
            <Display
              clock={this.remainingClockView}
              title={this.state.currentState}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-5 mx-auto mt-2">
            <Buttons
              play={this.togglePlay}
              active={this.state.active}
              reset={this.resetTimer}
            />
          </div>
        </div>
        <p className="mb-0 mt-2">Designed and Coded by</p>
        <p>Kevin.G</p>
        {/*need to introduce a function to play the sound file*/}
        <audio id="beep" src="https://goo.gl/65cBl1" preload="auto" />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TimerApp />, rootElement);

//soundfile
//https://goo.gl/65cBl1
/*TODO Lists: 
  3) Once timer finishes, it would display the other timer
  4)Introduce a function that changes the big time display according to the controls
  display.
  5)Changes the window heading accordinglt.If it is session time,then display session else display break
 */
