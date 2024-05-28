import { useParams } from "react-router-dom";
import { newsData } from "../newsData";

const NewsDetails = () => {
  const { sectionId } = useParams();

  const section = newsData.news.find((article) => article.id === sectionId);

  if (!section) {
    return <div>Không tìm thấy bài viết</div>;
  }

  return (
    <div className="w-full mx-auto p-4 mt-5">
      <div className="pb-5 w-[80%] mx-auto">
        <h2 className="h2 text-center font-bold ">{section.title}</h2>
        <div className="flex flex-col lg:flex-row justify-normal lg:justify-between mt-4">
          <p className="text-gray-500 italic mb-4 text-sm">
            Ngày đăng: {section.created}
          </p>
          <p className="text-gray-500 italic mb-4 text-sm">
            Tác giả: {section.author}
          </p>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-12 mt-5 ">
        <div className="col-span-12 text-left">
          <div className="flex flex-col items-center">
            <img
              src={section.image}
              alt={section.title}
              className="w-full max-w-lg object-cover mb-4"
            />
            <div className="text-lg">
              {Array.isArray(section.content) &&
                section.content.map((item, index) => {
                  if (item.type === "paragraph") {
                    return (
                      <p key={index} className="mb-4">
                        {item.text}
                      </p>
                    );
                  } else if (item.type === "bold") {
                    return (
                      <p
                        key={index}
                        className="mb-4 font-bold text-accent text-xl"
                      >
                        {item.text}
                      </p>
                    );
                  } else if (item.type === "table") {
                    return (
                      <table
                        key={index}
                        className="table-auto border-collapse border border-gray-300 w-full mb-4"
                      >
                        <thead>
                          <tr>
                            {item.data[0].map((header, i) => (
                              <th
                                key={i}
                                className="border border-gray-300 px-4 py-2"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {item.data.slice(1).map((row, i) => (
                            <tr key={i}>
                              {row.map((cell, j) => (
                                <td
                                  key={j}
                                  className="border border-gray-300 px-4 py-2"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    );
                  } else if (item.type === "image") {
                    return (
                      <img
                        key={index}
                        src={item.url}
                        alt={item.alt}
                        className="w-full h-full object-cover mb-2 "
                      />
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
