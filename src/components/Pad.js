import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import DrumButton from './DrumButton';
import PlayButton from './PlayButton';

class Pad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: []
    };
    // this.returnNote = this.returnNote.bind(this);
  }

  returnNote(note) {
    // console.log(time.beg);
    // console.log(time.end);
    let sequence = this.state.sequence;
    sequence.push({ 
      pitch: note.pitch,
      startTime: note.startTime,
      endTime: note.endTime
    })
    this.setState({ sequence: sequence });
  }

  render() {
    return (
      <div className="pad">
        <div className="play-button">
          <Grid container spacing={24} justify="center">
            <Grid item sm={3}>
              <DrumButton pitch={'A3'} returnNote={() => this.returnNote} />
            </Grid>
            <Grid item sm={3}>
              <DrumButton pitch={'B3'} returnNote={() => this.returnNote} />
            </Grid>
            <Grid item sm={3}>
              <DrumButton pitch={'C3'} returnNote={() => this.returnNote} />
            </Grid>
            <Grid item sm={3}>
              <DrumButton pitch={'D3'} returnNote={() => this.returnNote} />
            </Grid>
            <Grid item sm={3}>
              <DrumButton pitch={'E3'} returnNote={() => this.returnNote} />
            </Grid>
            <Grid item sm={3}>
              <DrumButton pitch={'F3'} returnNote={() => this.returnNote} />
            </Grid>
            <Grid item sm={3}>
              <DrumButton pitch={'G3'} returnNote={() => this.returnNote} />
            </Grid>
            <Grid item sm={3}>
              <DrumButton pitch={'A2'} returnNote={() => this.returnNote} />
            </Grid>
          </Grid>
        </div>

        <div className="playback-buttons">
          <Grid container spacing={24} justify="center">
            <PlayButton />
          </Grid>
        </div>
      </div>
    )
  }
}

export default Pad;