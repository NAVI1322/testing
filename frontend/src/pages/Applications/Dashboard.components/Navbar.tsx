import { useNavigate } from "react-router-dom";
import darklogo from "../../../assets/images/logos/darklogo.png";
import { BellRing, MoveUpRight, NotebookPen, Search, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/theme/modeToggle";
import { BackButton } from "@/components/majorComponents/BackButton";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center gap-2 p-3 border-b text-sm nhd:hidden">
        Open in App <MoveUpRight className="size-5" />
      </div>
      <div className="flex justify-between items-center px-5 py-3 border-b">
        <div className="flex items-center gap-2">
          {/* Back Button */}
         

          {/* Logo */}
          <a href="/">
            <img
              className="h-6 w-20 mr-2 mix-blend-difference dark:mix-blend-normal"
              src={darklogo}
              alt="Logo"
            />
          </a>

          {/* Search Input */}
        
        </div>

        {/* Right Section */}
        <div className="flex gap-10 items-center justify-evenly text-sm">
       <BackButton />
         
          <div className="hidden md:block">
            <ModeToggle />
          </div>
        
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default Navbar;