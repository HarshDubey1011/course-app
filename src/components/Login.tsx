import {useState} from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {userState} from '../store/atoms/user.js';

const Login = () => {
	const [newmail,setNewMail] = useState('');
	const [password,setPassword] = useState('');
	const navigate = useNavigate();
	const setUser = useSetRecoilState(userState);

	console.log(setUser)
	return (
		<div style={{display: 'flex',flexDirection:'column',justifyContent: 'center',alignItems: 'center',minHeight: '80vh'}}>
			<Typography variant="h5" style={{marginBottom: '6px'}}>
  				Login
			</Typography>
      		<Card sx={{minWidth: 375,padding: 3}} style={{display: 'flex',justifyContent: 'center',flexDirection: 'column'}}>
      			<TextField id="outlined-basic" label="Email" variant="outlined" style={{marginBottom: '30px'}} onChange={(e) => setNewMail(e.target.value)} />
      			<TextField id="outlined-basic" label="Password" variant="outlined" style={{marginBottom: '30px'}} onChange={(e) => setPassword(e.target.value)} />
      			<Button variant="contained" onClick={()=>{
      				axios.post('http://localhost:3000/admin/login',null,{
      					headers: {
      						username: newmail,
      						password: password
      					}
      				}).then(res=>{
      					console.log(res.data);
      					localStorage.setItem('token',res.data.token)
						if(newmail!==null) {
							setUser({
								isLoading: false,
								userEmail: newmail
							})
						}
      					navigate('/');
      				}).catch(err=>console.error(err));
      			}}>Login</Button>
      		</Card>
      	</div>
		)
}

export default Login;