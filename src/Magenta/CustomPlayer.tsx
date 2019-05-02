import * as mm from '@magenta/music';
// import * as Tone from 'tone';
const Tone = require('tone');

export class CustomPlayer extends mm.BasePlayer {
  // private synth = new Tone.Synth().toMaster();
  // private synths = new Map<number, any>();  // tslint:disable-line:no-any
  private synth: any
  /**
   * The Tone module being used.
   */
  private constructor() {
    super(false);
    this.synth = new Tone.Synth().toMaster();
  }
  static readonly tone = Tone;  // tslint:disable-line:no-any

  protected playNote(time: number, note: any) {
    // If there's a velocity, use it.
    const velocity = undefined;
    // console.log(note.pitch);
    const freq = new Tone.Frequency(note.pitch, 'midi');
    // const freq = Tone.Frequency(note.pitch).toMidi()
    const dur = note.endTime - note.startTime;
    // this.getSynth(note.instrument, note.program)
    //   .triggerAttackRelease(freq, dur, time, velocity);
    // console.log(time);
    // console.log(freq);
    // this.synth.triggerAttackRelease('A3', 2.0, time)
    console.log(this.synth);
    this.synth.triggerAttackRelease(freq, dur, time);
  }

  private getSynth(instrument: number, program?: number) {
    // if (this.synths.has(instrument)) {
    //   console.log(0)
    //   return this.synths.get(instrument);
    // } else if (program !== undefined && program >= 32 && program <= 39) {
    //   // const bass = new Tone.Synth({oscillator: {type: 'triangle'}}).toMaster();
    //   const bass = new Tone.FMSynth().toMaster();
    //   // bass.volume.value = 5;
    //   console.log(1)
    //   this.synths.set(instrument, bass);
    // } else {
    //   console.log(2)
    //   // this.synths.set(instrument, new Tone.PolySynth(10).toMaster());
    //   this.synths.set(instrument, new Tone.FMSynth().toMaster());

    // }

    // if (this.synths.has(instrument)) {
    //   return this.synths.get(instrument);
    // } else {
    //   this.synths.set(instrument, new Tone.Synth().toMaster());
    // }
    return this.synth;
    // return this.synths.get(instrument);
  }
}

export default CustomPlayer;