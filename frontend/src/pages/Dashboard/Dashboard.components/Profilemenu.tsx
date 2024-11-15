import {
    ContextMenuContent,
    ContextMenuItem,

  } from "@/components/ui/context-menu"
import { useNavigate } from "react-router-dom"

  
export function ProfileContectMenu()
{

    const navigate = useNavigate();

    const handleLogout = () => {
      // Clear the local storage
      localStorage.removeItem("token");
      localStorage.removeItem("Token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
  
      // Optionally redirect to the login page or another page
      navigate("/login"); // Change the path as needed
    };
    return (
 
        <ContextMenuContent>
          <ContextMenuItem onClick={()=>navigate('/profile')}>Profile</ContextMenuItem>
          <ContextMenuItem onClick={handleLogout}>LogOut</ContextMenuItem>
        </ContextMenuContent>
      
      )
}