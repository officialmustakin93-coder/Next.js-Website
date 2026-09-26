import React from "react";
import Link from "next/link";
import WorkoutButtons from "@/components/workout/WorkoutButtons";

const WorkoutDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  const data = await response.json();

  const workout = data.find(
    (item: any) => String(item.id) === String(id)
  );

  if (!workout) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">
          Workout not found
        </h1>

        <Link
          href="/"
          className="btn bg-yellow-400 text-black mt-5"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <div>
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-[500px] object-cover rounded-2xl"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold uppercase mb-4">
            {workout.name}
          </h1>

          <p className="text-gray-400 mb-5">
            {workout.description}
          </p>

          <div className="flex gap-2 mb-6 flex-wrap">
            {Array.isArray(workout.muscleGroups) &&
              workout.muscleGroups.map(
                (muscle: string, index: number) => (
                  <span
                    key={index}
                    className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold"
                  >
                    {muscle}
                  </span>
                )
              )}
          </div>

          <div className="border border-gray-200 rounded-xl">

            <div className="flex justify-between p-4 border-b border-gray-700">
              <span>Equipment</span>
              <span>{workout.equipment}</span>
            </div>

            <div className="flex justify-between p-4 border-b border-gray-700">
              <span>Difficulty</span>
              <span>{workout.difficulty}</span>
            </div>

            <div className="flex justify-between p-4 border-b border-gray-700">
              <span>Sets</span>
              <span>{workout.sets}</span>
            </div>

            <div className="flex justify-between p-4 border-b border-gray-700">
              <span>Reps</span>
              <span>{workout.reps}</span>
            </div>

            <div className="flex justify-between p-4 border-b border-gray-700">
              <span>Duration</span>
              <span>{workout.duration} min</span>
            </div>

            <div className="flex justify-between p-4 border-b border-gray-700">
              <span>Calories</span>
              <span>{workout.caloriesBurned} kcal</span>
            </div>

            <div className="flex justify-between p-4">
              <span>Rating</span>
              <span>⭐ {workout.rating}</span>
            </div>

          </div>

          <div className="mt-8">

            <h2 className="text-2xl font-bold mb-4">
              INSTRUCTIONS
            </h2>

            <ol className="space-y-3">
              {Array.isArray(workout.instructions) &&
                workout.instructions.map(
                  (instruction: string, index: number) => (
                    <li
                      key={index}
                      className="flex gap-3"
                    >
                      <span className="text-yellow-400 font-bold">
                        {index + 1}.
                      </span>

                      <span>
                        {instruction}
                      </span>
                    </li>
                  )
                )}
            </ol>

          </div>

          <WorkoutButtons workout={workout} />

        </div>
      </div>
    </main>
  );
};

export default WorkoutDetails;