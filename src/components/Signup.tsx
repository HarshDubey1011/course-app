import {useState} from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {userState} from '../store/atoms/user.js';

const Signup = () => {
	const navigate = useNavigate();
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const setUser = useSetRecoilState(userState);
	return (
		<div style={{display: 'flex',flexDirection:'column',justifyContent: 'center',alignItems: 'center',minHeight: '80vh'}}>
			<Typography variant="h5" style={{marginBottom: '6px'}}>
  				Signup
			</Typography>
      		<Card sx={{minWidth: 375,padding: 3}} style={{display: 'flex',justifyContent: 'center',flexDirection: 'column'}}>
      			<TextField id="outlined-basic" label="Email" variant="outlined" style={{marginBottom: '30px'}} onChange={(e) => setEmail(e.target.value)} />
      			<TextField id="outlined-basic" label="Password" variant="outlined" style={{marginBottom: '30px'}} onChange={(e) => setPassword(e.target.value)} />
      			<Button variant="contained" onClick={()=>{
      				axios.post('http://localhost:3000/admin/signup',{
      					username:email,
      					password: password
      				},{
      					headers: {
      						'Content-type':'application/json',
      					}
      				}).then(res=>{
      					console.log(res.data);
      					localStorage.setItem('token',res.data.token)
      					setUser({
      						isLoading: false,
      						userEmail: email
      					})
      					navigate('/login');
      				}).catch(err=>console.error(err));
      			}}>Signup</Button>
      		</Card>
      	</div>
		)
}

export default Signup;