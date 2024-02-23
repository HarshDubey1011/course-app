import {useEffect,useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {userEmailState} from '../store/selectors/userEmail.js';
import {userLoadingState} from '../store/selectors/isUserLoading.js';
import { userState } from '../store/atoms/user.js';
import {useSetRecoilState,useRecoilValue} from 'recoil';
import Loading from './Loading';


const Navigation = () => {
	const navigate = useNavigate();
	const setUser = useSetRecoilState(userState)
	const isLoading = useRecoilValue(userLoadingState);
	const email = useRecoilValue(userEmailState);
	//console.log('email',email)

	if(isLoading) {
		return <Loading />
	}

if(email) {
	return (
		<Box sx={{ flexGrow: 1 }}>
	      <AppBar position="static">
	        <Toolbar>
	          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
	            <Button onClick={() => navigate('/')} style={{color: '#ffffff',fontSize: '20px'}}>CourseApp</Button>
	          </Typography>
	          <Button color="inherit" onClick={() => navigate('/courses/add')}>Add Course</Button>
	          <Button color="inherit" onClick={() => navigate('/courses')}>Courses</Button>
	          <Button color="inherit" onClick={() => {
	          localStorage.setItem('token',null);
	          setUser({
	          	isLoading: false,
	          	userEmail: null
	          })
	          navigate('/');
	          }}>Logout</Button>
	        </Toolbar>
	      </AppBar>
    </Box>
		)
} else {
	return (
		<Box sx={{ flexGrow: 1 }}>
	      <AppBar position="static">
	        <Toolbar>
	          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
	            <Button onClick={() => navigate('/')} style={{color: '#ffffff',fontSize: '20px'}}>CourseApp</Button>
	          </Typography>
	          <Button color="inherit" onClick={() => navigate('/signup')}>Signup</Button>
	          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
	        </Toolbar>
	      </AppBar>
    </Box>
		)
}


}

export default Navigation;