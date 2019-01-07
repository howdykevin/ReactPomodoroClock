import React from "react";
import Play from "./Play";
import Reset from "./Reset";

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Play active={this.props.active} play={this.props.play} />
        <Reset reset={this.props.reset} />
      </div>
    );
  }
}

export default Buttons;
