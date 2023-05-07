import logo from './logo.svg';
import './App.css';
import AddTask from './Components/AddTasks';
import { useState } from 'react';
import ToDo from './Components/ToDo';
import { useEffect } from 'react';
import { useDrop } from 'react-dnd';


function App() {

  const [taskList,settaskList]= useState([ ]);
  const[completed,setcompleted]= useState([]);
 
  useEffect(()=>{
    let array = localStorage.getItem("taskList")
    if(array){
      settaskList(JSON.parse(array)) // to convert to object
    }
  },[])
  const[{isOver},drop]=useDrop(()=>({
    accept:"todo",
    drop:(item)=>addToCompleted(item.id,item.projectName,item.taskdescription,item.timestamp,item.duration),
    collect :(monitor) =>({
      isOver : !!monitor.isOver()
    })
  }))
  const addToCompleted =(id,projectName,taskdescription,timestamp,duration)=>{
    const moveTask = taskList.filter((task)=>id===task.id);
    setcompleted((completed)=>[...completed,{moveTask,projectName,taskdescription,timestamp,duration}])
  }
  return (
    <>
    <div className="App">
     
     
      <div className='flex flex-row items-center'>
      <p className='text-xl pl-6'>Click here to add new task </p> <br/>
      <AddTask  taskList={taskList}  settaskList={settaskList}/>
      

      </div>
      <div className='flex flex-row'>
      <div className='w-full ' >
        <h2 className='ml-6 text-xl w-max py-1 max-w-lg bg-gray-300 py-1 px-2'>All Tasks :</h2>
      {
        taskList.map((task,i)=>
        
        <ToDo key={i} task={task} index={i} taskList= {taskList} settaskList={settaskList }/>
        
        )
      }
      </div>
    <div className='w-full' ref={drop}>
    <h2 className='ml-6 text-xl w-max py-1 max-w-lg bg-gray-300 py-1 px-2 '>Completed:</h2>
    {

        completed.map((task,i)=>
        
        <ToDo key={i} task={task} index={i} taskList= {taskList}  settaskList={settaskList }/>
        
        )
      }

    </div>
    
    </div>
    </div>
    </>
  );
}

export default App;
