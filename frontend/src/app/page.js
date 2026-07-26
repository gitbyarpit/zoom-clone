"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ActionCard from "../components/ActionCard";
import MeetingCard from "../components/MeetingCard";
import api from "../services/api";

import { FaVideo, FaPlus, FaCalendarAlt } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [recentMeetings, setRecentMeetings] = useState([]);

  useEffect(() => {
    fetchUpcomingMeetings();
    fetchRecentMeetings();
  }, []);

  async function fetchUpcomingMeetings() {
    try {
      const res = await api.get("/meetings/upcoming");
      setUpcomingMeetings(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchRecentMeetings() {
    try {
      const res = await api.get("/meetings/recent");
      setRecentMeetings(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  function goToSchedulePage() {
    router.push("/schedule");
  }

  function goToJoinPage() {
    router.push("/join");
  }

  async function createMeeting() {
    try {
      const res = await api.post("/meeting", {
        title: "Instant Meeting",
        description: "Created instantly",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        duration: 30,
      });

      fetchUpcomingMeetings();
      fetchRecentMeetings();

      router.push(`/meeting/${res.data.meeting_id}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Welcome Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your meetings with ease.
            </p>
          </div>

          <div className="text-right">
            <p className="text-xl font-semibold text-gray-800">
              {new Date().toLocaleDateString()}
            </p>

            <p className="text-gray-500">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <ActionCard
            title="New Meeting"
            color="bg-orange-500"
            icon={<FaVideo />}
            onClick={createMeeting}
          />

          <ActionCard
            title="Join Meeting"
            color="bg-blue-500"
            icon={<FaPlus />}
            onClick={goToJoinPage}
          />

          <ActionCard
            title="Schedule Meeting"
            color="bg-green-500"
            icon={<FaCalendarAlt />}
            onClick={goToSchedulePage}
          />
        </div>

        {/* Upcoming Meetings */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Upcoming Meetings
          </h2>

          {upcomingMeetings.length === 0 ? (
            <MeetingCard
              title="No Upcoming Meetings"
              date="-"
              time="-"
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {upcomingMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.meeting_id}
                  title={meeting.title}
                  date={meeting.date}
                  time={meeting.time}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recent Meetings */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Recent Meetings
          </h2>

          {recentMeetings.length === 0 ? (
            <MeetingCard
              title="No Recent Meetings"
              date="-"
              time="-"
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {recentMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.meeting_id}
                  title={meeting.title}
                  date={meeting.date}
                  time={meeting.time}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}