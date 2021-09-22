import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { useDispatch, useSelector } from 'react-redux';

import logo from './logo.svg';
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import OrderHistory from "./pages/OrderHistory";
import Success from "./pages/Success";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import "./App.css"

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/records/:id" component={Detail} />
              <Route exact path="/success" component={Success} />
              <Route component={NoMatch} />
            </Switch>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
