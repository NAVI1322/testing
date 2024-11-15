import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { AboutModal } from "./Modal_editProfile";
import { Button } from "@/components/ui/button";

const RightProfile = ({
  email,
  firstName,
  lastName
}: {
  email: string;
  firstName?: string; // optional
  lastName?: string;  // optional
}) => {
  const userEmail = email;

  return (
    <div className="flex md:w-[40%] p-4 dark:bg-black bg-white">
      <div className="space-y-5 font-medium">
        <div className="rounded-full">
          <img className="rounded-full w-20 h-20" src="https://picsum.photos/400/400" alt="Profile picture" />
        </div>
        <div>
          <span className="text-lg">{userEmail}</span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"link"} className="hover:text-green-500 text-green-700">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <AboutModal email={userEmail} firstName={firstName ?? ""} lastName={lastName ?? ""} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RightProfile;