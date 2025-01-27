// "use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Выбираем игру:</h1>
      <div className="space-y-4">
        <Link href="/animals" className="text-xl text-blue-600 hover:underline">
          Рассели животных
        </Link>
        </div>
        <div className="space-y-4">
        <Link href="/fruits" className="text-xl text-green-600 hover:underline">
          Положи в корзину
        </Link>
      </div>
    </div>
  );
}



// import ClientDragDropGame from "../components/ClientDragDropGame";

// export default function Page() {
//     return <ClientDragDropGame />;
// }
