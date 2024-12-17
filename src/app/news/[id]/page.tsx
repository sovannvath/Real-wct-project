import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/services/firebase";

export default async function NewsDetail({ params }: { params: { id: string } }) {
  const docRef = doc(db, "news_articles", params.id);
  const docSnap = await getDoc(docRef);

  const article = docSnap.exists() ? docSnap.data() : null;

  if (!article) return <p>Article not found!</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <img src={article.image} alt={article.title} className="w-full h-64 object-cover my-4" />
      <p>{article.description}</p>
      <p className="text-gray-500">Published at: {article.timestamp}</p>
    </div>
  );
}
