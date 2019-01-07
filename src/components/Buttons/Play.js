import React from "react";

function PlayButton(props) {
  return (
    <button
      className={props.active ? "btn btn-success mr-2" : "btn btn-danger mr-2"}
      onClick={() => props.play()}
      id="start_stop"
    >
      {/*<i class="fas fa-play-circle" />*/}
      {props.active ? (
        <i className="fas fa-play-circle" />
      ) : (
        <i className="fas fa-pause-circle" />
      )}
    </button>
  );
}

export default PlayButton;

//pause symbol. Need to toggle between play and pause functionality
// <i class="fas fa-pause-circle"></i>
