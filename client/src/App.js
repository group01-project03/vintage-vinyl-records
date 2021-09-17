import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProductPage from './components/ProductPage'; 
import OrderPage from './components/OrderPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';

const App = () => {
  return (
    <Router>
        <Header/>
          <Switch>
            <Route path="/" component={HomePage}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/signup" component={SignupPage}></Route>
            <Route path="/product/:id" component={ProductPage}></Route>
            <Route path="/order/:id" component={OrderPage}></Route>
            <Route path="/cart" component={CartPage}></Route>
            <Route path="/checkout" component={CheckoutPage}></Route>
          </Switch>
        <Footer/>
    </Router>
  );
};

export default App;
