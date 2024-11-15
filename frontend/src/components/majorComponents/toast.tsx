import { toast } from "sonner";


// interface Toast{
// title:String;
// desc:String;
// label:String;
// }

export function Toast(title:string,desc?:any,label?:string)
{
    return ( 
        toast(title, {
        description: desc,
        action: {
          label: label,
          onClick: () => console.log("Undo"),
        },
      }))
}