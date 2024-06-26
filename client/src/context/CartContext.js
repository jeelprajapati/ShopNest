import { createContext, useEffect, useReducer } from "react";

const initialState = JSON.parse(localStorage.getItem("cart")) || {
  products: [],
  total: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newState = {
        ...state,
        products: [...state.products],
      };

      const existingItem = newState.products.find(
        (item) => action.payload._id === item._id
      );
      if (existingItem) {
        newState.products = newState.products.map((item) => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
              total: item.total + action.payload.total,
            };
          }
          return item;
        });
      } else {
        newState.products.push(action.payload);
      }

      //count total
      newState.total += action.payload.total;

      return newState;
    }
    case "REMOVE_FROM_CART": {
      const newState = {
        ...state,
        products: state.products.filter(
          (item) => item._id !== action.payload._id
        ),
        total: state.total - action.payload.total,
      };

      return newState;
    }
    case "RESET_CART": {
      const newState = {
        products: [],
        total:0,
      };
      return newState;
    }
    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (payload) => {
    dispatch({ type: "ADD_TO_CART", payload });
  };

  const removeFromCart = (payload) => {
    dispatch({ type: "REMOVE_FROM_CART", payload });
  };

  const resetCart = () => {
    dispatch({ type: "RESET_CART" });
  };
  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart,resetCart }}>
      {children}
    </CartContext.Provider>
  );
};
