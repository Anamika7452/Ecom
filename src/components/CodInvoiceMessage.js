import React from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { NavLink } from "react-router-dom";
const DeliveryMessageContainer = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  display: flex;
  margin-top: 10rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DeliveryMessageText = styled.p`
  font-size: 2rem;
  color: #333;
`;

const CodInvoiceMessage = () => {
  const currentDate = new Date();
  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(currentDate.getDate() + 3);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <DeliveryMessageContainer>
      <DeliveryMessageText>
        Your order will be delivered by {formattedDeliveryDate}.
      </DeliveryMessageText>
      <Button style={{ marginTop: "2rem" }}>
        <NavLink to="/">Home</NavLink>
      </Button>
    </DeliveryMessageContainer>
  );
};

export default CodInvoiceMessage;
