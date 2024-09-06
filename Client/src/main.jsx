import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import ReactDOM from "react-dom/client";
import Authenticate from "./components/Authenticate.jsx";
import Homepage from "./components/Homepage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Pyq from "./components/Menus/Academic/Pyq.jsx";
import Importantques from "./components/Menus/Academic/Importantques.jsx";
import Findteam from "./components/Menus/StudentConnect/Findteam.jsx";
import Askdoubt from "./components/Askdoubt.jsx";
import Peerprogramming from "./components/Peerprogramming.jsx";
import Clubs from "./components/Clubs.jsx";
import Webdev from "./components/Webdev.jsx";
import Appdev from "./components/Appdev.jsx";
import Ai from "./components/Ai.jsx";
import Dsa from "./components/Dsa.jsx";
import Branchupdates from "./components/Branchupdates.jsx";
import Notes from "./components/Menus/Academic/Notes.jsx";
import Websiteupdate from "./components/Websiteupdate.jsx";
import Mentorconnect from "./components/Mentorconnect.jsx";
import UpdatePassword from "./components/Updatepassword.jsx";
import ViewClub from "./components/ViewClub.jsx";
import UnitBox from "./components/Menus/Academic/UnitBox.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/authenticate",
        element: <Authenticate />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/academic/notes",
        element: <Notes />,
      },
      {
        path: "/academic/pyq",
        element: <Pyq />,
      },
      {
        path: "/academic/important",
        element: <Importantques />,
      },
      {
        path: "/studentconnect/findteammates",
        element: <Findteam />,
      },
      {
        path: "/studentconnect/askdoubt",
        element: <Askdoubt />,
      },
      {
        path: "studentconnect/findpeer",
        element: <Peerprogramming />,
      },
      {
        path: "/club",
        element: <Clubs />,
      },
      {
        path: "/resources/webdev",
        element: <Webdev />,
      },
      {
        path: "/resources/appdev",
        element: <Appdev />,
      },
      {
        path: "/resources/ai",
        element: <Ai />,
      },
      {
        path: "/resources/dsa",
        element: <Dsa />,
      },
      {
        path: "/updates/branch",
        element: <Branchupdates />,
      },
      {
        path: "/updates/website",
        element: <Websiteupdate />,
      },
      {
        path: "/mentorconnect",
        element: <Mentorconnect />,
      },
      {
        path: "/updatepassword",
        element: <UpdatePassword />,
      },
      {
        path: "/club/:clubname",
        element: <ViewClub />,
      },
      {
        path: "/:type/semester/:sem/:subcode",
        element: <UnitBox />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <RouterProvider router={appRouter} />
    {/* <BrowserRouter>
      <Routing />
    </BrowserRouter> */}
  </>
  // </React.StrictMode>,
);
