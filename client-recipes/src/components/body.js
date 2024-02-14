import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Signin from "./signin";
import HomePage from "./homePage"
import Entrance from "./entrance"

export default function Body()
{
    <Routes>
    <Route path="/" element={<Entrance/>}/>
    <Route path="/login" element={<Login />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/homePage" element={<HomePage/>} />
    {/* <Route path="/logout" element={<Entrance/>} /> */}
    {/* <Route path="/about" element={<About />} /> */}
    {/* <Route path="/User" element={<UsersGet />} /> */}
    </Routes>
}