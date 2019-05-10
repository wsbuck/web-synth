import React, { Component } from 'react';

import * as Tone from 'tone';

class SynthButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
    this.playSynth = this.playSynth.bind(this);
    this.stopSynth = this.stopSynth.bind(this);
    this.checkMouseDown = this.checkMouseDown.bind(this);
  }

  componentWillMount() {
    this.synth = new Tone.Synth({
      envelope: this.props.envelope,
      oscillator: this.props.oscillator
    }).toMaster();
    this.startTime = null;
    document.addEventListener("keydown", this.keyboardPress.bind(this));
    document.addEventListener("keyup", this.keyboardUp.bind(this));
  }

  keyboardPress(e) {
    if (e.key === this.props.keymap) {
      this.playSynth(e);
    }
  }

  keyboardUp(e) {
    if (e.key === this.props.keymap) {
      this.stopSynth(e);
    }
  }

  playSynth(e) {
    e.preventDefault();
    this.setState({ pressed: true });
    this.synth.triggerAttack(this.props.note);
    this.startTime = Tone.context.currentTime.toFixed(2)
  }

  stopSynth(e) {
    e.preventDefault();
    this.setState({ pressed: false });
    this.synth.triggerRelease();

    let timeLength = (
      Tone.context.currentTime.toFixed(2) - this.startTime
    ).toFixed(2);

    if (this.startTime !== null && this.props.recording) {
      this.props.returnNote({
        pitch: this.props.note,
        midi: Tone.Frequency(this.props.note).toMidi(),
        length: timeLength,
      });
    }
    this.startTime = null;
  }

  checkMouseDown(e) {
    if (e.buttons === 1 || e.buttons === 3) {
      this.playSynth(e);
    } else {
      this.stopSynth(e);
    }
  }

  render() {
    return (
      <div>
        <button
          onMouseDown={(e) => this.playSynth(e)}
          onMouseUp={(e) => this.stopSynth(e)}
          onTouchStart={(e) => this.playSynth(e)}
          onTouchEnd={(e) => this.stopSynth(e)}
          onMouseEnter={(e) => this.checkMouseDown(e)}
          onMouseLeave={(e) => this.stopSynth(e)}
          // onKeyDown={(e) => {this.keyboardPress(e)}}
          // onKeyUp={(e) => this.stopSynth(e)}
          className={this.state.pressed ? "synth-button pressed" : "synth-button"}
        />
      </div>
    )
  }
}

export default SynthButton;