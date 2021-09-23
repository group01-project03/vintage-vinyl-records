import React from "react";
import RecordList from "../components/RecordList";
import Genre from "../components/Genre";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <Genre />
      <RecordList />
      <Cart />
    </div>
  );
};

export default Home;