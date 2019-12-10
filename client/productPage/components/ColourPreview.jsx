import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles.css';
import ColourSelector from './ColourSelector';

function ColourPreview({ productId }) {
  const [, setProductData] = useState({});
  const [selectedColour, setSelectedColour] = useState({});

  useEffect(() => {
    fetch(`/api/productPreview/${productId}`)
      .then(result => result.json())
      .then(data => {
        setProductData(data);
        setSelectedColour(data.colours[0]);
      });
  }, []);

  const { frontUrl, backUrl, logoUrl } = selectedColour;

  return frontUrl && backUrl && logoUrl ? (
    <div className="ColourPreview">
      <div className="backPreview" style={{ backgroundImage: `url(${backUrl})` }} />
      <div className="frontPreview" style={{ backgroundImage: `url(${frontUrl})` }} />
      <div className="logoPreview" style={{ backgroundImage: `url(${logoUrl})` }} />
      <ColourSelector selectedColour={selectedColour} />
    </div>
  ) : 'loading';
}

ColourPreview.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ColourPreview;
