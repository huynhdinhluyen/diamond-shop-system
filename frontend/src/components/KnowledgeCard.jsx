/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const KnowledgeCard = ({ id, title, image, description }) => {
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };
    return (
        <Link to={`/knowledge/${id}`} className="block bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
            <img src={image} alt={title} className="w-full min-h-72 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-700">{truncateText(description, 100)}</p>
            </div>
        </Link>
    )
}

export default KnowledgeCard