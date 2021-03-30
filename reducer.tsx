export const initialState = {
  basket: [],
  order: [],
  user: null,
};

export const getBasketTotal = (basket: any) =>
  basket?.reduce((amount: number, item: any) => item.price + amount, 0);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.product],
      };

    case "ADD_TO_ORDER":
      return {
        ...state,
        order: [...state.order, action.restaurant],
      };

    case "EMPTY_ORDER":
      return {
        ...state,
        order: [],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem: any) => basketItem.product_id === action.product_id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can not remove product (id: ${action.id}) as its not in basket!`
        );
      }
      console.log("Removed Successfully");

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
