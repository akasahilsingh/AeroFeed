import { useState } from "react";

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

export default fetchBlogData;
