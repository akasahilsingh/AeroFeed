import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../component/Navbar";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchBlogData = async () => {
    const blog = blog_data.find((item) => item._id === id);
    setData(blog);
  };

  const fetchComments = async () => {
    setComments(comments_data);
  };

  const fromNow = (date) => {
    const seconds = Math.floor(new Date() - new Date(date)) / 1000;

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} days ago`;
    const month = Math.floor(days / 30);
    if (month < 12) return `${month} months ago`;
    const year = Math.floor(month / 12);
    return `${year} years ago`;
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);
  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        className="absolute -top-50 -z-1 opacity-50"
        alt="gradient background"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on{" "}
          {new Date(data.createdAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          John Doe
        </p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="blog thumbnail" />
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="rich-text max-w-3xl mx-auto"
        ></div>
        {/* ----------Comment Section------------- */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p>Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
                key={index}
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="user icon" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {fromNow(item.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Blog;
