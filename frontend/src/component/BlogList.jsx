import React, { useEffect, useState } from "react";
// import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import axios from "axios";

const BlogList = ({ search }) => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const fetchBlogData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1337/api/articles?populate=*"
      );
      setBlogs(res.data.data);
      const uniqueCategory = ["All"];
      res.data.data.forEach((item) => {
        if (item.category?.name) {
          uniqueCategory.push(item.category.name);
        }
        setCategories([...new Set(uniqueCategory)]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filteredBlogs = blogs.filter((item) => {
    const matchsCategory = menu === "All" ? true : item.category?.name === menu;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase());
    return matchsCategory && matchesSearch;
  });

  useEffect(() => {
    fetchBlogData();
  }, []);
  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {categories.map((item) => (
          <div
            onClick={() => setMenu(item)}
            className={` ${
              menu === item ? "text-white" : "text-gray-500"
            } rounded-full px-3 py-1 cursor-pointer relative`}
            key={item}
          >
            {item}
            {menu === item && (
              <motion.div
                layoutId="underline"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={` ${
                  menu === item ? "bg-primary" : ""
                } absolute inset-0 -z-10 rounded-full`}
              ></motion.div>
            )}
          </div>
        ))}
      </div>
      {/* ----------------Blog Cards---------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl-:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs.map((item) => (
            <BlogCard
              key={item.id}
              blog={{
                id: item.id,
                title: item.title,
                description: item.description,
                slug: item.slug,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                category: item.category?.name || null,
                image: "http://localhost:1337" + item.cover.url,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
