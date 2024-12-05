import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/SignUp/Signup'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import ProfilePage from './pages/Profile/ProfilePage'
import HomePage from './pages/Homepage/Homepage'
import TestCreator from './pages/TestCreator/TestCreator'
import Recruiter from './pages/Recruiter/Recruiter'
import Applications from './pages/Applications/Applications'
import JobDescriptionPage from './pages/JobApplications/Jobdesc'
import Rest from './pages/Test/Rest'
import ApplyFormPage from './pages/Dashboard/Dashboard.components/ApplyFormPage'
import QuizResults from './pages/quizResult/QuizResult'
import R_Jobdetails from './pages/R_jobdescription/R_Jobdetails'
import AccessDenied from './components/majorComponents/access-denied'

function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/testcreator" element={<TestCreator />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/recruiter" element={<Recruiter/>} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/rest" element={<Rest/>} />
        <Route path="/description" element={<JobDescriptionPage/>} />
        <Route path="/apply" element={<ApplyFormPage/>} />
        <Route path="/quiz-results" element={<QuizResults/>} />
        <Route path="/create-job" element={<R_Jobdetails/>} />
        <Route path="/access-denied" element={<AccessDenied />} />

      </Routes>
    </>
  )
}

export default App