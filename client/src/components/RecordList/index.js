import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import Genre from "../Genre";
import { QUERY_RECORDS } from "../../utils/queries";

import { UPDATE_RECORDS } from "../../utils/actions";

import { idbPromise } from "../../utils/helpers";

import { useDispatch, useSelector } from 'react-redux';

function RecordList() {

  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_RECORDS);

  useEffect(() => {
    // this is to store data
    if (data) {
      dispatch({
        type: UPDATE_RECORDS,
        records: data.records
      });
      data.records.forEach((record) => {
        idbPromise('records', 'put', records);
      });
    } else if (!loading) {
      idbPromise('records', 'get').then((records) => {
        dispatch({
          type: UPDATE_RECORDS,
          records: records
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterRecords() {
    if (!currentCategory) {
      return state.records;
    }

    return state.records.filter(record => record.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Available Titles:</h2>
      {state.records.length ? (
        <div className="flex-row">
            {filterrecords().map(records => (
                <Genre
                  key= {record._id}
                  _id={records._id}
                  image={record.image}
                  name={record.name}
                  price={record.price}
                  quantity={record.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any items to your cart.</h3>
      )}
    </div>
  );
}

export default RecordList;