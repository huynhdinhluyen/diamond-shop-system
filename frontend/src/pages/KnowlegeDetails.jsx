import { Link, useParams } from "react-router-dom";
import { data } from "../data/knowledgeData";


const KnowledgeDetails = () => {
    const { sectionId } = useParams();
    console.log(sectionId)
    const knowledge = data.find((item) => item.id === sectionId);

    return (
        <div className="container mx-auto px-4 py-8 mt-5">
            {!knowledge ? (<p>Article not found</p>)
                : (
                    <div>
                        <h1 className="text-4xl font-bold mb-4 text-center">{knowledge.title}</h1>
                        <img src={knowledge.image} alt={knowledge.title} className="w-full h-auto mb-4" />
                        <p className="text-lg mb-4">{knowledge.description}</p>
                        {knowledge.content.map((content, index) => {
                            switch (content.type) {
                                case "bold":
                                    return <h4 key={index} className=" h4 font-bold">{content.text}</h4>;
                                case "paragraph":
                                    return <p key={index} className="my-2">{content.text}</p>;
                                case "image":
                                    return <img key={index} src={content.url} alt={content.alt} className="w-full h-auto mb-4" />;
                                case "unordered-list":
                                    return (
                                        <ul key={index} className="list-disc list-inside mb-4">
                                            {content.items.map((item, subIndex) => (
                                                <li key={subIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    );
                                default:
                                    return null;
                            }
                        })}
                        <Link to="/knowledge" className="text-accent underline cursor-pointer">Quay lại</Link>
                    </div>
                )}
        </div>
    );
};

export default KnowledgeDetails;
