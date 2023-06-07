import Heading from "./Pages/Heading";
import AddTask from "./Pages/AddTaks";
import BodyDisplay from "./Pages/BodyDisplay";

function App(){
    return <div >
            <div id="ModalReceiver"></div>
            <Heading/>
            <AddTask/>
            <BodyDisplay/>
            </div>
}

export default App;