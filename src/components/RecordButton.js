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

  record(e) {
    e.preventDefault();
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
          onMouseDown={(e) => this.record(e)}
          onTouchEnd={(e) => this.record(e)}
          className={this.state.pressed ? "synth-button pressed blink_text" : "synth-button"}
        >
          <FiberManualRecord className="blink_texts" />
        </button>
      </div>
    )
  }
}

export default RecordButton;