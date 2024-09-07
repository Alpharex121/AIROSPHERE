import React, { useEffect } from "react";
import { api } from "../utils/constant";
import { addUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import getUser from "../utils/getUser";

const Authenticate = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const data = useSelector((store) => store.user);
  console.log(data);
  useEffect(() => {
    if (data) {
      if (data.username) Navigate("/dashboard");
    }
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = e.target.username.value;
      const password = e.target.password.value;
      const data = await api.post("http://localhost:3000/authenticate", {
        username,
        password,
      });
      if (data.status === 200 && data.username !== null) {
        const currUser = data.data;
        const userData = {
          username: currUser.username,
          enrollmentno: currUser.enrollmentno,
          name: currUser.name,
          semester: currUser.semester,
          mail: currUser.mail,
          role: currUser.role,
        };
        dispatch(addUser(userData));
        Navigate("/dashboard");
      } else {
        Navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      Navigate("/");
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto ">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <img
            className="w-8 h-8 mr-2 "
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          AIROSPHERE
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleOnSubmit}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your username"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-black bg-primary-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-primary-700 border border-black"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <button
                  onClick={() => Navigate("/authenticate/signup")}
                  href="#"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authenticate;
