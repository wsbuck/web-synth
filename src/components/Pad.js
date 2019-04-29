import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
// import Slider from '@material-ui/lab/Slider';

import * as Tone from 'tone';
import * as mm from '@magenta/music';

import SynthButton from './SynthButton';
// import PlayButton from './PlayButton';
import PlaybackButton from './PlaybackButton';
import RecordButton from './RecordButton';

class Pad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [],
      qSequence: null,
      unqSequence: null,
      octave: 3,
      recording: false,
      playing: false,
    };
    this.player = new mm.Player();

    this.returnNote = this.returnNote.bind(this);
    this.isRecording = this.isRecording.bind(this);
    this.isPlaying = this.isPlaying.bind(this);
    this.quantizeNotes = this.quantizeNotes.bind(this);
    this.play = this.play.bind(this);
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
    };
    this.synth = new Tone.Synth({
      envelope: this.envelope
    }).toMaster();

  }

  isRecording(bool) {
    this.setState({ recording: bool });
    Tone.Transport.toggle()
    if (!bool) {
      this.quantizeNotes();
    }
  }

  isPlaying() {
    if (this.state.unqSequence) {
      this.setState({ playing: !this.state.playing });
      this.play();
    }
  }

  play() {
    if (this.player.isPlaying()) {
      this.player.stop();
      this.setState({ playing: false });
    } else {
      this.player.start(this.state.unqSequence)
        .then(() => this.setState({ playing: false }));
    }
  }

  returnNote(note) {
    // console.log(time.beg);
    // console.log(time.end);
    let sequence = this.state.sequence;
    console.log(note);
    sequence.push({
      pitch: note.midi,
      startTime: (Tone.Transport.seconds.toFixed(2) - note.length).toFixed(2),
      endTime: Tone.Transport.seconds.toFixed(2)
    })
    this.setState({ sequence: sequence });
  }

  quantizeNotes() {
    let { sequence } = this.state;
    const unquantizedSequence = {
      notes: sequence,
      totalTime: sequence[sequence.length - 1].endTime
    }
    const qns = mm.sequences.quantizeNoteSequence(unquantizedSequence, 4);
    this.setState({ qSequence: qns, unqSequence: unquantizedSequence });
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
      <div>
        <div className="pad">
          <Grid container spacing={24} justify="center">
            {notes.map((value, index) => (
              <Grid item sm={sm} key={index}>
                <SynthButton
                  note={value}
                  returnNote={this.returnNote}
                  evelope={this.envelope}
                  recording={this.state.recording}
                />
              </Grid>
            ))}
          </Grid>
        </div>

        <div className="playback-buttons">
          <Grid container spacing={24} justify="center">
            {/* <PlayButton /> */}
            <Grid item sm={sm}>
              <PlaybackButton isPlaying={this.isPlaying} playing={this.state.playing} />
            </Grid>
            <Grid item sm={sm}>
              <RecordButton isRecording={this.isRecording} />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default Pad;