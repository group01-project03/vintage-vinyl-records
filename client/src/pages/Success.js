import React, { useEffect } from "react";
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron/index.js';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from "../utils/helpers";

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const records = cart.map((item) => item._id);
            
            if(records.length){
                const { data } = await addOrder({ variables: { records } });
                const recordData = data.addOrder.records;
                recordData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                });
            }
            setTimeout(() => {
                window.location.assign('/')
            }, 3000)
        }

        saveOrder();
    }, [addOrder]);

    return (
        <div>
            <Jumbotron>
                <h1>Success!</h1>
                <h2>
                    Thank you for your purchase.
                </h2>
                <h2>
                    You will now be redirected back to the homepage.
                </h2>
            </Jumbotron>
        </div>
    );
};

export default Success;