import React, { useEffect, useState } from "react";
import { api } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const Navigate = useNavigate();
  const { username } = useParams();
  const data = useSelector((store) => store.user);
  if (username === "Alpha" || username === "Zoro" || data?.role === "demo")
    Navigate("/");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const password = e.target.password.value;
      const confirmpassword = e.target.confirmpassword.value;

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match!");
        setSuccess("");
      } else {
        const res = await api.put(
          "https://airosphere-ggits.vercel.app/user/updatepassword/" + username,
          {
            password,
            confirmpassword,
          }
        );
        if (res.status === 200 && res.data) {
          console.log("password updated successfully.");
          toast.success("Password edited sucessfully");
          Navigate("/dashboard");
        } else {
          toast.error("Error occured while updating password");
          console.log("Error occured while updating password");
          Navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occured while updating password");
    }
  };

  useEffect(() => {
    if (!data) {
      Navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center pt-[15vh] h-[82vh] bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Update Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your new password"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your new password"
              required
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
