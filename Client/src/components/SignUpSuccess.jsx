import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpSuccess = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/"); // Navigate to homepage
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-600">
          Sign Up Request Submitted!
        </h1>
        <p className="mt-4 text-gray-700 text-center">
          Thank you for signing up! Your request has been received and is
          currently under review. Once your credentials are verified, we will
          send your ID and password to your registered email address.
        </p>
        <p className="mt-2 text-gray-700 text-center">
          Please allow some time for the approval process.
        </p>

        <button
          onClick={handleRedirect}
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default SignUpSuccess;
