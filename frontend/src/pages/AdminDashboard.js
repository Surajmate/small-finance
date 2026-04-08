import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminDashboard() {
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    const res = await api.get("/admin/loans");
    setLoans(res.data);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/admin/loan/${id}`, { status });
    fetchLoans();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <table className="w-full text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id} className="border-b">
              <td>{loan.userId?.email}</td>
              <td>₹{loan.amount}</td>
              <td>{loan.status}</td>

              <td className="space-x-2">
                <button
                  onClick={() => updateStatus(loan._id, "approved")}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(loan._id, "rejected")}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;