import { Gamepad, Star, UserCheck, Users, Award, Lock } from "lucide-react";
import { BorderBeamDemo } from "@/components/majorComponents/BorderBeam";

import user1 from "../assets/images/profile-pictures/user1.jpg";
import user2 from "../assets/images/profile-pictures/user2.jpg";
import user3 from "../assets/images/profile-pictures/user3.jpg";
import user4 from "../assets/images/profile-pictures/user4.jpg";
import user5 from "../assets/images/profile-pictures/user5.jpg";
import user6 from "../assets/images/profile-pictures/user6.jpg";
import illustration1 from "../assets/images/timeline-illustrations/1.jpeg";
import illustration2 from "../assets/images/timeline-illustrations/2.jpeg";
import illustration3 from "../assets/images/timeline-illustrations/3.jpeg";
import illustration4 from "../assets/images/timeline-illustrations/4.jpeg";
import illustration5 from "../assets/images/timeline-illustrations/5.jpeg";
import illustration6 from "../assets/images/timeline-illustrations/6.jpeg";
import illustration7 from "../assets/images/timeline-illustrations/6.jpeg";
export const projects = [
  {
    title: "Live Interviews",
    description: "Find the perfect match and interview live directly through our platform.",
    link: "https://microsoft.com"
  },
  {
    title: "Skills Testing",
    description: "Take the guesswork out of training and hiring. Choose from 500 standard job-based and subject-based tests.",
    link: "https://microsoft.com"
  },
  {
    title: "Background Checks",
    description: "Reduce your time to hire by 80% and get results in minutes.",
    link: "https://microsoft.com"
  },
  {
    title: "Job Matching Algorithm",
    description: "Utilize our AI-driven algorithm to match candidates with jobs more efficiently.",
    link: "https://microsoft.com"
  },
  {
    title: "Virtual Onboarding",
    description: "Streamline the onboarding process with our virtual onboarding tool.",
    link: "https://microsoft.com"
  },
  {
    title: "Performance Tracking",
    description: "Monitor employee performance with our comprehensive tracking system.",
    link: "https://microsoft.com"
    },
];
export const reviews = [
  {
    name: "Facebook",
    username: "@facebook",
    body: "Connecting people across the globe.",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  },
  {
    name: "Apple",
    username: "@apple",
    body: "Innovating the future of technology.",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Amazon",
    username: "@amazon",
    body: "Delivering everything from A to Z.",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Netflix",
    username: "@netflix",
    body: "Bringing you the best entertainment.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Google",
    username: "@google",
    body: "Organizing the world's information.",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Tesla",
    username: "@tesla",
    body: "Accelerating the world's transition to sustainable energy.",
    img: "https://www.svgrepo.com/show/306845/tesla.svg",
  },
];
export const sections = [
  { left: 'Your Advantage', right: 'Awaits' },
  { left: 'Our', right: 'Partners' },
  { left: 'How it', right: 'Works?' },
  { left: 'Employer', right: 'Services' },
  { left: 'Game', right: 'Features' },
];

export const navItems = [
  { label: "How it Works", href: "#" },
  { label: "Game Features", href: "#" },
  { label: "Pricing Plans", href: "#" },
  { label: "Community", href: "#" },
];

