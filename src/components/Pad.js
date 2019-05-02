import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
// import Slider from '@material-ui/lab/Slider';

import * as Tone from 'tone';
import * as mm from '@magenta/music';

import SynthButton from './SynthButton';
import PlaybackButton from './PlaybackButton';
import RecordButton from './RecordButton';

import { AddToQueue } from '@material-ui/icons';

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
    // this.player = new mm.Player();
    // this.player = new CustomPlayer();

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
    this.oscillator = {
      type: 'triangle',
    }
    this.synth = new Tone.Synth({
      oscillator: this.oscillator,
      envelope: this.envelope
    }).toMaster();
  }

  async isRecording(bool) {
    this.setState({ recording: bool });
    Tone.Transport.toggle()
    if (!bool) {
      // if recording has stopped then quantize notes
      await this.quantizeNotes();
      this.setupPlayer();
    }
  }

  triggerSynth(note, duration) {
    this.synth.triggerAttackRelease(note, duration);
  }

  setupPlayer() {
    // const config = {
    //   noteHeight: 6,
    //   pixelsPerTimeStep: 30,  // like a note width
    //   noteSpacing: 1,
    //   noteRGB: '245, 245, 245',
    //   activeNoteRGB: '240, 84, 119',
    // }
    // this.viz = new mm.Visualizer(
    //   this.state.unqSequence,
    //   document.getElementById('canvas'),
    //   config);

    // this.player = new mm.Player(false, {
    //   run: (note) => this.viz.redraw(note),
    //   stop: () => {this.setState({ playing: false });}
    // });
    const { sequence } = this.state;
    let endTime = 0.0;


    sequence.forEach((note) => {
      if (note.endTime > endTime) {
        endTime = note.endTime;
      }
      Tone.Transport.schedule(() => {
        this.triggerSynth(note.note, note.duration)
      }, note.startTime)
    });

    Tone.Transport.loopEnd = endTime + 1.0;
    Tone.Transport.loop = true;
  }

  isPlaying() {
    if (this.state.unqSequence) {
      this.setState({ playing: !this.state.playing });
      this.play();
    }
  }

  play() {
    // if (this.player.isPlaying()) {
    //   this.player.stop();
    //   this.setState({ playing: false });
    // } else {
    //   this.player.start(this.state.unqSequence);
    // }
    Tone.Transport.toggle();
  }

  returnNote(note) {
    let sequence = this.state.sequence;
    // console.log(note);
    sequence.push({
      note: note.pitch,
      pitch: note.midi,
      startTime: (Tone.Transport.seconds.toFixed(2) - note.length).toFixed(2),
      endTime: Tone.Transport.seconds.toFixed(2),
      duration: note.length
    })
    this.setState({ sequence: sequence });
  }

  async quantizeNotes() {
    let { sequence } = this.state;
    const unquantizedSequence = {
      notes: sequence,
      totalTime: sequence[sequence.length - 1].endTime
    }
    const qns = mm.sequences.quantizeNoteSequence(unquantizedSequence, 4);
    this.setState({ qSequence: qns, unqSequence: unquantizedSequence });
  }

  musicRNN() {
    const music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
    music_rnn.initialize();
    music_rnn.continueSequence(this.state.qSequence, 20, 1.5)
      .then((sample) => this.player.start(sample));
    // const qns = mm.sequences.quantizeNoteSequence(ORIGINAL_TWINKLE_TWINKLE, 4);
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
            <Grid item sm={2}>
              <PlaybackButton isPlaying={this.isPlaying} playing={this.state.playing} />
            </Grid>
            <Grid item sm={2}>
              <RecordButton isRecording={this.isRecording} />
            </Grid>
            <Grid item sm={2}>
              <button className="synth-button" onClick={() => this.musicRNN()}>
                <AddToQueue />
              </button>
            </Grid>
          </Grid>
        </div>
        <div className="canvas-container">
          <canvas id="canvas" />
        </div>

      </div>
    )
  }
}

export default Pad;