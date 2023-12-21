import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import OnlineInvoiceMessage from "./OnlineInvoiceMessage";
import { useCartContext } from "../context/cartContext";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#008000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
  hidePostalCode: true,
};

const CardContainer = styled.div`
  width: 50vh;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5rem;
  font-weight: bold;
  font-size: 2rem;
  color: #333;
`;

const PaymentFrom = styled.label`
  display: flex;
  margin-top: 10rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const { cart } = useCartContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe or Elements not available");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("Card Element not found");
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      console.log("Payment successful");
      setSuccess(true);
    } else {
      console.error("Error:", error.message);
      try {
        const response = await fetch(
          "https://merchant-ui-api.stripe.com/elements/wallet-config",
          { mode: "no-cors" }
        );
        console.log("Error details:", response);
      } catch (fetchError) {
        console.log("Error fetching details:", fetchError);
      }
    }
  };

  const updateCart = (cart) => {
    const updatedCartItem = cart?.map((e) => (e = { ...e, isOrdered: true }));
    localStorage.setItem("clickItCart", JSON.stringify(updatedCartItem));
  };
  return (
    <>
      {!success ? (
        <PaymentFrom>
          <form onSubmit={handleSubmit} className="payment-form">
            <CardContainer>
              <Label>Card details</Label>
              <CardElement options={CARD_OPTIONS} />
              <Button
                type="submit"
                disabled={!stripe}
                onClick={updateCart(cart)}
                style={{ marginTop: "5rem" }}
              >
                PAY NOW
              </Button>
            </CardContainer>
          </form>
        </PaymentFrom>
      ) : (
        <OnlineInvoiceMessage />
      )}
    </>
  );
};

export default PaymentForm;
