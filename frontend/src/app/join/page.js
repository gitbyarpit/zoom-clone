"use client";
import api from "../../services/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinPage() {
  const router = useRouter();

  const [meetingId, setMeetingId] = useState("");
  const [displayName, setDisplayName] = useState("");

  async function handleJoin(e) {
  e.preventDefault();

  if (!meetingId.trim()) {
    alert("Please enter a Meeting ID");
    return;
  }

  try {
    await api.get(`/meeting/${meetingId}`);

    router.push(`/meeting/${meetingId}`);
  } catch (error) {
    if (error.response?.status === 404) {
      alert("Meeting not found!");
    } else {
      alert("Unable to join meeting.");
    }
  }
}

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleJoin}
        className="bg-white shadow-xl rounded-xl p-8 w-[450px]"
      >
        <h1 className="text-3xl font-bold mb-6">
          Join Meeting
        </h1>

        <input
          type="text"
          placeholder="Meeting ID"
          className="w-full border rounded p-3 mb-4"
          value={meetingId}
          onChange={(e) => setMeetingId(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Display Name"
          className="w-full border rounded p-3 mb-6"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Join Meeting
        </button>
      </form>
    </div>
  );
}