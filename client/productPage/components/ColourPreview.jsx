import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

function ColourPreview({ productId }) {
  const [productData, setProductData] = useState({});
  const [selectedColour, setSelectedColour] = useState({});

  useEffect(() => {
    fetch(`/api/productPreview/${productId}`)
      .then(result => result.json())
      .then(data => {
        setProductData(data);
        setSelectedColour(data.colours[0]);
      });
  }, []);

  const { productName } = productData;
  const { frontUrl, backUrl, logoUrl } = selectedColour;

  return frontUrl && backUrl && logoUrl ? (
    <div className="ColourPreview">
      <img alt={`front of ${productName}`} className="frontPreview" src={frontUrl} />
      <img alt={`back of ${productName}`} className="backPreview" src={backUrl} />
      <img alt={`${productName} logo`} className="logoPreview" src={logoUrl} />
    </div>
  ) : 'loading';
}

ColourPreview.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ColourPreview;
