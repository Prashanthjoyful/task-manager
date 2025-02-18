import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PostUser from "./pages/PostUser";
import UpdateUser from "./pages/UpdateUser";


function App() {

  
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Top Navigation Bar */}
        <nav className="bg-black text-white p-4 flex justify-between items-center shadow-md">
          {/* Left Side - Dashboard App Name */}
          <h1 className="text-xl font-bold">Dashboard</h1>

          {/* Right Side - Navigation Links */}
          <div className="space-x-6">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <Link to="/post-user" className="hover:underline">Post User</Link>
          </div>
        </nav>

        {/* Page Content */}
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/post-user" element={<PostUser />} />
            <Route path="/update-user/:id" element={<UpdateUser />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
