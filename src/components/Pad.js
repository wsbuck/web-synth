import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
// import Slider from '@material-ui/lab/Slider';

// import * as Tone from 'tone';

import SynthButton from './SynthButton';
// import PlayButton from './PlayButton';
// import PlaybackButton from './PlaybackButton';

class Pad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [],
      octave: 3,
    };
    this.returnNote = this.returnNote.bind(this);
  }

  componentWillMount() {
    this.envelope = {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.5,
      release: 1.0,
      attackCurve: "linear",
      decayCurve: "exponential",
      releaseCurve: "exponential"
    }

  }

  returnNote(note) {
    // console.log(time.beg);
    // console.log(time.end);
    let sequence = this.state.sequence;
    console.log(note);
    sequence.push({
      pitch: note.pitch,
      startTime: note.startTime,
      endTime: note.endTime
    })
    this.setState({ sequence: sequence });
  }

  render() {
    const sm = 2;
    const octave = this.state.octave;
    let notes = [
      'C', 'C#', 'D', 'D#', 'E', 'F',
     'F#', 'G', 'G#', 'A', 'A#', 'B'
    ];

    notes = notes.map(note => note + octave);

    return (
      <div className="pad">
        <Grid container spacing={24} justify="center">
          {notes.map((value, index) => (
            <Grid item sm={sm} key={index}>
              <SynthButton
                pitch={value}
                returnNote={this.returnNote}
                evelope={this.envelope}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      // <div className="playback-buttons">
      //   <Grid container spacing={24} justify="center">
      //     {/* <PlayButton /> */}
      //     <PlaybackButton />
      //   </Grid>
      // </div>
    )
  }
}

export default Pad;