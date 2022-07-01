import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unsetUserToken } from '../features/authSlice';
import DashboardNavbar from './DashboardNavbar';
// this page is showing dashboard of user
const Dashboard = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(unsetUserToken({ token: null }))
    dispatch(unsetUserInfo({ name: "", email: "" }))
    removeToken('token')
    navigate('/login')
  }
  const token = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(token)
  const [userData, setUserData] = useState({
    email: "123@gmail.com",
    name: "user"
  })
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.user.email,
        name: data.user.name,
      })
    }
  }, [data, isSuccess])

  const dispatch = useDispatch()
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.user.email,
        name: data.user.name
      }))
    }
  }, [data, isSuccess, dispatch])

  return (
    <>
      <div style={{ marginTop: "-8px", marginLeft: "-20px", color: "white" }}>
        <ul style={{ listStyleType: "none", marginTop: "0px", marginBottom: "0px", height: "75px", overflow: " hidden", fontSize: "25px", backgroundColor: "black" }} >
          <li style={{ float: "left", marginTop: "20px" }} ><span>  Dashboard</span></li>
          <li style={{ float: "left" }} > <DashboardNavbar /></li>
          <li style={{ float: "right", marginTop: "20px", marginRight: "20px" }}>
            <Button variant='contained' color="warning" onClick={handleLogout} >Logout</Button>
          </li>
          <li style={{ float: "right", marginTop: "20px", marginRight: "150px" }}><span >user: {userData.name} </span></li>
        </ul>
      </div>
    </>
  );
}
export default Dashboard;
