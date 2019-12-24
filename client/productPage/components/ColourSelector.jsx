import React, { useState } from 'react';
import PropTypes from 'prop-types';

const toHex = n => `#${n.toString(16).padStart(6, 0)}`;

const ColourSelector = ({
  colours,
  selectedIndex,
  selectIndex,
  productName,
}) => {
  const { colourName, colour } = colours[selectedIndex];
  const backgroundColor = toHex(colour);

  const [selectMode, setSelectMode] = useState(false);


  return (selectMode
    ? (
      <div className="ColourSelector selector">
        <div className="swatchGrid">
          {colours.map(({ colour: c, colourName: name }, i) => (
            <div
              key={c}
              className="swatch clickable"
              style={{ backgroundColor: toHex(c) }}
              title={`${name[0].toUpperCase()}${name.slice(1)} ${productName}`}
              onClick={() => selectIndex(i)}
            >
              {selectedIndex === i ? <div className={`swatchSelection ${colourName}`} /> : ''}
            </div>
          ))}
        </div>
        <div className="done clickable" onClick={() => setSelectMode(false)}>Done</div>
      </div>
    )
    : (
      <div className="ColourSelector view clickable" onClick={() => setSelectMode(true)}>
        <div className="swatch" style={{ backgroundColor }} />
        <div className="colourName">{`${colourName[0].toUpperCase()}${colourName.slice(1)}`}</div>
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
  productName: PropTypes.string.isRequired,
};

export default ColourSelector;
