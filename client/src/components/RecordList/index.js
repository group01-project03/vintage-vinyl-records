import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import Genre from "../Genre";
import { QUERY_RECORDS } from "../../utils/queries";

import { UPDATE_RECORDS } from "../../utils/actions";

import { idbPromise } from "../../utils/helpers";

import { useDispatch, useSelector } from 'react-redux';

import RecordItem from "../RecordItem"

function RecordList() {

  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const { currentGenre } = state;
  const { loading, data } = useQuery(QUERY_RECORDS);

  useEffect(() => {
    // this is to store data
    if (data) {
      dispatch({
        type: UPDATE_RECORDS,
        records: data.records
      });
      data.records.forEach((record) => {
        idbPromise('records', 'put', record);
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
    if (!currentGenre) {
      return state.records;
    }

    return state.records.filter(record => record.genre._id === currentGenre);
  }

  return (
    <div className="my-2">
      <h2 className="records">Our Available Titles:</h2>
      {state.records.length ? (
        <div className="flex-row album-grid">
            {filterRecords().map(records => (
                <RecordItem
                  key= {records._id}
                  _id={records._id}
                  image={records.image}
                  name={records.name}
                  price={records.price}
                  quantity={records.quantity}
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