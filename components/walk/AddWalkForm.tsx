"use client";

import { useState } from "react";
import { addWalkSessionAction } from "@/app/actions";

export default function AddWalkForm() {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [distanceKm, setDistanceKm] = useState('');
  const [steps, setSteps] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const min = Number(minutes);
    const sec = Number(seconds);
    const distance = Number(distanceKm);
    const stepsNum = Number(steps);
    const caloriesNum = calories === '' ? undefined : Number(calories);

    if (isNaN(min) || min < 0 || min > 99) {
      alert("Minutes must be between 0 and 99");
      return;
    }

    if (isNaN(sec) || sec < 0 || sec > 59) {
      alert("Seconds must be between 0 and 59");
      return;
    }

    // Calculates total seconds since database takes seconds in
    const durationSec = min * 60 + sec;

    if (durationSec <= 0) {
      alert("Duration must be greater than 0");
      return;
    }

    if (isNaN(distance) || distance <= 0) {
      alert("Distance must be greater than 0");
      return;
    }

    if (isNaN(stepsNum) || stepsNum < 0) {
      alert("Steps must be 0 or greater");
      return;
    }

    await addWalkSessionAction({
      date,
      durationSec,
      distanceKm: distance,
      steps: stepsNum,
      calories: caloriesNum,
    });

    // Reset form after data is sent to database
    setMinutes('');
    setSeconds('');
    setDistanceKm('');
    setSteps('');
    setCalories('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4 rounded-lg p-4 bg-white"
    >
      <h2 className="text-lg font-semibold">Add Walk Session</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="w-full">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded border p-1.5"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium">Minutes</label>
          <input
            type="number"
            placeholder="0–99"
            min={0}
            max={99}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-full rounded border p-1.5"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium">Seconds</label>
          <input
            type="number"
            placeholder="0–59"
            min={0}
            max={59}
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="w-full rounded border p-1.5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="w-full">
          <label className="block text-sm font-medium">Distance (km)</label>
          <input
            type="number"
            step="0.01"
            placeholder="e.g. 3.25"
            value={distanceKm}
            onChange={(e) => setDistanceKm(e.target.value)}
            className="w-full rounded border p-1.5"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium">Steps</label>
          <input
            type="number"
            placeholder="e.g. 4200"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full rounded border p-1.5"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium">Calories (optional)</label>
          <input
            type="number"
            placeholder="e.g. 300"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full rounded border p-1.5"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800 sm:w-40"
        >
          Save walk
        </button>
      </div>
    </form>
  );
}
