import React, { Component } from 'react';

import * as Tone from 'tone';
//import * as mm from '@magenta/music';


class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
    this.synth = new Tone.AMSynth().toMaster();
    this.triggerSynth = this.triggerSynth.bind(this);
  }

  componentDidMount() {
    Tone.Transport.schedule(this.triggerSynth, 0);
    Tone.Transport.schedule(this.triggerSynth, '0:2');
    Tone.Transport.schedule(this.triggerSynth, '0:2:2.5');

    Tone.Transport.loopEnd = '1m'
    Tone.Transport.loop = true
  }

  triggerSynth(time) {
    //the time is the sample-accurate time of the event
    this.synth.triggerAttackRelease('C2', '8n', time)
  }

  play() {
    this.setState({pressed: !this.state.pressed});
    Tone.Transport.toggle();
  }

  render() {

    return (
      <div>
        <button
          onMouseDown={() => this.play()}
          className={this.state.pressed ? "drum-button pressed" : "drum-button"}
        />
      </div>
    )
  }
}

export default PlayButton;