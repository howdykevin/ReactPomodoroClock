import React from "react";

function ResetButton(props) {
  return (
    <button className="btn btn-primary" onClick={props.reset} id="reset">
      <i className="fas fa-sync" />
    </button>
  );
}

export default ResetButton;
