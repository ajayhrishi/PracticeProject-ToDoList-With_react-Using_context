import { AiFillEdit,AiFillCloseSquare,AiFillCheckCircle,AiOutlineUndo} from "react-icons/ai";

import { useContext } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

import values from "../context/Context";

function TasksDiplay(){

    const {
        tasks,completed,/*These are the list of pending taks and completed task from context*/
        EditPendingTask, // Function to edit the task that is selected
        EditTheCompletedTask, // Function to edit the Completed task.
        CompleteTheTask,    // Function to change the task to the completed task's list
        deletePendingTask, // Function to delete a spesific task 
        AssignBackToPending,    // Function to undo the task from the completed list for asign it back to the pending list
        deleteOneCompletedTask, //Function to remove the task from the list of Completed. 
        editid, // State to keep the track of the element that is in edit status
        setEditIdState, // To change the state of the active editing component.
        editValue,  // State to capture the value entering in to the input field that need to use for editing
        setEditValue // To update the Edit value
    } = useContext(values);

    
    const iconClass = "p-2 w-8 h-8 border rounded";

    /*----------- creation of Tasks List JSX elements  ---------- */
        const JSXtasks =  tasks.map((element)=>{

            if(editid===element.id){
                return <div key={editid} className="border p-2 font-bold flex">Task:<br/>
                <form onSubmit={(event)=>{event.preventDefault();EditPendingTask(editid,editValue);}}>
                <InputBox onChange={(event)=>{setEditValue(event.target.value)}}> {editValue}</InputBox>
                <Button onClick={()=>{EditPendingTask(editid,editValue);}}>Save</Button>
                </form>
                </div>
            }

            return <div className="p-1 font-bold flex" key={element.id}> 
            
            <div className="my-4 justify-end " >{element.value}</div>
            <div className="flex ml-auto my-2">
            <div className={iconClass} onClick={()=>{CompleteTheTask(element.id)}}><AiFillCheckCircle/></div>
            <div className={iconClass} onClick={()=>{setEditIdState(element.id)}}><AiFillEdit/></div>
            <div className={iconClass} onClick={()=>{deletePendingTask(element.id)}}><AiFillCloseSquare/></div>
            </div>
        </div>  

        });
    /*----------- creation of completed Tasks List JSX element  ---------- */
       const JSXcompletedTask = completed.map((element)=>{

        if(editid===element.id+"c"){

            return <div key={editid} className="border p-2 font-bold flex">Task:<br/>
            <form onSubmit={(event)=>{event.preventDefault();EditTheCompletedTask(element.id+"c",editValue);}}>
            <InputBox onChange={(event)=>{setEditValue(event.target.value)}}> {editValue}</InputBox>
            <Button onClick={()=>{EditTheCompletedTask(element.id+"c");}}>Save</Button>
            </form>
            </div>
        }

        return <div className="p-1 font-bold line-through " key={element.id}> <div className="flex">
    
        <div className="my-4 justify-end" >{element.value}</div>
        <div className="flex ml-auto my-2">
        <div className={iconClass} onClick={()=>{AssignBackToPending(element.id)}}><AiOutlineUndo/></div>
        <div className={iconClass} onClick={()=>{setEditIdState(element.id+"c")}}><AiFillEdit/></div>
        <div className={iconClass} onClick={()=>{deleteOneCompletedTask(element.id)}}><AiFillCloseSquare/></div>
    </div>  
    </div>  
    </div>
       });
    /*-------------- Elements that will be returning as JSX elements -------------------- */

    return <div className=" ml-24 justify-center">
        <div className="bg-orange-300 mt-10 w-1/2 rounded">
        {[...JSXtasks]}
        </div>
        <div className="bg-green-300 mt-20 w-1/2 rounded justify-center">
        {[...JSXcompletedTask] }   
        </div>   
    </div>
}



export default TasksDiplay;

/*  
        
       
    */