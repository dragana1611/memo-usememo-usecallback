import React, { useState, useCallback, useMemo } from "react";

import { useFetch } from "./2-useFetch";

const url = "https://course-api.com/javascript-store-products";

// every time props or state changes, component re-renders
const calculateMostExpensive = (data) => {
  return (
    data.reduce((total, item) => {
      const price = item.fields.price;
      if (price >= total) {
        total = price;
      }
      return total;
    }, 0) / 100
  );
};
const Index = () => {
  const { products } = useFetch(url);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);

  const addToCart = useCallback(() => {
    setCart(cart + 1);
  }, [cart]);

  const mostExpensive = useMemo(
    () => calculateMostExpensive(products),
    [products]
  );
  return (
    <>
      <header>
        <h1>React.memo - useMemo - useCallback</h1>
      </header>
      <hr />
      <div className="count-container">
        <h2>Count : {count}</h2>
        <button className="btn" onClick={() => setCount(count + 1)}>
          click me
        </button>
      </div>
      <div className="most-exp-container">
        <h2>Most Expensive : ${mostExpensive}</h2>
      </div>
      <div className="cart-count-container">
        <h2 style={{ marginTop: "3rem" }}>cart : {cart}</h2>
      </div>
      <BigList products={products} addToCart={addToCart} />
    </>
  );
};

const BigList = React.memo(({ products, addToCart }) => {
  // useEffect(() => {
  //   console.count('hello from big list');
  // });

  return (
    <section className="products">
      {products.map((product) => {
        return (
          <SingleProduct
            key={product.id}
            {...product}
            addToCart={addToCart}
          ></SingleProduct>
        );
      })}
    </section>
  );
});

const SingleProduct = ({ fields, addToCart }) => {
  let { name, price } = fields;
  price = price / 100;
  const image = fields.image[0].url;

  // useEffect(() => {
  //   console.count('hello from product');
  // });
  return (
    <article className="product">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>add to cart</button>
    </article>
  );
};
export default Index;
