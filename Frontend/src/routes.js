import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Upload from "./components/UploadPage";
import Profile from "./components/Profile";
import TestPost from "./components/TestPost";

export const routes = [
    {path : '', component : Home  },
    {path: '/search',component: SearchPage},
    {path: '/login',component:Login},
    {path: '/register',component:Register},
    {path:'/upload',component:Upload},
    {path:'/profile',component:Profile},
    {path:'/testpost',component:TestPost},

];