import React from "react";

class SessionLength extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="session">
        <h2 className="text-center" id="session-label">
          Session Length
        </h2>
        <div className="text-center">
          <span className="pr-3" onClick={this.props.increase}>
            <i className="fas fa-arrow-up" id="session-increment" />
          </span>
          <h4 className="d-inline pr-3" id="session-length">
            {this.props.session}
          </h4>
          <span onClick={this.props.decrease}>
            <i className="fas fa-arrow-down" id="session-decrement" />
          </span>
        </div>
      </div>
    );
  }
}

export default SessionLength;
