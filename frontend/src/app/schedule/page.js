"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

export default function SchedulePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: 30,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/meeting", formData);

      alert("Meeting Scheduled Successfully!");

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-[500px]"
      >

        <h1 className="text-3xl font-bold mb-6">
          Schedule Meeting
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Meeting Title"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded mb-4"
          rows={4}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration"
          className="w-full border p-3 rounded mb-6"
          onChange={handleChange}
          required
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Schedule Meeting
        </button>

      </form>

    </div>
  );
}