import React, { useState } from 'react';
import PropTypes from 'prop-types';

const toHex = n => `#${n.toString(16).padStart(6, 0)}`;

const ColourSelector = ({ colours, selectedIndex, selectIndex }) => {
  const { colourName, colour } = colours[selectedIndex];
  const backgroundColor = toHex(colour);

  const [selectMode, setSelectMode] = useState(false);


  return (selectMode
    ? (
      <div className="ColourSelector selector">
        <div className="swatchGrid">
          {colours.map(({ colour: c }, i) => (
            <div
              key={c}
              className="swatch"
              style={{ backgroundColor: toHex(c) }}
              onClick={() => selectIndex(i)}
            />
          ))}
        </div>
        <div className="done" onClick={() => setSelectMode(false)}>Done</div>
      </div>
    )
    : (
      <div className="ColourSelector view" onClick={() => setSelectMode(true)}>
        <div className="swatch" style={{ backgroundColor }} />
        <div className="colourName">{colourName}</div>
      </div>
    )
  );
};

ColourSelector.propTypes = {
  colours: PropTypes.arrayOf(
    PropTypes.shape({
      colourName: PropTypes.string.isRequired,
      colour: PropTypes.number.isRequired,
    }),
  ).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  selectIndex: PropTypes.func.isRequired,
};

export default ColourSelector;
