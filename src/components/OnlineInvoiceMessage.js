import React from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { useCartContext } from "../context/cartContext";
import FormatPrice from "../Helpers/FormatPrice";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";

const DeliveryMessageText = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 1rem;
`;

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five--column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
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

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five--column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

const StyledDownloadButton = styled(FaFileDownload)`
  font-size: 4rem;
  color: #0000ff;
  margin-left: 5rem;
  margin-top: 2rem;
  cursor: pointer;
`;

const OnlineInvoiceMessage = () => {
  const navigate = useNavigate();
  const pdfRef = useRef();
  const { clearCart } = useCartContext();

  const { cart, total_price, shipping_fee } = useCartContext();

  const cgstRate = 18;
  const sgstRate = 9;

  const cgst = (total_price * (cgstRate / 100)).toFixed(2);
  const sgst = (total_price * (sgstRate / 100)).toFixed(2);

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
    clearCart();
    navigate("/");
  };
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
    <>
      <StyledDownloadButton title="Download you Invoice" onClick={downloadPDF}>
        Download Invoice
      </StyledDownloadButton>
      <Wrapper ref={pdfRef}>
        <NavLink to="/">
          <img
            style={{ height: "8rem", width: "20rem", marginLeft: "30rem" }}
            src="./images/logo.png"
            alt="CLICK IT LOGO"
          ></img>
        </NavLink>
        <div className="container">
          <div className="cart_heading grid grid-five--column">
            <p>Item</p>
            <p className="cart-hide">Price</p>
            <p>Quantity</p>
            <p className="cart-hide">Subtotal</p>
          </div>
          <hr />
          <div className="cart-item">
            {cart.map((curElem) => {
              return (
                <div className="cart_heading grid grid-five--column">
                  <div className="cart-image--name">
                    <div>
                      <figure>
                        <img src={curElem.image} alt={curElem.id} />
                      </figure>
                    </div>
                    <div>
                      <p>{curElem.name}</p>
                      <div className="color-div">
                        <p>color:</p>
                        <div
                          className="color-style"
                          style={{
                            backgroundColor: curElem.color,
                            color: curElem.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="cart-hide">
                    <p>
                      <FormatPrice price={curElem.price} />
                    </p>
                  </div>

                  <div>{curElem.amount}</div>

                  <div className="cart-hide">
                    <p>
                      <FormatPrice price={curElem.price * curElem.amount} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <hr />
          <DeliveryMessageText>
            Your order will be delivered by {formattedDeliveryDate}.
          </DeliveryMessageText>
          <div className="order-total--amount">
            <div className="order-total--subdata">
              <div>
                <p>subtotal:</p>
                <p>
                  <FormatPrice price={total_price} />
                </p>
              </div>
              <div>
                <p>shipping fee:</p>
                <p>
                  <FormatPrice price={shipping_fee} />
                </p>
              </div>
              <div>
                <p>CGST ({cgstRate}%):</p>
                <p>
                  <FormatPrice price={cgst} />
                </p>
              </div>
              <div>
                <p>SGST ({sgstRate}%):</p>
                <p>
                  <FormatPrice price={sgst} />
                </p>
              </div>

              <hr />
              <div>
                <p>order total:</p>
                <p>
                  <FormatPrice
                    price={shipping_fee + total_price + +cgst + +sgst}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default OnlineInvoiceMessage;
