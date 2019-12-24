import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles.css';
import ColourSelector from './ColourSelector';

function ColourPreview({ productId }) {
  const [productData, setProductData] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({});

  useEffect(() => {
    fetch(`/api/productPreview/${productId}`)
      .then(result => result.json())
      .then(data => {
        setProductData(data);
        setSelectedIndex(0);
      });
  }, []);

  const { frontUrl, backUrl, logoUrl } = (productData.colours || [])[selectedIndex] || {};

  return frontUrl && backUrl && logoUrl ? (
    <div className="ColourPreview">
      <div className="backPreview" style={{ backgroundImage: `url(${backUrl})` }} />
      <div className="frontPreview" style={{ backgroundImage: `url(${frontUrl})` }} />
      <div className="logoPreview" style={{ backgroundImage: `url(${logoUrl})` }} />
      <ColourSelector
        colours={productData.colours}
        selectedIndex={selectedIndex}
        selectIndex={setSelectedIndex}
        productName={productData.productName}
      />
    </div>
  ) : 'loading';
}

ColourPreview.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ColourPreview;
