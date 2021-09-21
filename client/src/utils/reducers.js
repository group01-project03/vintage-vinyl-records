import {
    UPDATE_RECORDS,
    UPDATE_GENRES,
    UPDATE_CURRENT_GENRE,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
  } from './actions';

// default state  
const defaultState = {
    records: [],
    genres: [],
    currentGenre: '',
    cart: [],
    cartOpen: false
}

const reducer = (state=defaultState, action) => {
    switch (action.type) {
        case UPDATE_RECORDS:
            return {
                ...state,
                records: [...action.records],
            };
        case UPDATE_GENRES:
            return {
                ...state,
                genres: [...action.genres]
            };
        case UPDATE_CURRENT_GENRE:
            return {
                ...state,
                currentGenre: action.currentGenre
            };
        case ADD_TO_CART:
            return {
              ...state,
              cartOpen: true,
              cart: [...state.cart, action.records]  
            };
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.records]
            };
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(record => {
                return record._id !== action._id;
            });
            
            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(record => {
                    if (action._id === record._id) {
                        record.purchaseQuantity = action.purchaseQuantity;
                    }
                    return record;
                })
            };

        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };

        default:
            return state;
    }
};

export default reducer;