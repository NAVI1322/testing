import AccessDenied from '@/components/majorComponents/access-denied';
import { ThemeProvider } from '../../components/theme/themeProvider';
import MainBody from './Dashboard.components/MainBody';
import Navbar from './Dashboard.components/Navbar';


const Recruiter: React.FC = () => {
  const role = localStorage.getItem("role"); // Fetch role from localStorage

  // Check if the user is not a Recruiter
  if (role !== "RECRUITER") {
    return <AccessDenied />;
  }

  return (
    <ThemeProvider>
      <Navbar />
      <MainBody />
    </ThemeProvider>
  );
};

export default Recruiter;