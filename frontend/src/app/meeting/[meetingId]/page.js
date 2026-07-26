"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
  FaUsers,
  FaComments,
  FaDesktop,
} from "react-icons/fa";

export default function MeetingPage() {
  const { meetingId } = useParams();
  const router = useRouter();

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [participants] = useState(1);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function formatTime(sec) {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, "0");
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const secs = String(sec % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  }

  return (
    <div className="min-h-screen bg-[#202124] text-white flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center px-8 py-5 border-b border-gray-700">

        <div>
          <h1 className="text-2xl font-bold">
            Meeting Room
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Meeting ID: {meetingId}
          </p>
        </div>

        <div className="text-right">
          <p className="text-green-400 font-semibold">
            {formatTime(seconds)}
          </p>

          <p className="text-gray-400 text-sm">
            {participants} Participant
          </p>
        </div>

      </div>

      {/* Video Area */}
      <div className="flex-1 flex items-center justify-center p-8">

        <div className="w-[800px] h-[450px] rounded-3xl bg-gray-800 flex items-center justify-center text-3xl font-semibold">
          {cameraOn ? "📹 Camera Preview" : "📷 Camera Off"}
        </div>

      </div>

      {/* Bottom Controls */}
      <div className="bg-[#181818] py-6 flex justify-center gap-6">

        <button
          onClick={() => setMicOn(!micOn)}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${
            micOn ? "bg-gray-700" : "bg-red-500"
          }`}
        >
          {micOn ? <FaMicrophone size={22} /> : <FaMicrophoneSlash size={22} />}
        </button>

        <button
          onClick={() => setCameraOn(!cameraOn)}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${
            cameraOn ? "bg-gray-700" : "bg-red-500"
          }`}
        >
          {cameraOn ? <FaVideo size={22} /> : <FaVideoSlash size={22} />}
        </button>

        <button className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
          <FaDesktop size={22} />
        </button>

        <button className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
          <FaComments size={22} />
        </button>

        <button className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
          <FaUsers size={22} />
        </button>

        <button
          onClick={() => router.push("/")}
          className="px-6 rounded-full bg-red-600 hover:bg-red-700 flex items-center gap-2"
        >
          <FaPhoneSlash />
          Leave
        </button>

      </div>
    </div>
  );
}