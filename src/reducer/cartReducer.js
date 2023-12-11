const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, size, amount, product, isOrdered } = action.payload;

    let existingProduct = state.cart.find(
      (curItem) => curItem.id === id + color + size + isOrdered
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === id + color + size + isOrdered) {
          let newAmount = curElem.amount + amount;
          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct = {
        id: id + color + size + isOrdered,
        name: product.name,
        color,
        size,
        amount,
        isOrdered,
        image: product.image[0],
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let decAmount = curElem.amount - 1;

        if (decAmount <= 1) {
          decAmount = 1;
        }

        return {
          ...curElem,
          amount: decAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let incAmount = curElem.amount + 1;

        if (incAmount >= curElem.max) {
          incAmount = curElem.max;
        }

        return {
          ...curElem,
          amount: incAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "CART_TOTAL_ITEM") {
    let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
      let { amount } = curElem;

      initialVal = initialVal + amount;
      return initialVal;
    }, 0);

    return {
      ...state,
      total_item: updatedItemVal,
    };
  }

  if (action.type === "CART_TOTAL_PRICE") {
    let total_price = state.cart.reduce((initialVal, curElem) => {
      let { price, amount } = curElem;
      initialVal = initialVal + price * amount;
      return initialVal;
    }, 0);

    return {
      ...state,
      total_price,
    };
  }

  return state;
};

export default cartReducer;
