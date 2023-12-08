import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
// import axios from "axios";
import styled from "styled-components";
import { Button } from "../styles/Button";
import OnlineInvoiceMessage from "./OnlineInvoiceMessage";

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
  font-size 2rem;
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

  if (!stripe || !elements) {
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        // const { id } = paymentMethod;
        // const response = await axios.post("http://localhost:3000/payment", {
        //   amount: 1,
        //   id,
        // });

        // if (response.data.success) {
        console.log("payment successful");
        setSuccess(true);
        // }
      } catch (error) {
        console.log("error", error.message);
      }
    } else {
      console.log("error", error.message);
    }
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
                style={{ marginTop: "5rem" }}
              >
                PAY NOW
              </Button>
            </CardContainer>
          </form>
        </PaymentFrom>
      ) : (
        <OnlineInvoiceMessage></OnlineInvoiceMessage>
      )}
    </>
  );
};

export default PaymentForm;
