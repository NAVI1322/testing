
import { ContextMenu } from "@/components/ui/context-menu";
import { ContextMenuTrigger } from "@radix-ui/react-context-menu";
import { ModeToggle } from "@/components/theme/modeToggle";
import { ProfileContectMenu } from "./Context_Menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const router = useNavigate();
  return (
    <>

      <div className='flex  px-5 py-3 justify-between items-center p-5 border-b w-full'>

        <div>
          <Button variant={"link"} onClick={()=>router("/dashboard")}>Back</Button>
        </div>
         
       <div className="flex items-center space-x-7">
       <div className="hidden md:block">
          <ModeToggle />
          </div>
       
        <ContextMenu>
        <ContextMenuTrigger>
        <div>
           <img
          src="https://picsum.photos/400/400"
          alt=""
          className="rounded-full w-8 h-8"
         />
        </div>
         <ProfileContectMenu />
         </ContextMenuTrigger>
         </ ContextMenu >
        </div>
       </div>

    </>
  )
}

export default Navbar