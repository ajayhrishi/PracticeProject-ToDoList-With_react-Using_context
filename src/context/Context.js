import { createContext } from "react";

import { useState, useEffect } from "react";

import axios from "axios";

const values = createContext();

function TheContext({children}){

    const [body,setBody]= useState("Tasks");        // To track the if the user in Task based To Do List Page or in Goal Based To Do list Page (In Progress)
    const [tasks,setTasks] = useState([]);          // To track the Pending Tasks
    const [completed,setCompleted] = useState([]);  // To track the Completed Tasks

    const [editid,setEditIdState]=useState(false);  // To keep the track of the Element that is in editing state
    const [editValue, setEditValue] = useState(" ");// To capture the user input's on times.

    useEffect( ()=>{fetchTasks();},[]);     // To get the data from the server and assign to the respective states. can be used to refresh the states when any changes are made
    async function fetchTasks (){

        let TasksSeverData = await axios.get('http://localhost:3005/tasks/');
        let CompletedTasks = await axios.get('http://localhost:3005/completedTasks/');
        TasksSeverData = [...TasksSeverData.data];
        CompletedTasks = [...CompletedTasks.data];
        setTasks(TasksSeverData);
        setCompleted(CompletedTasks);
    }

    const ChangeBody = (element)=>{
        setBody(element);
    }
    /*---------------- Func for all the operations on the Pending Task lists ------------------------*/

    //Note: Using the fetch Tasks will automatically load all the data from the server after each udpate. 

    const AddPendingTask = async(TaskToAdd) => {
        
       await axios.post("http://localhost:3005/tasks/",{"value":TaskToAdd});
       setEditIdState('');
       setEditValue('');
       fetchTasks();
    }

    const EditPendingTask = async (id,value) => {
      await axios.put("http://localhost:3005/tasks/"+id,{value:value});
      setEditIdState('');
      setEditValue('');
      fetchTasks();

    }

    const deletePendingTask = async(id) => {
        await axios.delete("http://localhost:3005/tasks/"+id);
        fetchTasks();
    }
/*---------------- Func for all the operations on the Completed Task lists ------------------------*/
    const CompleteTheTask = async(id) => {
        let data = await axios.get("http://localhost:3005/tasks/"+id); data = data.data;
        await axios.delete("http://localhost:3005/tasks/"+id);
        await axios.post("http://localhost:3005/completedTasks/",data);
        fetchTasks();
    }
    const deleteOneCompletedTask = async(id) => {
        await axios.delete("http://localhost:3005/completedTasks/"+id);
        fetchTasks();
    }
    const AssignBackToPending = async(id) => {
        let data = await axios.get("http://localhost:3005/completedTasks/"+id); data = data.data;
        await axios.delete("http://localhost:3005/completedTasks/"+id);
        await axios.post("http://localhost:3005/tasks/",data);
        fetchTasks();
    }
    const EditTheCompletedTask = async(id,value) => {
        let idToPass = editid.slice(0,editid.length-1);
        await axios.put("http://localhost:3005/completedTasks/"+idToPass,{value:value});
        setEditIdState('');
        setEditValue('');
        fetchTasks();
    }



    const data = {

            fetchTasks,             // To get the updated data from the server after each update.

            /*------------- The Functions and state using for the operations on the Pending Task List elements-------- */

            tasks,                  // The state using for keeping track of the Pending Task List
            setTasks,               // The function using to update the tasks state,
            AddPendingTask,         // To Add  A new Task to the list
            EditPendingTask,        // Function to edit the task that is selected
            AssignBackToPending,    // Function to undo the task from the completed list for asign it back to the pending list
            deletePendingTask,      // Function to delete a spesific task 

            /*------------- The Functions and state using for the operations on the Completed Task List elements-------- */
            completed,              // The state using for keeping track of the completed Task List
            setCompleted,           // Function to change the task from the Pending list(from tasks's state) to the Completed List(to 'completed' state);
            CompleteTheTask,        // The function using for assign the task from Pending tasks('Tasks' state) to the Completed Task list('completed state')
            deleteOneCompletedTask, //Function to remove the task from the list of Completed. 
            EditTheCompletedTask,   // Function to edit the Completed task's value.

            /*------------------ States and Functions using for the Editing Purpose ---------------------*/
            editid,         // State to keep the track of the element that is in edit status
            setEditIdState, // To change the state of the active editing component, also can be used to put the element to the editable state.
            editValue,      // State to capture the value entering in to the input field that need to use for editing
            setEditValue,    // To update the Edit value    



            /* Pending Completion - This part of the elements are still on progress for using the Goals based To Do list */
            body,
            ChangeBody,
            setBody,
        }

    return <values.Provider value={data}>{children}</values.Provider>
}

export default values;
export {TheContext};