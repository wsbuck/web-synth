import React, { useState, useEffect } from 'react';

import * as mm from '@magenta/music';

function MLButton(props) {
  const [pressed, setPressed] = useState(false);
  const music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
  
  useEffect(() => {
    // music_rnn.initialize();
  })

  function clip_sequence(sequence) {
    sequence.notes.forEach((note) => {
      if (note.pitch > 84) {
        note.pitch = 84;
      }
      else if (note.pitch < 48) {
        note.pitch = 48;
      }
    })

    return sequence;
  }

  function predict() {
    setPressed(true);
    console.log('predicting...');
    console.log(props.qSequence);
    props.clearTransportSchedule();
    const sequence = clip_sequence(props.qSequence);
    music_rnn.continueSequence(sequence, 40, 1.5)
    .then((sample) => {
      props.update_sequence(mm.sequences.unquantizeSequence(sample).notes)
    })
    .then(() => {
      setPressed(false)
    });
  }

  return (
    <div>
      <button
        onMouseDown={() => predict()}
        onTouchEnd={() => predict()}
        className={pressed ? "synth-button mlbutton pressed" : "synth-button mlbutton"}
      >
      <i className="fas fa-brain"></i>
      </button>
    </div>

  )
}

export default MLButton;