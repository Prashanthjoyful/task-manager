import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();

  // State for user details
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser(data); // Set user details
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]); // Run when ID changes

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Failed to update user");
      alert("User updated successfully!");
      navigate("/"); // Redirect to home or user list page
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="text-center text-lg">Loading user data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-blue-600 text-center">Update User</h1>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter name"
            value={user?.name || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter email"
            value={user?.email || ""}
            onChange={handleChange}
            disabled // Email should not be updated
          />
        </div>

        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter phone number"
            value={user?.phone || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700">Address</label>
          <textarea
            name="address"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter address"
            value={user?.address || ""}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
