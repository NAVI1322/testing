import darklogo from "../../../assets/images/logos/darklogo.png";
import { BellRing, MoveUpRight, NotebookPen, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/theme/modeToggle";

const Navbar = () => {
  return (
    <>
    <div className='flex items-center justify-center gap-2 p-3 border-b text-sm nhd:hidden'>Open in App <MoveUpRight className='size-5'/></div>
      <div className='flex justify-between items-center px-5 py-3 border-b'>
        <div className='flex items-center gap-2'>
          <a href="/">
          <img className="h-6 w-20 mr-2 mix-blend-difference dark:mix-blend-normal" src={darklogo} alt="Logo"/>
          </a>
 
          <div className='hidden ffty:flex w-[250px] h-10 bg-transparent dark:bg-gray-900/50 border border-gray-200/30 dark:border rounded-full  justify-center items-center gap-2'>
            <Search className=' size-5' /><input type="text" className='bg-transparent w-[200px] focus:outline-none text-sm' placeholder='Search...' />
          </div>
        </div>
        <div className='flex gap-10 items-center justify-evenly text-sm'>
            <Search className='block ffty:hidden size-5'/>
          <div className='sty:flex gap-2 items-center hidden'>
        <NotebookPen className='size-5' />
          <div>Write</div>
          </div>
          <div className="hidden md:block">
          <ModeToggle />
          </div>
        <BellRing className='size-5'/>
          <Avatar className='size-8'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  )
}

export default Navbar