import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';

import RecordItem from "../RecordItem"
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_RECORDS } from "../../utils/actions";
import { QUERY_RECORDS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";


function RecordList() {
  const [state, dispatch] = useStoreContext();

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

    return state.records.filter(
      (record) => record.genre._id === currentGenre);
  }

  return (
    <div className="my-2">
      <h2 className="records">Our Available Titles:</h2>
      {state.records.length ? (
        <div className="flex-row album-grid">
            {filterRecords().map((record) => (
                <RecordItem
                  key= {record._id}
                  _id={record._id}
                  image={record.image}
                  title={record.title}
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