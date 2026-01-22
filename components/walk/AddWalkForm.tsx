"use client";

import { useState } from "react";
import { addWalkSessionAction } from "@/app/actions";

export default function AddWalkForm() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState<number | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation (UX-level)
    if (minutes < 0 || minutes > 99) {
      alert("Minutes must be between 0 and 99");
      return;
    }

    if (seconds < 0 || seconds > 59) {
      alert("Seconds must be between 0 and 59");
      return;
    }

    // Calculates total seconds since database takes seconds in
    const durationSec = minutes * 60 + seconds;

    if (durationSec <= 0) {
      alert("Duration must be greater than 0");
      return;
    }

    await addWalkSessionAction({
      date,
      durationSec,
      distanceKm,
      steps,
      calories: calories === "" ? undefined : calories,
    });

    // Reset form after data is sent to database
    setMinutes(0);
    setSeconds(0);
    setDistanceKm(0);
    setSteps(0);
    setCalories("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md space-y-4 rounded-lg border p-4"
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
            min={0}
            max={99}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Seconds</label>
          <input
            type="number"
            min={0}
            max={59}
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            className="w-full rounded border p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Distance (km)</label>
        <input
          type="number"
          step="0.1"
          value={distanceKm}
          onChange={(e) => setDistanceKm(Number(e.target.value))}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Steps</label>
        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Calories (optional)</label>
        <input
          type="number"
          value={calories}
          onChange={(e) =>
            setCalories(e.target.value === "" ? "" : Number(e.target.value))
          }
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
