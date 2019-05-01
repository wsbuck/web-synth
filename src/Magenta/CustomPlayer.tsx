import * as mm from '@magenta/music';
// import * as Tone from 'tone';
const Tone = require('tone');

export class CustomPlayer extends mm.BasePlayer {
  private synth = new Tone.FMSynth().toMaster();
  private synths = new Map<number, any>();  // tslint:disable-line:no-any
  /**
   * The Tone module being used.
   */
  static readonly tone = Tone;  // tslint:disable-line:no-any

  protected playNote(time: number, note: any) {
    // If there's a velocity, use it.
    // const velocity = undefined;
    const freq = new Tone.Frequency(note.pitch, 'midi');
    const dur = note.endTime - note.startTime;
    // this.getSynth(note.instrument, note.program)
    //   .triggerAttackRelease(freq, dur, time, velocity);
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
    return this.synth;
    // return this.synths.get(instrument);
  }
}


export default CustomPlayer;