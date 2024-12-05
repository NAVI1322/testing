import darklogo from "../../../assets/images/logos/darklogo.png";
import { MoveUpRight } from 'lucide-react';
import { ContextMenu } from "@/components/ui/context-menu";
import { ContextMenuTrigger } from "@radix-ui/react-context-menu";
import { ModeToggle } from "@/components/theme/modeToggle";
import { ProfileContectMenu } from "@/pages/Dashboard/Dashboard.components/Profilemenu";


const Navbar = () => {
  return (
    <>
    <div className="fixed w-full bg-[#FFFFFF] dark:bg-[#0A0A0A] z-50">
    <div className='flex items-center justify-center gap-2 p-3 border-b text-sm nhd:hidden'>Open in App <MoveUpRight className='size-5'/></div>
      <div className='flex justify-between items-center px-5 py-3 border-b'>
        <div className='flex items-center gap-2'>
          <a href="/">
          <img className="h-6 w-20 mr-2 mix-blend-difference dark:mix-blend-normal" src={darklogo} alt="Logo"/>
          </a>
 
        
        </div>
        <div className='flex gap-10 items-center justify-evenly text-sm'>
          
         
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
      </div>
      <div className="h-28 nhd:h-16 w-full mb-5"></div>
    </>
  )
}

export default Navbar