import { logout } from "../utils/auth";

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">LoanPro</h2>

        <ul className="space-y-4">
          <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">
            Dashboard
          </li>
          <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">
            Loans
          </li>
          <li
            onClick={logout}
            className="hover:bg-red-500 p-2 rounded cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="bg-white p-4 shadow flex justify-between">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <p className="text-gray-500">Welcome 👋</p>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;