import React from "react";
import { Card, Button } from "react-bootstrap";
import { AddCart } from "./AddCart";
  /**REST tehtävän koodia */
import { useCurrency } from "./CurrencyContext";
  /**REST tehtävän koodia */


const ProductCard = ({ product, openModal }) => {
  
/**REST tehtävän koodia */
/** useCurrency importattu CurrencyContext.js:tä */
  const { selectedCurrency } = useCurrency();

  const formatPrice = () => {
    if (selectedCurrency === "usd") {
      return product.price_usd + "$" || "No price";
    } else if (selectedCurrency === "eur") {
      return product.price + "€" || "No price";
    }
    return "No price";
  };
/**REST tehtävän koodia */

  return (
    <Card
      key={product.id}
      className="col-3"
      style={{
        width: "250px",
        backgroundColor: "grey",
        marginTop: "30px",
        margin: "10px",
      }}
    >
      <Card.Img
        variant="top"
        src={
          product.imageUrl ||
          "https://ic.jimms.fi/product/4/0/251749-ig800gg.jpg"
        }
        style={{ height: "15rem", marginTop: "5px", padding: "15px" }}
      />
      <Card.Body>
        <Card.Title style={{ height: "105px" }}>
          {product.productName}
        </Card.Title>
        <Card.Text></Card.Text>
        <Card.Text style={{ fontSize: "25px" }}>

{/**REST tehtävän koodia */}
{/** näyttää oikean hinnan oikealla valuutalla */}
          {formatPrice(product.price)}
{/**REST tehtävän koodia */}

        </Card.Text>
        <AddCart product={product} key={product.id} />
        <Button
          className="btn btn-primary btn-md"
          style={{ width: "100%" }}
          variant="primary"
          onClick={() => openModal(product)}
        >
          Lisätietoa
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
