import React, { Component } from 'react';

import { FiberManualRecord } from '@material-ui/icons';

class RecordButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      color: "error",
    };
  }

  record() {
    const {pressed} = this.state;
    this.props.isRecording(!pressed)
    this.setState({
      pressed: !pressed,
    });
  }

  render() {

    return (
      <div>
        <button
          onMouseDown={() => this.record()}
          onTouchStart={() => this.record()}
          className={this.state.pressed ? "synth-button pressed blink_text" : "synth-button"}
        >
          <FiberManualRecord className="blink_texts" color="error" />
        </button>
      </div>
    )
  }
}

export default RecordButton;