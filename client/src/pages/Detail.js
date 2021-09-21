import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import { QUERY_RECORDS } from "../utils/queries";

import { UPDATE_RECORDS, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, ADD_TO_CART } from '../utils/actions';

import Cart from "../components/Cart";

import { idbPromise } from "../utils/helpers";

import { useDispatch, useSelector } from 'react-redux';

function Detail() {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const [currentRecord, setCurrentRecord] = useState({})
  
  const { loading, data } = useQuery(QUERY_RECORDS);
  
  const { records, cart } = state;
  
  useEffect(() => {
    if (records.length) {
      setCurrentRecord(records.find(record => record._id === id));
    } else if (data) {
      // retrieve data from the server
      dispatch({
        type: UPDATE_RECORDS,
        records: data.records
      });
      // store data in IndexedDB
      data.records.forEach((record) => {
        idbPromise('records', 'put', record);
      });
    // if the user is offline, use the cached data in IndexedDB
    } else if (!loading) {
      idbPromise('records', 'get').then((indexedRecords) => {
        dispatch({
          type: UPDATE_RECORDS,
          records: indexedRecords
        });
      });
    }
  }, [records, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    // if the record is already in the cart, update the quantity instead of adding duplicate items
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // and also store in IndexedDB
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    // if the record is not yet in the cart, add it
    } else {
      dispatch({
        type: ADD_TO_CART,
        record: { ...currentRecord, purchaseQuantity: 1 }
      });
      // also store in IndexedDB
      idbPromise('cart', 'put', { ...currentRecord, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    // remove the record from the cart
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentRecord._id
    });
    // update IndexedDB to show it has been deleted
    idbPromise('cart', 'delete', { ...currentRecord })
  };

  return (
    <>
      {currentRecord ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Records
          </Link>

          <h2>{currentRecord.name}</h2>

          <p>
            {currentRecord.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentRecord.price}
            {" "}
            <button onClick={addToCart}>
              Add to Cart
            </button>
            <button 
              disabled={!cart.find(p => p._id === currentRecord._id)} 
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentRecord.image}`}
            alt={currentRecord.name}
          />
        </div>
      ) : null}
      <Cart />
    </>
  );
};

export default Detail;