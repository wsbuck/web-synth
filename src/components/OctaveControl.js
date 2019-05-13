import React from 'react';

import Radio from '@material-ui/core/Radio';

function OctaveControl(props) {
  const octaves = ['1', '2', '3', '4', '5', '6', '7', '8'];

  function handleChange(event) {
    props.returnOctave(event.target.value);
  }

  return (
    <div>
      {octaves.map((value, index) => (
        <Radio
          key={index}
          className={props.octave === value ? "octave-radio-button-checked" : "octave-radio-button"}
          checked={props.octave === value}
          onChange={handleChange}
          value={value}
          name='radio-button-octave'
          aria-label={value}
        />
      ))}
    </div>
  );
}

export default OctaveControl;