import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';
const Navbar = () => {
  const token = getToken('token')
  return <>
    <Box sx={{ flexGrow: 1.2 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant='h5' component="div" sx={{ flexGrow: 1 }}>charity fund tracker platform</Typography>
          <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? 'grey' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>
          <Button component={NavLink} to='/alltxninfo' style={({ isActive }) => { return { backgroundColor: isActive ? 'grey' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>All txn</Button>
          <Button component={NavLink} to='/donate' style={({ isActive }) => { return { backgroundColor: isActive ? 'grey' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Donor</Button>
          {token ? <Button component={NavLink} to='/dashboard' style={({ isActive }) => { return { backgroundColor: isActive ? 'grey' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Dashboard</Button>
            : <Button component={NavLink} to='/login' style={({ isActive }) => { return { backgroundColor: isActive ? 'grey' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Login/Registration</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  </>;
};

export default Navbar;
