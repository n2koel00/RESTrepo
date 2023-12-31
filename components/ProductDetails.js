import React from 'react';
/**REST tehtävän koodia */
import { useCurrency } from './CurrencyContext';
/**REST tehtävän koodia */

const ProductDetails = ({ product }) => {

/**REST tehtävän koodia */
/** useCurrency importattu CurrencyContext.js:tä */
  const { selectedCurrency } = useCurrency();

  const formatPrice = () => {
    if (selectedCurrency === 'usd') {
      return product.price_usd + '$' || 'No price';
    } else if (selectedCurrency === 'eur') {
      return product.price + '€' || 'No price';
    }
    return 'No price';
  };
/**REST tehtävän koodia */

  return (
    <div>
      <p>{product.description}</p>
      <p>{product.description1}</p>
      <p>{product.description2}</p>
      <p>{product.description3}</p>

{/**REST tehtävän koodia */}
{/** näyttää oikean hinnan valitulla valuutalla */}
      <p>Price: {formatPrice(product.price)}</p>
{/**REST tehtävän koodia */}

    </div>
  );
};

export default ProductDetails;