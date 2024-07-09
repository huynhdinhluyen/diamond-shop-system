import KnowledgeCard from "../components/KnowledgeCard";
import { data } from "../data/knowledgeData";

export default function Knowledge() {
  return (
    <div className="container bg-gray-50 lg:p-10 mx-auto py-2 px-4">
      <h3 className="h3 font-bold text-center my-8 text-accent uppercase">Kiến Thức Về Kim Cương</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((knowledge) => (
          <KnowledgeCard
            key={knowledge.id}
            id={knowledge.id}
            title={knowledge.title}
            image={knowledge.image}
            description={knowledge.description}
          />
        ))}
      </div>
    </div>
  );
}
