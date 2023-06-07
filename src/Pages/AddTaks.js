import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useContext } from "react";

import values from "../context/Context";

function AddTask({add,className,...rest}){

    const {editValue,setEditValue,AddPendingTask} = useContext(values);  // Refer context page to know the use of each props


    const HandleAutoRefresh = (event) =>{
            event.preventDefault();
            updateTasks();
    }

    const updateTasks = () =>{
        AddPendingTask(editValue);
        setEditValue('');
    }

    const captureChange = (event) =>{
        setEditValue(event.target.value);
    }

const newClassName = "ml-24 mt-16 h-24"+ className;

return  <div className={newClassName} {...rest}> 
<form onSubmit={HandleAutoRefresh} className="flex">
<InputBox onChange={captureChange} className=" m-4 p-1" value={editValue}> Add New Task </InputBox>
<Button className="m-4 h-8" onClick={()=>updateTasks}> Add it </Button>
</form>
</div>
}

export default AddTask;

