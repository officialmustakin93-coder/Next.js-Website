import React from "react";
import Link from "next/link";

const getCards = async () => {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
    const data = await response.json();
    return data;
};

const Card = async () => {
    const cardData = await getCards();

    return (
        <section className="container mx-auto my-70px px-4">
            <h1 className="text-4xl font-bold mb-2">THE LIBRARY</h1>
            <p className="text-gray-400 mb-8">Twelve lifts covering every major muscle group.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardData.map((card: any, ind: number) => {
                    const cardId = card.id || ind;
                    return (
                        <div 
                            key={cardId} 
                            className="bg-gray-800 rounded-xl p-4 text-white shadow-lg flex flex-col justify-between"
                        >
                            <Link href={`/workout/${cardId}`} className="block">
                                <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                                    <img 
                                        src={card.image}
                                        alt={card.name} 
                                        className="h-48 w-full object-cover rounded-lg"
                                    />
                                </div>
                            </Link>
                            
                            <div className="flex gap-2 mb-2 flex-wrap">
                                {Array.isArray(card.muscleGroups) ? (
                                    card.muscleGroups.map((cat: string, catIndex: number) => (
                                        <span 
                                            key={catIndex} 
                                            className="bg-yellow-500 text-black text-xs px-2 py-1 rounded font-bold uppercase"
                                        >
                                            {cat}
                                        </span>
                                    ))
                                ) : (
                                    <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded font-bold uppercase">
                                        {card.muscleGroups}
                                    </span>
                                )}
                            </div>

                            <Link href={`/workout/${cardId}`}>
                                <h3 className="text-lg font-bold mt-2 hover:text-yellow-500 transition">{card.name}</h3>
                            </Link>
                            <p className="text-sm text-gray-400 mb-4">
                                {Array.isArray(card.equipment) ? card.equipment.join(", ") : card.equipment}
                            </p>

                            <div className="flex justify-between items-center text-sm text-gray-300 border-t border-gray-700 pt-3 mt-auto">
                                <span>⏱️ {card.duration} min</span>
                                <span>🔥 {card.caloriesBurned} kcal</span>
                                <span>⭐ {card.rating}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Card;