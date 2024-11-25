import { ThemeProvider } from '../../components/theme/themeProvider';
import MainBody from './QuestionTemplates/MainBody';
import Navbar from './QuestionTemplates/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface MainBodyProps {
  jobName: string;
  jobDescription: string;
  benefits: string;
  ourValues: string;
  positionSummary: string;
  positionResponsibilities: string;
  skillsRequired: string;
  whyWorkWithUs: string;
  wageRate: string;
}

const TestCreator: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get role from localStorage
  const role = localStorage.getItem("role");
  
  // Get form data from the state passed via location
  const formdata = location.state?.formData as MainBodyProps | undefined; 

  // Redirect to "Access Denied" page if role is not allowed
  useEffect(() => {
    if (role !== "RECRUITER") {
      navigate("/access-denied");
    }
  }, [role, navigate]);

  // Debugging logs
  console.log(formdata);

  return (
    <ThemeProvider>
      <div>
        <Navbar />
        {/* Show the main body or error message if formdata is missing */}
        {formdata ? (
          <MainBody formData={formdata} />
        ) : (
          <div className="text-center mt-5">
            <h2 className="text-red-600 font-bold">Error: No job data available.</h2>
            <p>Please <a href="/jobdescription" className="text-blue-700 hover:underline">go back</a> and fill out the form.</p>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default TestCreator;