import React, { Fragment } from "react";
import Navbar from "../navbar/navbar";
import News from "../news/news";
import { Toaster } from "react-hot-toast";
import Posts from "../posts/posthome";

const Home = () => {
  return (
    <Fragment>
      <Toaster />
      <Posts />
      <Navbar />
      <News />
    </Fragment>
  );
};

export default Home;
