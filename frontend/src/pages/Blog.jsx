import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Loader from "../component/Loader";
import axios from "axios";
import { marked } from "marked";
const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    const res = await axios.get(
      `${STRAPI_URL}/api/articles?filters[id][$eq]=${id}&populate=*`
    );
    // const blog = res.find((item) => item.id === id);
    setData(res.data?.data?.[0]);
  };

  const STRAPI_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

  const fetchComments = async () => {
    const res = await axios.get(
      `${STRAPI_URL}/api/comments?filters[article][id][$eq]=${id}&sort=createdAt:desc`
    );
    setComments(res.data?.data || []);
  };
  const addComment = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        data: {
          Name: name,
          Content: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: content,
                },
              ],
            },
          ],
          article: id,
        },
      };
      await axios.post(`${STRAPI_URL}/api/comments`, payload);
      setName("");
      setContent("");
      fetchComments();
    } catch (error) {
      console.log("Error submitting comment", error);
    }
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
  }, [id]);
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
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.description}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          {data.author?.name || "Unknown Author"}
        </p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img
          className="w-full aspect-video object-cover rounded-lg"
          src={data.cover ? `${STRAPI_URL}${data.cover.url}` : ""}
          alt="blog thumbnail"
        />
        <div
          dangerouslySetInnerHTML={{
            __html: marked(data.blocks[0].body || ""),
          }}
          className="rich-text max-w-3xl mx-auto"
        ></div>
        {/* ----------Comment Section------------- */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
                key={index}
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="user icon" className="w-6" />
                  <p className="font-medium">{item.Name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">
                  {item.Content?.[0]?.children?.[0].text}
                </p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {fromNow(item.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* -----------------Add Comment Section------------------ */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comments</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-center gap-4 max-w-lg"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded outline-none"
              required
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
              placeholder="Add your comments here..."
              required
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover: scale-102 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* ------------------------Share buttons-------------- */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex">
            <img src={assets.facebook_icon} width={50} alt="facebook icon" />
            <img src={assets.twitter_icon} width={50} alt="twitter icon" />
            <img
              src={assets.googleplus_icon}
              width={50}
              alt="google plus icon"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
