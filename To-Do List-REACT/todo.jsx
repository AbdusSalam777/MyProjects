import React, { useState } from "react";

function Todo() {
  const [tasks, setTask] = useState([
    //state 1
    "Make the breakfast",
    "Take a shower",
    "Wash the dishes",
  ]);
  const [newtask, setnewTask] = useState(""); //state 2

  function addnewtask(event) {
    setnewTask(event.target.value);
  }

  function addtask() {
    if (newtask.trim() !== "") {
      setTask((t) => [...t, newtask]);
      setnewTask("");
    }
  }
  function removetask(index) {
    const newtasks = tasks.filter((_, i) => {
      return i !== index;
    });

    setTask(newtasks);
  }
  function removetask(index) {
    const newtasks = tasks.filter((_, i) => {
      return i !== index;
    });

    setTask(newtasks);
  }
  function movetaskup(index) {
    if (index > 0) {
      const t = [...tasks];
      [t[index],t[index-1]]=[t[index-1],t[index]];
      setTask(t);
    }
  }
  function movetaskdown(index){
    if(index<tasks.length-1){
      const t = [...tasks];
      [t[index],t[index+1]]=[t[index+1],t[index]];
      setTask(t);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <div className="w-full max-w-md p-4">
        <p className="text-white text-2xl font-bold mb-4">To-Do List</p>
        <div className="flex mb-4">
          <input
            className="flex-grow p-2 rounded-l bg-amber-100"
            placeholder="Enter a task"
            type="text"
            onChange={addnewtask}
          />
          <button
            className="bg-amber-400 px-4 py-2 rounded-r"
            onClick={addtask}
          >
            Add
          </button>
        </div>
        <ol className="w-full">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="bg-gray-700 text-white p-3 rounded mb-2 flex justify-between items-center"
            >
              <p>{task}</p>
              <div>
                <button
                  onClick={() => removetask(index)}
                  className="bg-red-500 m-1 px-3 py-1 rounded "
                >
                  Delete
                </button>
                <button onClick={()=>movetaskup(index)} className="bg-amber-400 m-1 px-3 py-1 rounded">
                  ⬆️
                </button>
                <button onClick={()=>movetaskdown(index)} className="bg-amber-400 m-1 px-3 py-1 rounded">
                  ⬇️
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
export default Todo;
