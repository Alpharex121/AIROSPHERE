import React, { useEffect, useState } from "react";
import { api } from "../utils/constant";
import { addUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addRequestData } from "../store/studentDataSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);
  const [file, setFile] = useState(null); // To handle ID card upload

  useEffect(() => {
    if (data && data?.username) {
      Navigate("/dashboard");
    }
  }, [data, Navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/png" || selectedFile.type === "image/jpeg")
    ) {
      setFile(selectedFile);
    } else {
      alert("Please upload a PNG or JPG image.");
    }
  };

  const formData = new FormData();
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const username = e.target.username.value;
      const name = e.target.name.value;
      const semester = e.target.semester.value;
      const enrollmentno = e.target.enrollmentno.value;
      const mail = e.target.mail.value;

      formData.append("username", username);
      formData.append("name", name);
      formData.append("semester", semester);
      formData.append("enrollmentno", enrollmentno);
      formData.append("mail", mail);
      if (file) {
        formData.append("id_card", file); // Add ID card image to form data
      }

      const data = await api.post("http://localhost:3000/requests", {
        username,
        name,
        mail,
        enrollmentno,
        semester,
      });
      console.log(data);
      Navigate("/authenticate/signupsuccess");
    } catch (error) {
      console.log(error.message);
      Navigate("/");
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto">
        <a
          href="#"
          className="flex items-center mb-6 text-3xl font-semibold text-gray-900"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          AIROSPHERE
        </a>
        <div className="w-full bg-white rounded-lg shadow-lg dark:border sm:max-w-lg xl:max-w-xl">
          <div className="p-6 space-y-6 md:space-y-8 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
              Create your account
            </h1>
            <form
              className="space-y-6 md:space-y-8"
              action="#"
              onSubmit={handleOnSubmit}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="enrollmentno"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Enrollment Number
                </label>
                <input
                  type="text"
                  name="enrollmentno"
                  id="enrollmentno"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your enrollment number"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="semester"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Semester
                </label>
                <select
                  name="semester"
                  id="semester"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                >
                  <option value="">Select your semester</option>
                  {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="mail"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="mail"
                  id="mail"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="id_card"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload ID Card (PNG or JPG)
                </label>
                <input
                  type="file"
                  name="id_card"
                  id="id_card"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/authenticate"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
