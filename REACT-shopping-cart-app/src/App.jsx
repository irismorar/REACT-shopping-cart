import { useState } from "react";
import "./App.css";
import { products } from "./products.js";

function ProductList({ cartProducts, setCartProducts }) {
  return (
    <ul>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <b>{product.name}</b>
            <em>{product.price}$</em>
            <button
              onClick={() => {
                if (cartProducts.includes(product.id)) {
                  const newState = cartProducts.filter(
                    (id) => product.id !== id
                  );
                  setCartProducts(newState);
                } else {
                  const newState = [...cartProducts, product.id];
                  setCartProducts(newState);
                }
              }}
            >
              {cartProducts.includes(product.id)
                ? "Remove from cart"
                : "Add to cart"}
            </button>
            <hr />
          </li>
        );
      })}
    </ul>
  );
}

function CartList({ cartProducts, onRemoveFromCart }) {
  return (
    <ul>
      {cartProducts.map((id) => {
        return (
          <li key={id}>
            <b>{products.find((product) => product.id === id).name}</b>
            <em>{products.find((product) => product.id === id).price}$</em>
            <button onClick={() => onRemoveFromCart(id)}>
              Remove from cart
            </button>
            <hr />
          </li>
        );
      })}
    </ul>
  );
}

export default function App() {
  const [cartProducts, setCartProducts] = useState([]);
  const [page, setPage] = useState("productsPage"); // 'cartPage'

  function onRemoveFromCart(id) {
    setCartProducts(cartProducts.filter((productId) => productId !== id));
  }

  return (
    <div className="main_container">
      {page === "productsPage" && (
        <>
          <h1>Welcome to Shoop!</h1>
          <button
            className="add_remove_button"
            onClick={() => setPage("cartPage")}
          >
            Go to shopping cart
          </button>
          <ProductList
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        </>
      )}
      {page === "cartPage" && (
        <>
          <button
            className="add_remove_button"
            onClick={() => setPage("productsPage")}
          >
            Go to shopping list
          </button>
          <CartList
            cartProducts={cartProducts}
            onRemoveFromCart={onRemoveFromCart}
          />
        </>
      )}
    </div>
  );
}
