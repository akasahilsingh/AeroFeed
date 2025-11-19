import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react"

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div
            onClick={() => setMenu(item)}
            className={` ${
              menu === item ? "bg-primary text-white" : ""
            } text-gray-500 rounded-full px-3 py-1 cursor-pointer`}
            key={item}
          >
            {item}
          </div>
        ))}
      </div>

      <div>{/* ----------------Blog Cards---------------------- */}</div>
    </div>
  );
};

export default BlogList;
