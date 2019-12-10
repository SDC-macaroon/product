import React from 'react';
import PropTypes from 'prop-types';

const ColourSelector = ({ selectedColour }) => {
  const { colourName, colour } = selectedColour;
  const backgroundColor = `#${colour.toString(16).padStart(6, 0)}`;
  return (
    <div className="ColourSelector">
      <div className="swatch" style={{ backgroundColor }} />
      <div className="colourName">{colourName}</div>
    </div>
  );
};

ColourSelector.propTypes = {
  selectedColour: PropTypes.shape({
    colourName: PropTypes.string.isRequired,
    colour: PropTypes.number.isRequired,
  }).isRequired,
};

export default ColourSelector;
