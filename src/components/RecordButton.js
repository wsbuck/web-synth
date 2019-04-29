import React, { Component } from 'react';

// import * as Tone from 'tone';
// import * as mm from '@magenta/music';

import { FiberManualRecord } from '@material-ui/icons';


class RecordButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      // recording: false,
      color: "error",
    };
  }

  record() {
    const {pressed} = this.state;
    this.props.isRecording(!pressed)
    this.setState({
      pressed: !pressed,
      // recording: !this.state.recording
    });

  }

  render() {

    return (
      <div>
        <button
          onMouseDown={() => this.record()}
          className={this.state.pressed ? "synth-button pressed blink_text" : "synth-button"}
        >
          <FiberManualRecord className="blink_texts" color="error" />
        </button>
      </div>
    )
  }
}

export default RecordButton;