import { useEffect, useState } from "react";

const Attendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/attendances") // Adjust API URL if needed
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        return response.json();
      })
      .then((data) => {
        setAttendances(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendance Records</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Employee ID</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((record) => (
              <tr key={record._id} className="text-center border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{record.employeeId}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    record.status === "Present" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
