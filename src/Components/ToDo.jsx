import { useState } from "react";
import EditTask from "./EditTask";
import { useEffect } from "react";
import { useDrag } from "react-dnd";

const ToDo = ({task ,index,taskList,settaskList}) =>{
    const [time,settime] =useState(task.duration)
    const[running,setrunning]=useState(false)
    const [{isDragging},drag ]= useDrag(()=>({
        type:"todo",
        item :{
            id:index,
            projectName: task.projectName,
            taskdescription:task.taskdescription,
            timestamp: task.timestamp,
            duration:task.duration
        },
        collect:(monitor)=>({

            isDragging:!!monitor.isDragging() // monitor lets you update the prop when the component is dragging

        })
    }))


    const handleDelete =( e,itemID)=>{
        e.preventDefault();
        
        let removeIndex = taskList.indexOf(task)
        taskList.splice(removeIndex,1)
        localStorage.setItem("taskList",JSON.stringify(taskList));
        window.location.reload()
        // settaskList((currenttasks=>currenttasks.filter(todo=>todo.id!==itemID)))

    }
    useEffect(()=>{
        let interval;
        if(running){
            interval = setInterval(()=>{
                settime((prevTime)=>prevTime+10)
            },10)
        }
        else if(!running){
            clearInterval(interval)
        }
        return ()=> clearInterval(interval);
    },[running])
    const handleStop = (e)=>{
        e.preventDefault();
        setrunning(false)
        let taskIndex = taskList.indexOf(task)
        taskList.splice(taskIndex,1,{
            projectName:task.projectName,
            taskdescription:task.taskdescription,
            timestamp:task.timestamp,
            duration:time
        })
        localStorage.setItem("taskList",JSON.stringify(taskList))
        window.location.reload();

    }
    return(
        <>
        <div className="flex flex-col items-start justify-start  bg-white my-4 ml-6 py-6 w-3/4 max-w-lg" ref={drag}>
            <div className="w-full flex flex-row justify-between">
        <p className="font-semibold text-xl" >{task.projectName}</p>
        <EditTask  task={task} index={index} taskList={taskList} settaskList={settaskList}/>

            </div>
        <p className="text-lg py-2">{task.taskdescription}</p>
        <div className="justify-evenly w-full flex flex-row items-center">
            <div>
                <span>{("0"+Math.floor((time/3600000)%24)).slice(-2)}</span>:
                <span>{("0"+Math.floor((time/60000)%60)).slice(-2)}</span>:
                <span>{("0"+Math.floor((time/1000)%260)).slice(-2)}</span>:
                <span className="text-sm">{("0" +( (time/10)%100)).slice(-2)}</span>

            </div>
            <div className="">
                {running?(<button
                onClick={handleStop}
                 className="border rounded-lg py-1 px-3 gap-2 bg-red-600"> Stop
                </button> 
                    ):(<button className="border rounded-lg py-1 px-3 bg-red-600"   onClick={()=>{setrunning(true)}}> Start </button>)}
                    <button className="border rounded-lg py-1 px-3 bg-lime-600" onClick={()=>{settime(0)}}>Reset</button>

            </div>
        </div>
        <div  className="w-full flex justify-center">
            <button 
            onClick={handleDelete}
            
            className="btndelete">Delete</button>

        </div>
        </div>
        </>
    )
}
export default ToDo;