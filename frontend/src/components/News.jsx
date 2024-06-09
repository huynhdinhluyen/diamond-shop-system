/* eslint-disable no-unused-vars */
import { useState } from "react";
import { newsData } from "../data/newsData";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const totalPosts = newsData.news.length;
  const currentPost = newsData.news.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="container mt-10">
      <div className="flex items-center justify-center mb-4">
        <div className="w-96 border-t border-gray-300"></div>
        <h4 className="text-2xl text-center font-bold mb-4 mx-8 text-nowrap text-accent uppercase">
          Tin tức nổi bật
        </h4>
        <div className="w-96 border-t border-gray-300"></div>
      </div>
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {currentPost.map((section, index) => (
          <Link to={`/news/${section.id}`} key={index}>
            <div className="flex flex-col gap-x-4 border-b-2 border-gray-200 pb-2 cursor-pointer h-full">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-60 object-cover mb-2 hover:scale-105 transition duration-300"
              />
              <div>
                <h4 className="text-xl font-bold mb-2 hover:text-accent transition-all duration-300 line-clamp-2">
                  {section.title}
                </h4>
                <p className="text-gray-500 mb-2 line-clamp-2">
                  {section.description}
                </p>
                <div className="flex sm:flex-row flex-col justify-between">
                  <p className="text-gray-500 italic">{section.created}</p>
                  <p className="text-gray-500 italic hover:text-accent transition-all duration-300">
                    Đọc thêm
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default News;
