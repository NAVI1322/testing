import { ThemeProvider } from '../../components/theme/themeProvider';
import MainBody from './Dashboard.components/MainBody';
import Navbar from './Dashboard.components/Navbar';

const Recruiter: React.FC = () => (
  <>
  <ThemeProvider>
    <Navbar />
    <MainBody />
  </ThemeProvider>
  </>
);

export default Recruiter;
