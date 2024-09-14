import React, { useEffect, useState } from "react";
import { api } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import emailjs from "@emailjs/browser";
import { addRequestData } from "../store/studentDataSlice";
import { toast } from "react-toastify";
import airospherelogo from "../assets/Airosphere_transparent.png";

const SignUp = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);
  const [file, setFile] = useState(null); // For ID card upload
  const [uploadProgress, setUploadProgress] = useState(0); // To handle ID card upload
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions

  useEffect(() => {
    if (data && data?.username) {
      Navigate("/dashboard");
    }
  }, [data, Navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please upload an ID card");

    setIsSubmitting(true); // Disable button while submitting

    // Firebase file upload
    const fileRef = ref(storage, `idCards/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
        setIsSubmitting(false); // Re-enable button on error
      },
      async () => {
        // Get download URL after upload completes
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Prepare the user data including the download URL of the ID card
        const userData = {
          username: e.target.username.value,
          name: e.target.name.value,
          semester: e.target.semester.value,
          enrollmentno: e.target.enrollmentno.value,
          mail: e.target.mail.value,
          idCardUrl: downloadURL, // Save the download URL from Firebase
        };

        try {
          // Save the user data to your backend (e.g., a database)
          const response = await api.post(
            "https://airosphere-ggits.vercel.app/requests",
            userData
          );
          console.log("User data saved successfully:", response.data);

          toast.success("Sign up request sent successfully!");
          var signupdata = {
            username: e.target.username.value,
            name: e.target.name.value,
            semester: e.target.semester.value,
            enrollmentno: e.target.enrollmentno.value,
            mail: e.target.mail.value,
            receiver: "airosphere01@gmail.com",
          };
          emailjs
            .send(
              import.meta.env.VITE_SERVICE_ID,
              import.meta.env.VITE_TEMPLATE_ID,
              signupdata,
              import.meta.env.VITE_PUBLIC_KEY
            )
            .then(
              (result) => {
                if (result.status === 200) {
                  handleCloseModal();
                  toast.success("Email sent successfully!", {
                    theme: "colored",
                  });
                }
              },
              (error) => {
                console.log(error);
                console.log(error.text);
              }
            );
          Navigate("/authenticate/signupsuccess");
        } catch (error) {
          console.error("Error saving user data:", error.message);
        } finally {
          setIsSubmitting(false); // Re-enable button after submit
        }
      }
    );
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto">
        <a
          href="#"
          className="flex items-center mb-6 text-3xl font-semibold text-gray-900"
        >
          <img
            className="w-24 h-24 mr-2 mt-2"
            src={airospherelogo}
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

              {/* Display upload progress */}
              {uploadProgress > 0 && (
                <div className="text-sm font-medium text-gray-700">
                  Upload Progress: {Math.round(uploadProgress)}%
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white ${
                  isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
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
