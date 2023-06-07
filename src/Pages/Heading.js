import Button from "../components/Button";

function Heading({flip,body,...rest}){
    const Tasks = "Tasks";
    const Goals = "Goals";
    const changeStatus = () =>{
        (body===Tasks)?flip(Goals):flip(Tasks);
    }
    
    return <div className="w h-24 bg-slate-700 text-white font-bold  ">
        <Button onClick={()=>{changeStatus()}} className="text-2xl border w-24 text-center rounded ">{body}</Button>
        <p className="text-5xl font-sans flex items-center justify-center"> To Do List </p>
        </div>
}

export default Heading;