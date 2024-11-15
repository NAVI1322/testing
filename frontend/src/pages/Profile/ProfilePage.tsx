import Rightprofile from "./ProfileElements/Right_profile";
import { Button } from "../../components/ui/button";
import Navbar from "./ProfileElements/Nav";
import { useEffect, useState } from "react";
import { TextareaForm } from "./ProfileElements/TextArea";
import { FetchUserProfile } from "@/hooks/getDetails";
import { useNavigate } from "react-router-dom";
import { Toast } from "@/components/majorComponents/toast";

// Define UserProfile type
type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  // Add other fields as necessary
};

const ProfilePage = () => {
  const [aboutSection, setAboutSection] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null); // Initial state is null
  const [Urole, setUrole] = useState("");

  const router = useNavigate();
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email") || ""; // Default to empty string if null

  useEffect(() => {
    const fetchProfile = async () => {
      if (role && email) {
        try {
          const response = await FetchUserProfile(email, role);
          if (response.data.role !== role) {
            router("/login");
            Toast("Error", "Something Went Wrong");
          } else {
            setProfile(response.data.userDetails);
            setUrole(response.data.role);
          }
        } catch (error) {
          console.error(error);
          Toast("Error", "Failed to fetch profile");
        }
      } else {
        router("/login");
        Toast("Error", "Create an Account First");
      }
    };

    fetchProfile();
  }, [role, email, router]);

  const ProfileNav = () => (
    <nav className="border-gray-200">
      <ul className="flex space-x-4">
        <li>
          <div
            onClick={() => setAboutSection(true)}
            className={
              aboutSection
                ? "font-bold border-b-2 border-black pb-2 hover:cursor-pointer"
                : "text-gray-500 hover:text-black pb-2 hover:cursor-pointer"
            }
          >
            Home
          </div>
        </li>
        <li>
          <div
            onClick={() => setAboutSection(false)}
            className={
              aboutSection
                ? "text-gray-500 hover:text-black pb-2 hover:cursor-pointer"
                : "font-bold border-b-2 border-black pb-2 hover:cursor-pointer"
            }
          >
            About
          </div>
        </li>
      </ul>
    </nav>
  );

  return (
    <div>
      <Navbar />
      <div className="flex md:flex-row flex-col-reverse mx-auto w-[80%] mt-16">
        {aboutSection ? (
          <div className="w-full md:w-[60%] py-5 ">
            <div className="flex items-center">
              {/* Conditional rendering based on profile state */}
              {profile ? (
                <div className="text-2xl md:text-5xl font-bold">
                  {profile.firstName} {profile.lastName}{" "}
                  <span className="text-sm">
                    {Urole === "JOB_SEEKER" ? "(Employee)" : "(Recruiter)"}
                  </span>
                </div>
              ) : (
                <div className="text-2xl md:text-5xl font-bold">Loading...</div>
              )}
            </div>
            <div className="mt-6 md:mt-12">
              <ProfileNav />
            </div>
            <div className="mt-6 md:mt-12">
              <div className="space-x-5 flex mt-8">
                <Button variant="outline">Archives</Button>
                <Button variant="ghost">History</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {/* Add your post items here */}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full md:w-[60%] dark:bg-black bg-white rounded-lg">
            <div className="flex justify-between items-center">
              <div className="text-2xl md:text-5xl font-bold text-gray-800 dark:text-white">
                {profile ? (
                  <>
                    {profile.firstName} {profile.lastName}{" "}
                    <span className="text-sm">
                      {Urole === "JOB_SEEKER" ? "(Employee)" : "(Recruiter)"}
                    </span>
                  </>
                ) : (
                  "Loading..."
                )}
              </div>
            </div>
            <div className="mt-6 md:mt-12">
              <ProfileNav />
            </div>
            <div className="mt-6 md:mt-12">
              <TextareaForm />
            </div>
          </div>
        )}
        <div className="w-full md:w-[30%] py-5">
          <Rightprofile
            email={email} // Use default value for email
            firstName={profile?.firstName ?? ""} // Use empty string if null
            lastName={profile?.lastName ?? ""} // Use empty string if null
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;