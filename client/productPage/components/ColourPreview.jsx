import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ColourPreview({ productId }) {
  const [productData, setProductData] = useState({});

  useEffect(() => {
    fetch(`/api/productPreview/${productId}`)
      .then(result => result.json())
      .then(data => setProductData(data));
  }, []);

  return (
    <div className="ColourPreview">
      <ul>
        <li>{productData.productName}</li>
        <li>{productData.productId}</li>
        <ul>{(productData.colours || []).map(colour => <li>{colour.colourName}</li>)}</ul>
      </ul>
    </div>
  );
}

ColourPreview.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ColourPreview;
