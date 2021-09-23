import {useReducer} from 'react';

import {
    UPDATE_RECORDS,
    UPDATE_GENRES,
    UPDATE_CURRENT_GENRE,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from './actions';

export const reducer = (state, action) => {
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
              cart: [...state.cart, action.record]  
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
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen:!state.cartOpen
            };

        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };

        default:
            return state;
    }
};

export function useRecordReducer(initialState){
    return useReducer(reducer, initialState);
}