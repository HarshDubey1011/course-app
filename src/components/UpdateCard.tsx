import {useState,useEffect} from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {courseTitleState,courseDescriptionState,coursePriceState,courseImageState} from '../store/selectors/course.js';
import {courseState} from '../store/atoms/course.js';
import {useRecoilValue,useRecoilState} from 'recoil';

const UpdateCard = () => {
	const [courseDetails,setCourse] = useRecoilState(courseState)
	
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    // Update state once courseDetails is available
    if (courseDetails.course) {
      setTitle(courseDetails.course.title);
      setDescription(courseDetails.course.description);
      setImage(courseDetails.course.imageLink);
      setPrice(courseDetails.course.price);
    }
  }, [courseDetails]);
	const cardTitle = useRecoilValue(courseTitleState);
	const cardDescription = useRecoilValue(courseDescriptionState)
	const cardPrice = useRecoilValue(coursePriceState)
	const cardImage = useRecoilValue(courseImageState)
   

	console.log(description)
	return (
	 <div>
	   <div style={{marginTop: '10px'}}>
	 	<div style={{display: 'flex',justifyContent: 'space-between'}}>
	 		<Card sx={{minWidth: 375,padding: 3}} style={{display: 'flex',justifyContent: 'center',flexDirection: 'column'}}>
      			<TextField id="outlined-basic" value={title} label="Title" variant="outlined" style={{marginBottom: '30px'}} onChange={(e) => setTitle(e.target.value)} />
      			<TextField id="outlined-basic" value={description} label="Description" variant="outlined" style={{marginBottom: '30px'}} onChange={(e) => setDescription(e.target.value)} />
      			<TextField id="outlined-basic" value={price} label="Price" variant="outlined" style={{marginBottom: '30px'}} onChange={(e) => setPrice(e.target.value)} />
      			<TextField id="outlined-basic" value={image} label="Image" variant="outlined" style={{marginBottom: '30px'}} onChange={(e) => setImage(e.target.value)} />

      			<Button variant="contained" onClick={()=>{
      				axios.put('http://localhost:3000/admin/courses/' + courseDetails.course._id,{
      					title: title,
      					description: description,
      					price: price,
      					imageLink: image
      				},{
      					headers: {
      						'Content-type':'application/json',
      						'Authorization': 'Bearer ' + localStorage.getItem('token')
      					}
      				}).then(res=>{
      					console.log('data',res.data);
      					setCourse({
      						isLoading: false,
      						course: res.data.course
      					})
      				}).catch(err=>console.error(err));
      			}}>Edit</Button>
      		</Card>
			<Card sx={{ minWidth: 345,maxWidth: 400,height: 300 }} >
      			<CardMedia
			        sx={{ height: 140 }}
			        image={cardImage}
			        title={cardTitle}
			      />
			      <CardContent>
			        <Typography gutterBottom variant="h5" component="div">
			          {cardTitle}
			        </Typography>
			        <Typography variant="body2" color="text.secondary">
			          {cardDescription}
			        </Typography>
			        <Typography variant="h6" color="text.primary">
			          &#8377;{cardPrice}
			        </Typography>
			      </CardContent>
     		</Card>
	 	</div>	 
	 </div>
	</div>
		)
}

export default UpdateCard;