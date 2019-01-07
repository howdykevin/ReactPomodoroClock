import React from "react";

class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="window">
        <h3 className="mb-0" id="timer-label">
          {this.props.title}
        </h3>
        <div id="time-left">{this.props.clock()}</div>
      </div>
    );
  }
}

export default Display;
