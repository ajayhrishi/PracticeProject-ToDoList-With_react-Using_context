import Heading from "./Pages/Heading";
import AddTask from "./Pages/AddTaks";
import BodyDisplay from "./Pages/BodyDisplay";

function App(){
    return <div >
            <div id="ModalReceiver"></div>
            <Heading/>
            <div className="border w-3/4 rounded">
            <AddTask className="items-center justify-center"/>
            <BodyDisplay className="items-center justify-center"/>
            </div>
            </div>
}

export default App;