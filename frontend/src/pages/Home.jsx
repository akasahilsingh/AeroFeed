import React, { useState } from "react";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import BlogList from "../component/BlogList";
import NewsLetter from "../component/NewsLetter";
import Footer from "../component/Footer";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("")
  return (
    <>
      <Navbar />
      <Header search={searchQuery} setSearch={setSearchQuery}/>
      <BlogList search={searchQuery}/>
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
