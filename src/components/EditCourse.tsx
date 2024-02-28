import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import UpdateCard from './UpdateCard';
import {courseState} from '../store/atoms/course.js';
import {courseLoadingState} from '../store/selectors/course.js';
import {useSetRecoilState,useRecoilValue} from 'recoil';
import Loading from './Loading';


const EditCourse = () => {
	const {courseId} = useParams();
	//const [course,setCourse] = useState(null);
	const setCourse = useSetRecoilState(courseState);
	const isLoading = useRecoilValue(courseLoadingState);

	const getSingleCourse = () => {
		axios.get('http://localhost:3000/admin/courses/' + courseId,{
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		}).then(res=>{
			setCourse({
				isLoading: false,
				course: res.data.data
			});
		}).catch(err=>console.log(err))
	}

	useEffect(() => {
		getSingleCourse();
	},[])

	if(isLoading) {
		return <Loading />;
	}

	return (
		<div>
				<UpdateCard />
		</div>
		)
}

export default EditCourse;