type TimelineEntry = {
  title: string;
  content: React.ReactNode;
};
export const timelineData: TimelineEntry[] = [
  {
    title: "Job Seeker's Profile Creation",
    content: (
      <p className=''>
        <div className='max-w-sm m-auto'>
          Job seekers begin by creating a comprehensive profile on the Guhuza platform. This includes detailed information about their skills, qualifications, work experience, education, and career aspirations. Users are encouraged to upload their resumes and provide additional information to enhance their visibility in the job market.
        </div>
        <div className='my-10'>
        <BorderBeamDemo image={illustration1} />

        </div>
      </p>
    ),
  },
  {
    title: "AI Matching Technology Activation",
    content: (
      <p className=''>
        <div className='max-w-sm m-auto'>
        Guhuza's advanced AI technology analyzes the job seeker’s profile against thousands of job listings on the platform. The AI evaluates the skills required for each position and ranks job matches based on relevance and alignment with the candidate's experience and qualifications. This process is designed to ensure that job seekers only see positions that are a good fit for their profiles.
      </div>
      <div className='my-10'>
        
        <BorderBeamDemo image={illustration2} />
      </div>
        
      </p>
    ),
  },
  {
    title: "Instant Job Matching and Connection",
    content: (
      <p className=''><div className='max-w-sm m-auto'>

        Once a suitable match is identified, Guhuza's system instantly connects job seekers with potential employers. This eliminates the time-consuming process of applying to multiple positions, allowing candidates to focus on preparing for interviews. Job seekers receive real-time notifications about matches and can easily review job details.
      </div>
  <div className='my-10'>

        <BorderBeamDemo image={illustration3} />
  </div>
      </p>
    ),
  },
  {
    title: "Live Interviews Through the Platform",
    content: (
      <p className=''><div className='max-w-sm m-auto'>

        Employers can conduct live interviews with matched candidates directly through the Guhuza platform. The built-in video conferencing tools ensure a smooth interview process, allowing employers to assess candidates in real-time. Job seekers can showcase their skills and qualifications, making the interview more personal and interactive.
      </div>
  <div className='my-10'>

        <BorderBeamDemo image={illustration4} /> {/* Replace with appropriate user image */}
  </div>
      </p>
    ),
  },
  {
    title: "Automated Hiring Process Management",
    content: (
      <p className=''><div className='max-w-sm m-auto'>

        Guhuza automates the entire hiring process, from job openings to final job offers. The platform manages candidate screening, background checks, and necessary verifications in a streamlined manner. This ensures that both employers and job seekers can focus on what matters most: finding the right match without unnecessary delays or complications.
      </div>
  <div className='my-10'>

        <BorderBeamDemo image={illustration5} /> {/* Replace with appropriate user image */}
  </div>
      </p>
    ),
  },
  {
    title: "Quick Job Start in Less than 24 Hours",
    content: (
      <p className=''><div className='max-w-sm m-auto'>

        After successful interviews and all required checks, candidates can begin their new jobs in less than 24 hours. This rapid turnaround time allows businesses to fill positions quickly, while job seekers can start their careers without long waiting periods. Guhuza's efficiency helps foster a dynamic job market where opportunities are seized swiftly.
      </div>
  <div className='my-10'>

        <BorderBeamDemo image={illustration6} /> {/* Replace with appropriate user image */}
  </div>
      </p>
    ),
  },
  {
    title: "Continuous Feedback and Improvement",
    content: (
      <p className=''><div className='max-w-sm m-auto'>

        After the hiring process, both employers and job seekers are encouraged to provide feedback on their experiences. This feedback is crucial for Guhuza to continually refine and improve its matching algorithm and user experience. By analyzing this data, Guhuza aims to enhance the overall effectiveness of the platform and ensure the highest satisfaction for both job seekers and employers.
      </div>
  <div className='my-10'>

        <BorderBeamDemo image={illustration7} /> {/* Replace with appropriate user image */}
  </div>
      </p>
    ),
  },
];
export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "The Guhuza Job-Seeking Game has transformed how we view recruitment. The engaging elements make job-seeking less daunting and more interactive.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "We love the competitive aspects! The game brings fun into the job search while still focusing on real skills and career progression.",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Guhuza’s game is an innovative tool that connects JOB_SEEKERs and companies in a unique, interactive way. Highly recommend it!",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "The gamification of recruitment is a game-changer! The leaderboards and achievements motivate users to reach their career goals faster.",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "The strong network effects built into the game make Guhuza a powerful platform for expanding our hiring reach organically.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "Guhuza’s approach brings a fresh perspective to recruitment, making it an enjoyable and rewarding experience for everyone involved.",
  },
];


export const features = [
  {
    icon: <Gamepad />,
    text: "Interactive Job-Seeking Challenges",
    description: "Engage with resume-building tasks, interview simulations, and career quizzes to level up your job-seeking skills.",
  },
  {
    icon: <Star />,
    text: "Referral Bonuses & Rewards",
    description: "Invite friends and earn referral bonuses, badges, and rewards for expanding the Guhuza network.",
  },
  {
    icon: <Users />,
    text: "Career Leaderboards",
    description: "Compete with other users on leaderboards, achieve high scores, and showcase your career progression.",
  },
  {
    icon: <UserCheck />,
    text: "Daily Challenges & Streaks",
    description: "Keep your momentum going with daily challenges, streaks, and seasonal events to stay motivated.",
  },
  {
    icon: <Lock />,
    text: "Social Sharing Options",
    description: "Share your achievements and progress with friends on social media to grow the Guhuza community.",
  },
  {
    icon: <Award />,
    text: "Analytics & Insights",
    description: "Track your performance, see where you stand in the community, and use insights to improve your career strategies.",
  },
];

export const checklistItems = [
  {
    title: "Referral Bonuses for Network Expansion",
    description: "Increase your impact by referring friends and earning rewards for each successful connection.",
  },
  {
    title: "Showcase Skills Through Interactive Games",
    description: "Prove your worth by participating in skill-based challenges that demonstrate your qualifications to potential employers.",
  },
  {
    title: "Compete and Collaborate with Peers",
    description: "Make the job search fun by competing on leaderboards and collaborating with peers for team achievements.",
  },
  {
    title: "Track Your Career Growth",
    description: "Monitor your progress, complete challenges, and earn badges that highlight your career journey.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Access to Basic Challenges",
      "Profile Customization",
      "Community Access",
      "Social Sharing",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Access to Advanced Challenges",
      "Personalized Career Coaching",
      "Enhanced Analytics & Insights",
      "Referral Bonuses",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Corporate Integration",
      "Team Collaboration Tools",
      "Custom Career Paths",
      "Full Analytics Suite",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "AI Matching Guide" },
  { href: "#", text: "JOB_SEEKER Tutorials" },
  { href: "#", text: "Employer Resources" },
];

export const platformLinks = [
  { href: "#", text: "Guhuza Features Overview" },
  { href: "#", text: "Supported Industries" },
  { href: "#", text: "AI & Automation Benefits" },
 
];

export const communityLinks = [
  { href: "#", text: "Success Stories" },
  { href: "#", text: "Employer Meetups" },
  { href: "#", text: "Industry Webinars" },
];
