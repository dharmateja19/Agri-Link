// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem('token')
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow ">
//       <Link to="/" className="text-2xl font-bold">AgriLink</Link>

//       {!user ? (
//         <div className="space-x-4">
//           <Link to="/register" className="hover:underline">
//             Register here
//           </Link>
//           <Link to="/login" className="hover:underline">
//             Login here
//           </Link>
//         </div>
//       ) : (
//         <div className="flex items-center gap-4">
//           <span className="text-sm italic">Welcome, {user.name}</span>
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded hover:underline cursor-pointer"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link to="/" className="text-2xl font-bold">
        AgriLink
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {!user ? (
          <>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link
              to={`/${user.role}/dashboard`}
              className="hover:underline"
            >
              Dashboard
            </Link>
            <span className="italic text-sm hidden sm:inline">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded hover:underline cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
