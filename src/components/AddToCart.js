import { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cartContext";
import { useAuth0 } from "@auth0/auth0-react";

const AddToCart = ({ product }) => {
  const { isAuthenticated } = useAuth0();
  const Wrapper = styled.section`
    .colors p {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .btnStyle {
      width: 2rem;
      height: 2rem;
      background-color: #000;
      border-radius: 50%;
      margin-left: 1rem;
      border: none;
      outline: none;
      opacity: 0.5;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }

    .active {
      opacity: 1;
    }

    .checkStyle {
      font-size: 1rem;
      color: #fff;
    }

    .disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .amount-toggle {
      margin-top: 3rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 1.4rem;

      button {
        border: none;
        background-color: #fff;
        cursor: pointer;
      }

      .amount-style {
        font-size: 2.4rem;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  `;

  const { addToCart } = useCartContext();

  const { id, colors, stock } = product;

  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  return (
    <Wrapper>
      <div className="colors">
        <p>
          Color:
          {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={() => setColor(curColor)}
              >
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div>

      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      <NavLink
        to="/cart"
        onClick={() => {
          addToCart(id, color, amount, product);
        }}
      >
        {!isAuthenticated ? (
          <Button
            title="You need to be Logged in to add item in cart"
            className="btn disabled"
            disabled
          >
            Add To Cart
          </Button>
        ) : (
          <Button className="btn">Add To Cart</Button>
        )}
      </NavLink>
    </Wrapper>
  );
};
export default AddToCart;
