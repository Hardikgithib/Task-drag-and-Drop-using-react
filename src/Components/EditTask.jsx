import { useState ,useEffect} from "react"


const EditTask =( {task ,taskList,settaskList})=>{
    const[editModal,seteditModal]=useState(false)
    const [projectName,setProjectName]= useState("")
    const [taskdescription,settaskdescription]= useState("")

    useEffect(()=>{
        setProjectName(task.projectName)
        settaskdescription(task.taskdescription)
    },[])
    const handleInput =e=>{
        const{name,value}=e.target
        if(name=="projectName")setProjectName(value)
        if(name=="taskDescription")settaskdescription(value)
    }
    const handleUpdate =  e=>{
       e.preventDefault();
       let taskIndex = taskList.indexOf(task)
       taskList.splice(taskIndex,1) //To remove task here 1 is to secify how many task we have to reamove
       settaskList (
        [...taskList,{projectName,taskdescription}]
       );
       seteditModal(false);
     
    }
    return(
        <>
        <button className="edit bg-teal-200	"
        onClick={()=>seteditModal(true)}
        
        >Edit</button>
        {editModal?(<>
            <div className="flex items-center justify-center    overflow-x-hidden overflow-y-auto fixed inset-0 z-100 ">
                        <div className=" w-9/12 bg-white  rounded-lg shadow-md relative flex flex-col">
                            <div className="  flex flex-row justify-between ">

                                <h3 className="py-10 px-10 " >Edit Task</h3>

                                {/* Here as we click on X modal coloses */}
                                <button className="px-1 text-gray-400 float-right text-3xl font-semibold black" onClick={(() => seteditModal(false))}>X</button>

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
                                <label></label>
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
                            <button className="btn" onClick={handleUpdate } >Update task</button>

                        </div>

                    </div>



        </>
            
            ):null}
        </>

    )
}
export default EditTask