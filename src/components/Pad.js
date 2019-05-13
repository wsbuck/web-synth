import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
// import Slider from '@material-ui/lab/Slider';

import * as Tone from 'tone';
import * as mm from '@magenta/music';

import SynthButton from './SynthButton';
import PlaybackButton from './PlaybackButton';
import RecordButton from './RecordButton';
import OctaveControl from './OctaveControl';
import MLButton from './MLButton';

// import { AddToQueue } from '@material-ui/icons';


class Pad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [],
      qSequence: null,
      unqSequence: null,
      octave: '3',
      recording: false,
      playing: false,
    };
    // this.music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');

    this.returnNote = this.returnNote.bind(this);
    this.returnOctave = this.returnOctave.bind(this);
    this.isRecording = this.isRecording.bind(this);
    this.isPlaying = this.isPlaying.bind(this);
    this.quantizeNotes = this.quantizeNotes.bind(this);
    this.play = this.play.bind(this);
    this.update_sequence = this.update_sequence.bind(this);
    this.clearTransportSchedule = this.clearTransportSchedule.bind(this);
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
      type: 'sawtooth',
    }
    this.synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
    this.synth.set({
      oscillator: this.oscillator,
      envelope: this.envelope
    });
    // this.music_rnn.initialize();
  }

  async isRecording(bool) {
    this.setState({ recording: bool });
    if (!bool) {
      // if recording has stopped then quantize notes
      await this.quantizeNotes();
      this.setupPlayer();
    } else {
      await this.clearTransportSchedule();
    }
    Tone.Transport.toggle();
  }

  async clearTransportSchedule() {
    this.setState({ sequence: [] });
    Tone.Transport.cancel();
  }

  triggerSynth(note, duration) {
    this.synth.triggerAttackRelease(note, duration);
  }

  async setupPlayer() {
    const { sequence } = this.state;
    // await Tone.Transport.clear();
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
    Tone.Transport.toggle();
  }

  async update_sequence(mm_sequence) {
    let sequence = mm_sequence;
    sequence
      .forEach((note) => {
        note.duration = note.endTime - note.startTime
        note.note = Tone.Frequency(note.pitch, "midi").toNote()
      })
    console.log(sequence);

    await this.setState({ sequence: sequence })
    this.setupPlayer();

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

  returnOctave(octave) {
    this.setState({ octave: octave });
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

  // musicRNN() {
  //   this.music_rnn.continueSequence(this.state.qSequence, 20, 1.5)
  //     .then((sample) => {
  //       this.update_sequence(mm.sequences.unquantizeSequence(sample).notes)
  //     });
  // }

  render() {
    const sm = 2;
    const octave = this.state.octave;
    let notes = [
      'C', 'C#', 'D', 'D#', 'E', 'F',
      'F#', 'G', 'G#', 'A', 'A#', 'B'
    ];
    const keymaps = [
      'a', 'w', 's', 'e', 'd', 'f', 't',
      'j', 'i', 'k', 'o', 'l'
    ];
    notes = notes.map(note => note + octave);

    const notesAndKeys = notes.map((value, index) => {
      return { note: value, keymap: keymaps[index] };
    })

    return (
      <div>
        <div className="pad">
          <Grid container spacing={24} justify="center">
            {notesAndKeys.map((value, index) => (
              <Grid item sm={sm} key={index}>
                <SynthButton
                  note={value.note}
                  keymap={value.keymap}
                  returnNote={this.returnNote}
                  evelope={this.envelope}
                  oscillator={this.oscillator}
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
              <MLButton
                qSequence={this.state.qSequence}
                update_sequence={this.update_sequence}
                clearTransportSchedule={this.clearTransportSchedule}
              />
            </Grid>
          </Grid>
        </div>
        <div className="canvas-container">
          <canvas id="canvas" />
        </div>
        <div className="octave-container">
          <OctaveControl
            returnOctave={this.returnOctave}
            octave={this.state.octave} />
        </div>

      </div>
    )
  }
}

export default Pad;