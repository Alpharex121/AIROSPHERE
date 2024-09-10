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
import Peerprogramming from "./components/Menus/StudentConnect/FindPeer.jsx";
import Askdoubt from "./components/Menus/StudentConnect/Askdoubt.jsx";
import Clubs from "./components/Menus/Clubs/Clubs.jsx";
import Webdev from "./components/Webdev.jsx";
import Appdev from "./components/Appdev.jsx";
import Ai from "./components/Ai.jsx";
import Dsa from "./components/Dsa.jsx";
import Branchupdates from "./components/Menus/Updates/Branchupdates.jsx";
import Notes from "./components/Menus/Academic/Notes.jsx";
import Websiteupdate from "./components/Menus/Updates/Websiteupdate.jsx";
import UpdatePassword from "./components/Updatepassword.jsx";
import ViewClub from "./components/Menus/Clubs/ViewClub.jsx";
import UnitBox from "./components/Menus/Academic/UnitBox.jsx";
import Profile from "./components/Profile.jsx";
import Students from "./components/Menus/Manage/Students.jsx";
import AddStudent from "./components/Menus/Manage/AddStudent.jsx";
import ViewRequest from "./components/Menus/Manage/ViewRequest.jsx";
import EditUserForm from "./components/Forms/EditUserForm.jsx";
import SignUp from "./components/SignUp.jsx";
import SignUpSuccess from "./components/SignUpSuccess.jsx";
import AddMemberForm from "./components/Forms/ClubAddMemberForm.jsx";
import ClubAddMemberForm from "./components/Forms/ClubAddMemberForm.jsx";
import ClubAddNotificationForm from "./components/Forms/ClubAddNotificaitonForm.jsx";
import AddEventForm from "./components/Forms/ClubAddEventForm.jsx";
import AddClubForm from "./components/Forms/AddClubForm.jsx";
import AddUpdatesForm from "./components/Forms/AddUpdatesForm.jsx";
import AddAcademicForm from "./components/Forms/AddAcademicForm.jsx";
import AddPeerRequestForm from "./components/Forms/AddPeerRequestForm.jsx";
import FindTeamForm from "./components/Forms/FindTeamForm.jsx";

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
        path: "/profile",
        element: <Profile />,
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
        path: "/updatepassword/:username",
        element: <UpdatePassword />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/club/:clubname",
        element: <ViewClub />,
      },
      {
        path: "/:type/semester/:sem/:subcode",
        element: <UnitBox />,
      },
      {
        path: "/manage/students",
        element: <Students />,
      },
      {
        path: "/manage/addstudent",
        element: <AddStudent />,
      },
      {
        path: "/manage/viewrequest",
        element: <ViewRequest />,
      },
      {
        path: "/edituser/:username/:userid",
        element: <EditUserForm />,
      },
      {
        path: "/authenticate/signup",
        element: <SignUp />,
      },
      {
        path: "/authenticate/signupsuccess",
        element: <SignUpSuccess />,
      },
      {
        path: "/addmember/:clubname",
        element: <ClubAddMemberForm />,
      },
      {
        path: "/addnotification/:clubname",
        element: <ClubAddNotificationForm />,
      },
      {
        path: "/addevent/:clubname",
        element: <AddEventForm />,
      },
      {
        path: "/addclub",
        element: <AddClubForm />,
      },
      {
        path: "/addupdates",
        element: <AddUpdatesForm />,
      },
      {
        path: "/addacademic",
        element: <AddAcademicForm />,
      },
      {
        path: "/studentconnect/postpeerrequest",
        element: <AddPeerRequestForm />,
      },
      {
        path: "/studentconnect/newfindteamrequest",
        element: <FindTeamForm />,
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
