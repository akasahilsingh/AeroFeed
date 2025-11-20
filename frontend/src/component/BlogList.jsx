import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "motion/react"
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div
            onClick={() => setMenu(item)}
            className={` ${
              menu === item ? "text-white" : "text-gray-500"
            } rounded-full px-3 py-1 cursor-pointer relative`}
            key={item}
          >
            {item}
            {menu === item && (<motion.div
             layoutId="underline"
            transition={{ type: "spring", stiffness: 500, damping: 30}}
            className={` ${
              menu === item ? "bg-primary" : ""
            } absolute inset-0 -z-10 rounded-full`}></motion.div>)}
          </div>
        ))}
      </div>
        {/* ----------------Blog Cards---------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl-:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {blog_data.filter(item => (
          menu === "All" ?
          true
          : item.category === menu
        )).map(item => <BlogCard key={item._id} blog={item}/>)}
      </div> 
    </div>
  );
};

export default BlogList;
