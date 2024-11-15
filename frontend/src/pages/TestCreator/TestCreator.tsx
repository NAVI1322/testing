import { ThemeProvider } from '../../components/theme/themeProvider';
import MainBody from './QuestionTemplates/MainBody';
import Navbar from './QuestionTemplates/Navbar';
import { useLocation } from 'react-router-dom';

// Define the props interface outside of the component
interface MainBodyProps {
    jobName: string;
    skills: string;
    description: string;
    location: string;
    benefits: string;
    ourValues: string;
    whyWorkWithUs: string;
    positionSummary: string;
    positionResponsibilities: string;
}

const TestCreator: React.FC = () => {
    // Use useLocation to retrieve the state passed from the previous component
    const location = useLocation();

    // Cast the state to the expected type
    const formdata = location.state?.formdata as MainBodyProps | undefined; // Access formdata safely

    return (
        <ThemeProvider>
            <div>
                <Navbar />
                {/* Check if formdata exists; if not, display an error message */}
                {formdata ? (
                    <MainBody formdata={formdata} />
                ) : (
                    <div className="text-center mt-5">
                        <h2 className="text-red-600 font-bold">Error: No job data available.</h2>
                        <p>Please <a href="/jobdescription" className='text-blue-700 hover:underline'>go back</a> and fill out the form.</p>
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};

export default TestCreator;