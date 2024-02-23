import {useState} from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

interface Course {
	_id: string,
	title: string,
	description: string,
	price: string
	published: boolean
}


const AddCourse = () => {
	const [title,setTitle] = useState('');
	const [description,setDescription] = useState('');
	const [price,setPrice] = useState(0);
	const [imageLink,setImageLink] = useState('');

	return (
		<div style={{display: 'flex',flexDirection:'column',justifyContent: 'center',alignItems: 'center',minHeight: '80vh'}}>
			<Typography variant="h5" style={{marginBottom: '6px'}}>
  				AddCourse
			</Typography>
      		<Card sx={{minWidth: 375,padding: 3}} style={{display: 'flex',justifyContent: 'center',flexDirection: 'column'}}>
      			<TextField id="outlined-basic" label="Title" variant="outlined" style={{marginBottom: '30px'}} onChange={(e) => setTitle(e.target.value)} />
      			<TextField id="outlined-basic" label="Description" variant="outlined" style={{marginBottom: '30px'}} onChange={(e) => setDescription(e.target.value)} />
      			<TextField id="outlined-basic" label="Price" variant="outlined" style={{marginBottom: '30px'}} onChange={(e) => setPrice(e.target.value)} />
      			<TextField id="outlined-basic" label="Image" variant="outlined" style={{marginBottom: '30px'}} onChange={(e) => setImageLink(e.target.value)} />

      			<Button variant="contained" onClick={()=>{
      				axios.post('http://localhost:3000/admin/courses',{
      					title: title,
      					description: description,
      					price: price,
      					imageLink: imageLink
      				},{
      					headers: {
      						'Content-type':'application/json',
      						'Authorization': 'Bearer ' + localStorage.getItem('token')
      					}
      				}).then(res=>{
      					console.log(res.data);
      				}).catch(err=>console.error(err));
      			}}>ADD</Button>
      		</Card>
      	</div>
		)
}

export default AddCourse;