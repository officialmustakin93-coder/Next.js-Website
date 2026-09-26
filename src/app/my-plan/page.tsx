"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";


import {
  getPlan,
  getSaved,
  removeFromPlan,
  removeFromSaved,
} from "@/lib/storage";

const MyPlan = () => {
  const [plan, setPlan] = useState<any[]>([]);
  const [saved, setSaved] = useState<any[]>([]);
  const [tab, setTab] = useState("plan");

  const loadData = () => {
    setPlan(getPlan());
    setSaved(getSaved());
  };

  useEffect(() => {
    loadData();

    window.addEventListener("fitlog-update", loadData);

    return () => {
      window.removeEventListener("fitlog-update", loadData);
    };
  }, []);

  const removeWorkout = (id: any) => {
    if (tab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }

    loadData();
  };

  const currentData = tab === "plan" ? plan : saved;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">

      <h1 className="text-4xl font-bold">
        MY PLAN
      </h1>

      <p className="text-gray-400 mt-2 mb-8">
        Manage your today's workouts and saved workouts.
      </p>
  <div className="border border-gray-200 rounded-xl p-5 mb-8">

  <div className="flex justify-between items-center">

    <div>
      <p className="text-gray-500 text-sm">
        EXERCISES
      </p>
      <h2 className="text-2xl font-bold">
        {plan.length}
      </h2>
    </div>

    <div>
      <p className="text-gray-500 text-sm">
        MINUTES
      </p>
      <h2 className="text-2xl font-bold">
        {plan.reduce(
          (total, workout) =>
            total + Number(workout.duration || 0),
          0
        )} min
      </h2>
    </div>

    <div>
      <p className="text-gray-500 text-sm">
        CALORIES
      </p>
      <h2 className="text-2xl font-bold">
        {plan.reduce(
          (total, workout) =>
            total + Number(workout.caloriesBurned || 0),
          0
        )} kcal
      </h2>
    </div>

  </div>

</div>
      <div className="flex gap-3 mb-8">

        <button
          onClick={() => setTab("plan")}
          className={`btn ${
            tab === "plan"
              ? "bg-yellow-400 text-black border-none"
              : ""
          }`}
        >
          Today's Plan ({plan.length})
        </button>

        <button
          onClick={() => setTab("saved")}
          className={`btn ${
            tab === "saved"
              ? "bg-yellow-400 text-black border-none"
              : ""
          }`}
        >
          Saved for Later ({saved.length})
        </button>

      </div>

      {currentData.length === 0 && (
        <div className="border border-gray-200 rounded-xl py-20 text-center">

          <h2 className="text-2xl font-bold">
            {tab === "plan"
              ? "NO WORKOUTS IN TODAY'S PLAN"
              : "NO SAVED WORKOUTS"}
          </h2>

          <p className="text-gray-400 mt-2 mb-5">
            {tab === "plan"
              ? "Add a workout from the workout details page."
              : "Save a workout to see it here later."}
          </p>

          <Link
            href="/"
            className="btn bg-yellow-400 text-black border-none"
          >
            Browse Workouts
          </Link>

        </div>
      )}

      <div className="space-y-4">

        {currentData.map((workout) => (

          <div
            key={workout.id}
            className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-5 items-center"
          >

            <img
              src={workout.image}
              alt={workout.name}
              className="w-full md:w-40 h-28 object-cover rounded-lg"
            />

            <div className="flex-1">

              <h3 className="text-xl font-bold">
                {workout.name}
              </h3>

              <p className="text-gray-500 mt-1">
                {workout.equipment}
              </p>

              <div className="flex gap-4 text-sm mt-3">

                <span>
                  ⏱ {workout.duration} min
                </span>

                <span>
                  🔥 {workout.caloriesBurned} kcal
                </span>

                <span>
                  ⭐ {workout.rating}
                </span>

              </div>

            </div>

            <div className="flex gap-2">

              <Link
                href={`/workout/${workout.id}`}
                className="btn btn-sm"
              >
                View Details
              </Link>

              <button
                onClick={() => removeWorkout(workout.id)}
                className="btn btn-sm"
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>
      
    </main>
  );
};

export default MyPlan;