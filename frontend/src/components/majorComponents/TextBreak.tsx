

const TextBreak = (props:{
    lefttext:string,
    righttext:string
}) => {
  return (
    <div><h1 className="text-2xl sm:text-4xl lg:text-5xl text-center tracking-wide mt-10">
    {props.lefttext}  {" "}
    <span className="bg-gradient-to-r from-blue-500 to-red-800 text-transparent bg-clip-text">
      {props.righttext}
    </span></h1></div>
  )
}

export default TextBreak