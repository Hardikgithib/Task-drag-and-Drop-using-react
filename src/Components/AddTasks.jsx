import { useState } from "react";


const AddTask = ({taskList ,settaskList}) => {
    const [addModal, setaddModal] = useState(false);
    const [projectName,setProjectName]= useState("")
    const [taskdescription,settaskdescription]= useState("")

    const [errormessage,seterrormessage]=useState("")
    const handleInput =e=>{
        const{name,value}=e.target
        if(name=="projectName"){
            setProjectName(value)
            seterrormessage("")
        }
        if(name=="projectName" && value==""){
            seterrormessage("Eneter project Name to continue")
        }
        if(name=="taskDescription")settaskdescription(value)
    }
    const handleAdd =  e=>{
       e.preventDefault();
       if(!projectName){
        seterrormessage("Eneter project Name to continue")
       }
       else{
        let timestamp = new Date();
        let tempList = taskList;
        tempList.push({      // pushing new task
          projectName,
          taskdescription,
          timestamp :timestamp,
          duration : 0
        })

        localStorage.setItem("taskList" ,JSON.stringify(taskList)) // storing in local storage
        window.location.reload()
       
       setaddModal(false);
       setProjectName("")
       settaskdescription("");
       }
    }

    return (
        <>
            <button className="bg-blue-500 text-white uppercase rounded hover:opacity-70 py-1 pr-2"
                onClick={() => setaddModal(true)}          >

                +New</button>
            {addModal ? (
                <>
                    <div className="flex items-center justify-center    overflow-x-hidden overflow-y-auto fixed inset-0 z-100 ">
                        <div className=" w-9/12 bg-white  rounded-lg shadow-md relative flex flex-col">
                            <div className="  flex flex-row justify-between ">

                                <h3 className=" text-3xl font-semibold text-center px-10" >Add New Task</h3>

                                {/* Here as we click on X modal coloses */}
                                <button className="px-1 text-gray-400 float-right text-3xl font-semibold black" onClick={(() => setaddModal(false))}>X</button>

                            </div>
                            <form className="p-6">
                                <label className="track-wide uppercase text-gray-700 font-semibold md-2 block"
                                htmlFor="project-name"
                                
                                
                                
                                > Project Name </label>
                                <input
                                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 
                                    rounded-py-3 px-4 md-5 leading-tight
                                     focus:outline-none focus:bg-white"
                                    id="project-name"
                                    type="text"
                                    name = 'projectName'
                                    value={projectName}
                                    onChange={handleInput}
                                    placeholder="project name"
                                    required
                                />
                                <p className="text-red-500">{errormessage    }</p>
                                <label>Project Description</label> <br/>
                                <textarea
                                className="w-full bg-gray-200 text-gray-700 border border-gray-200 
                                rounded-py-3 px-4 md-5 leading-tight
                                 focus:outline-none focus:bg-white"
                                 id="taskdescription"
                                rows="3"
                                placeholder="Taskdescription"
                                name="taskDescription"
                                onChange={handleInput}
                                value={taskdescription}
                                ></textarea>
                            </form>
                            <button className="btn" onClick={handleAdd } >Add task</button>

                        </div>

                    </div>

                </>
            ) : null}


        </>
    )
}
export default AddTask;