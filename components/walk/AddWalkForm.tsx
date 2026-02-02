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
      className="max-w-md space-y-4 rounded-lg border p-4 bg-white"
    >
      <h2 className="text-lg font-semibold">Add Walk Session</h2>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium">Minutes</label>
          <input
            type="number"
            placeholder="0–99"
            min={0}
            max={99}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Seconds</label>
          <input
            type="number"
            placeholder="0–59"
            min={0}
            max={59}
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Distance (km)</label>
        <input
          type="number"
          step="0.01"
          placeholder="e.g. 3.25"
          value={distanceKm}
          onChange={(e) => setDistanceKm(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Steps</label>
        <input
          type="number"
          placeholder="e.g. 4200"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Calories (optional)</label>
        <input
          type="number"
          placeholder="e.g. 300"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Save walk
      </button>
    </form>
  );
}
