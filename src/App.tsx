import {useState,useEffect} from 'react';
import {RecoilRoot,useSetRecoilState} from 'recoil';
import {Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import Courses from './components/Courses';
import EditCourse from './components/EditCourse';
import Signup from './components/Signup';
import Login from './components/Login';
import AddCourse from './components/AddCourse';
import axios from 'axios';
import {userState} from './store/atoms/user.js';


function App() {
  return (
    <RecoilRoot>
      <div>
        <Navigation />
        <InitUser />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/courses/add' element={<AddCourse />} />
            <Route path='/courses/:courseId' element={<EditCourse />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
      </div>
    </RecoilRoot>
  )
}

function InitUser() {
    const setUser = useSetRecoilState(userState);

    const init = async() => {
        try {
            const response = await axios.get('http://localhost:3000/admin/me', {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (response.data.email) {
                setUser({
                    isLoading: false,
                    userEmail: response.data.email
                })
            } else {
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }
        } catch (e) {

            setUser({
                isLoading: false,
                userEmail: null
            })
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>
}

export default App
