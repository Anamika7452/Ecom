import styled from "styled-components";
import FilterSection from "./components/FilterSection";
import ProductList from "./components/ProductList";
import Sort from "./components/Sort";
import { useState } from "react";
import { AiOutlineDownCircle } from "react-icons/ai";

const Products = () => {
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  const toggleFilterPopup = () => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
  };

  const Wrapper = styled.section`
    .grid-filter--column {
      grid-template-columns: 0.2fr 1fr;
    }

    .filter-button {
      display: none;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .grid-filter--column {
        grid-template-columns: 1fr;
        .filter-button {
          display: block;
        }
      }
    .btn {
      margin: 2rem 0;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      padding: 0.8rem 2rem;
      color: rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .filter-icon {
      margin-left: 1rem;
    }
  `;

  return (
    <Wrapper>
      <div className="container grid grid-filter--column">
        <div className="filter-button">
          <button className="btn" onClick={toggleFilterPopup}>
            Filters
            <AiOutlineDownCircle className="filter-icon"></AiOutlineDownCircle>
          </button>
        </div>

        <div>
          <FilterSection showFilter={isFilterPopupOpen} />
        </div>

        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-product">
            <ProductList />
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default Products;
