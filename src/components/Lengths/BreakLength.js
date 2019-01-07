import React from "react";

class BreakLength extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="break">
        <h2 className="text-center" id="break-label">
          Break Length
        </h2>
        <div className="text-center">
          <span className="pr-3" onClick={this.props.increase}>
            <i className="fas fa-arrow-up" id="break-increment" />
          </span>
          <h4 className="d-inline pr-3" id="break-length">
            {this.props.break}
          </h4>
          <span onClick={this.props.decrease}>
            <i className="fas fa-arrow-down" id="break-decrement" />
          </span>
        </div>
      </div>
    );
  }
}

export default BreakLength;
