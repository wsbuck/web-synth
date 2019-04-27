import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import * as Tone from 'tone';

import SynthButton from './SynthButton';
import PlayButton from './PlayButton';
import PlaybackButton from './PlaybackButton';

class Pad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: []
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
    let sm = 2;
    return (
      <div className="pad">
        <div className="play-button">
          <Grid container spacing={24} justify="center">
            <Grid item sm={sm}>
              <SynthButton
                pitch={'A5'}
                returnNote={this.returnNote}
                envelope={this.envelope}
              />
            </Grid>
            <Grid item sm={sm}>
              <SynthButton
                pitch={'B5'}
                returnNote={this.returnNote}
                envelope={this.envelope}
              />
            </Grid>
            <Grid item sm={sm}>
              <SynthButton
                pitch={'C5'}
                returnNote={this.returnNote}
                envelope={this.envelope}
              />
            </Grid>
            <Grid item sm={sm}>
              <SynthButton
                pitch={'D5'}
                returnNote={this.returnNote}
                envelope={this.envelope}
              />
            </Grid>
            <Grid item sm={sm}>
              <SynthButton
                pitch={'E5'}
                returnNote={this.returnNote}
                envelope={this.envelope}
              />
            </Grid>
            <Grid item sm={sm}>
              <SynthButton
                pitch={'F5'}
                returnNote={this.returnNote}
                envelope={this.envelope}
              />
            </Grid>
            <Grid item sm={sm}>
              <SynthButton
                pitch={'G5'}
                returnNote={this.returnNote}
                envelope={this.envelope}
              />
            </Grid>
            <Grid item sm={sm}>
              <SynthButton
                pitch={'A6'}
                returnNote={this.returnNote}
                envelope={this.envelope}
              />
            </Grid>
          </Grid>
        </div>

        <div className="playback-buttons">
          <Grid container spacing={24} justify="center">
            {/* <PlayButton /> */}
            <PlaybackButton />
          </Grid>
        </div>
      </div>
    )
  }
}

export default Pad;