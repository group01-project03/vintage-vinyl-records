import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/client';
import { QUERY_USER } from "../utils/queries";

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;
  console.log(data);
  if (data) {
    user = data.me;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">
          ← Back to Products
          </Link>
          
        {user ? (
          <>
            <div className="card-record">
            <h2>Order History for {user.username}</h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                <div className="flex-row">
                  {order.records.map(({ _id, image, title, price }, index) => (
                    <div key={index} className=" px-1 py-1">
                      <Link to={`/records/${_id}`}>
                        <img
                        className="album-cover-history"
                          alt={title}
                          src={`/images/${image}`}
                        />
                        <p>{title}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                    
                  ))}
                </div>
              </div>
            ))}
            </div>
          </>
          
        ) : null}

      </div>

    </>)
    
};

export default OrderHistory;