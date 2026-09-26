"use client";

import React from "react";
import { addToPlan, addToSaved } from "@/lib/storage";

const WorkoutButtons = ({ workout }: any) => {
  const handleAddPlan = () => {
    const result = addToPlan(workout);

    if (result) {
      alert("Added to today's plan");
    } else {
      alert("Already added or plan is full");
    }
  };

  const handleSave = () => {
    const result = addToSaved(workout);

    if (result) {
      alert("Saved for later");
    } else {
      alert("Already saved");
    }
  };

  return (
    <div className="flex gap-3 mt-8">
      <button
        onClick={handleAddPlan}
        className="btn bg-yellow-400 text-black border-none"
      >
        Add to today's plan
      </button>

      <button
        onClick={handleSave}
        className="btn border-gray-500"
      >
        Save for later
      </button>
    </div>
  );
};

export default WorkoutButtons;