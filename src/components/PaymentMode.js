import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartContext";

const PaymentModeContainer = styled.div`
  display: flex;
  margin-top: 10rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5rem;
  font-weight: bold;
  font-size 3rem;
  color: #333;
`;

const PaymentOption = styled.label`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: ${(props) => (props.selected ? "2.5em" : "2rem")};
  ${(props) =>
    props.selected &&
    `
    background-color: #3498db;
    color: #fff;
  `}
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const updateCart = (cart) => {
  const updatedCartItem = cart?.map((e) => (e = { ...e, isOrdered: true }));
  localStorage.setItem("clickItCart", JSON.stringify(updatedCartItem));
};

const PaymentMode = () => {
  const { cart } = useCartContext();
  const [selectedOption, setSelectedOption] = useState("online");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <PaymentModeContainer>
      <Label>Choose Payment Mode</Label>
      <PaymentOption selected={selectedOption === "online"}>
        <RadioInput
          type="radio"
          name="paymentOption"
          value="online"
          checked={selectedOption === "online"}
          onChange={handleOptionChange}
        />
        Online Payment
      </PaymentOption>

      <PaymentOption
        selected={selectedOption === "cash"}
        style={{ marginTop: "5rem", marginBottom: "5rem" }}
      >
        <RadioInput
          type="radio"
          name="paymentOption"
          value="cash"
          checked={selectedOption === "cash"}
          onChange={handleOptionChange}
        />
        Cash on Delivery
      </PaymentOption>
      {selectedOption === "online" && (
        <Button>
          <NavLink to="/make-payment">Continue</NavLink>
        </Button>
      )}
      {selectedOption === "cash" && (
        <Button onClick={updateCart(cart)}>
          <NavLink to="/cod-delivery-message">Continue</NavLink>
        </Button>
      )}
    </PaymentModeContainer>
  );
};

export default PaymentMode;
