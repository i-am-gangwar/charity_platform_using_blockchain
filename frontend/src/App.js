import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Donate from "./pages/Donate";
import Alltxn from "./pages/Alltxn";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import Blogform from './pages/Blogform'
import Userprojects from "./pages/Userprojects";
function App() {
  const { token } = useSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="donate" element={<Donate />} />
            <Route path="alltxninfo" element={<Alltxn />} />
            <Route path="login" element={!token ? <LoginReg /> : <Navigate to="/dashboard" />} />
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />

          </Route>
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />

          <Route path="createblog" element={<Blogform />} />
          <Route path="userprojects" element={<Userprojects />} />
          <Route path="allblogs" element={<Donate />} />
          <Route path="totalfundraised" element={<Donate />} />


          <Route path="*" element={<h1>Error 404 Page not found !</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
