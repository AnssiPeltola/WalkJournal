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

  const minutesNum = Number(minutes);
  const secondsNum = Number(seconds);
  const distanceNum = Number(distanceKm);
  const stepsNum = Number(steps);
  const caloriesNum = calories === '' ? undefined : Number(calories);

  // Validation checks for form inputs - all fields except calories are required and must be valid numbers within specified ranges
  const isMinutesValid = !isNaN(minutesNum) && minutesNum >= 0 && minutesNum <= 99;
  const isSecondsValid = !isNaN(secondsNum) && secondsNum >= 0 && secondsNum <= 59;
  const durationSec = minutesNum * 60 + secondsNum;
  const isDurationValid = durationSec > 0;
  const isDistanceValid = !isNaN(distanceNum) && distanceNum > 0;
  const isStepsValid = !isNaN(stepsNum) && stepsNum >= 1;
  const isCaloriesValid =
    caloriesNum === undefined || (!isNaN(caloriesNum) && caloriesNum >= 1);
  const isFormValid =
    Boolean(date) &&
    isMinutesValid &&
    isSecondsValid &&
    isDurationValid &&
    isDistanceValid &&
    isStepsValid &&
    isCaloriesValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    await addWalkSessionAction({
      date,
      durationSec,
      distanceKm: distanceNum,
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
      className="w-full max-w-md space-y-4 rounded-2xl p-4 bg-white shadow-md border border-slate-200"
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
            placeholder="e.g. 3,25"
            min={0}
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
            min={0}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full rounded border p-1.5"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium">Calories</label>
          <input
            type="number"
            placeholder="e.g. 300"
            min={0}
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full rounded border p-1.5"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-40"
          disabled={!isFormValid}
        >
          Save walk
        </button>
      </div>
    </form>
  );
}
