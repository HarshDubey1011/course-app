import {useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

interface courseType {
  _id: string,
	title: string,
	description: string,
	price: string,
	imageLink: string,
}



const Courses = () => {
	const [data,setData] = useState([]);
	const navigate = useNavigate();
	const getCourse = () => {
		axios.get('http://localhost:3000/admin/courses',{
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		}).then(res=>{
		
			setData(res.data.course)
		}).catch(error=>console.log(error));
	}

	useEffect(() => {
		getCourse();
	},[])

 return (
	<div style={{display: "flex", flexWrap: "wrap", justifyContent: "center",marginTop: '20px',}}>
	{data.map((course) => (
	<Card sx={{ minWidth: 345 }} style={{marginRight: '15px',marginBottom: '15px'}}>
      <CardMedia
        sx={{ height: 140 }}
        image={(course as courseType).imageLink}
        title={(course as courseType).title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {(course as courseType).title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {(course as courseType).description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          &#8377;{(course as courseType).price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" onClick={() => {
        	navigate('/courses/' + (course as courseType)._id)
        }}>Edit</Button>
      </CardActions>
    </Card>
	))}
	</div>
 )
}

export default Courses;