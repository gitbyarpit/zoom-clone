import { FaCalendarAlt, FaClock } from "react-icons/fa";

export default function MeetingCard({ title, date, time }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800">
        {title}
      </h3>

      <div className="flex items-center mt-4 text-gray-600">
        <FaCalendarAlt className="mr-2 text-blue-500" />
        <span>{date}</span>
      </div>

      <div className="flex items-center mt-2 text-gray-600">
        <FaClock className="mr-2 text-green-500" />
        <span>{time}</span>
      </div>
    </div>
  );
}