import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";


export function BackButton()
    {

        const navigate = useNavigate();
        return    <Button
        onClick={() => navigate(-1)} // Navigate to the previous page
       variant={"myButton"}
      >
        <span className="hidden md:block text-sm">Back</span>
      </Button>
    }