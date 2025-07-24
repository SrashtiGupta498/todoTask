import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { saveTaskData } from "../store/tasks/task.slice";


interface TaskType {
  task: string;
  description: string;
  list: string[];
  date: string;
  tags: string[];
  subtasks: string[];
  isCompleted?: boolean;
}


const Task: React.FC = () => {
  const [taskData, setTaskData] = useState({ task: "", description: "" });
   const [data, setData] = useState<TaskType | null>(null);
  const [list] = useState(["Personal", "Work"]);
  const [selectedList, setSelectedList] = useState("Personal "); // separate selected list value
  const [date, setDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [subTasks, setSubTasks] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newSubTask, setNewSubTask] = useState("");
  const dispatch = useDispatch();
  const submittask = useSelector((state: RootState) => state.task.tasks);
 const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  
const [selectedTask, setSelectedTask] = useState<string | null>(null);
const [showModal, setShowModal] = useState(false);



const closeModal = () => {
  setShowModal(false);
  setSelectedTask(null);
};


  // Update task and description
  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  // Add tag
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags(prev => [...prev, newTag]);
      setNewTag("");
    }
  };

  // Add subtask
  const handleAddSubTask = () => {
    if (newSubTask.trim()) {
      setSubTasks(prev => [...prev, newSubTask]);
      setNewSubTask("");
    }
  };


  const addTask = () => {
    const newTask: TaskType = {
      task: taskData.task,
      description: taskData.description,
      list: [selectedList],
      date: date,
      tags: tags,
      subtasks: subTasks,
      
    };

 dispatch(saveTaskData(newTask));
  };

const showData1 = (task: string) => {
  console.log(task, "CHcKCCK");

  // Find the task object
  const updateDat = submittask.find((item: TaskType) => item.task === task);

  // Find the index of that task
  const index = submittask.findIndex((item) => item.task === task);

  // Check if it is completed
  const isCompleted = completedTasks.includes(index);

  console.log("Selected Task:", updateDat);
  console.log("Is Completed:", isCompleted);

  if (updateDat) {
    // You can optionally attach the isCompleted flag if needed
    setData({ ...updateDat, isCompleted }); // if TaskType allows extra fields
    setShowModal(true);
  }
};



  const checkTask = (index: number) => {
    setCompletedTasks((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };
  

  return (
    <>
<div className="flex items-center gap-3 text-gray-800 text-xl font-semibold mb-6">
  <span className="text-lg bg-yellow-200 text-yellow-800 px-4 py-2 shadow-sm tracking-wide rounded">
    TODAY
  </span>
  <span className="bg-gray-800 text-white px-3 py-1 text-sm font-bold shadow rounded">
 {submittask.filter(task => {
      const taskDate = new Date(task.date).toDateString();
      console.log(taskDate, "taskDate")
      const today = new Date().toDateString();
      return taskDate === today;
    }).length}
  </span>
</div>


  <div className="flex  gap-4">
  <div className="w-1/2 p-6 bg-white border border-gray-200 rounded-2xl shadow-lg space-y-4 hover:shadow-xl transition duration-300 font-medium text-gray-800">
<h2 className="text-lg font-semibold text-center bg-blue-100 text-blue-800  px-4 py-2 rounded-md w-full">
 TODO Task
</h2>

<input
  type="text"
  name="task"
  value={taskData.task}
  onChange={handleTaskChange}
  placeholder="Enter task title..."
  className="w-full px-4 py-3 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white placeholder:text-gray-400 transition duration-200"
/>


        <textarea
          name="description"
          value={taskData.description}
          onChange={handleTaskChange}
          placeholder=" Enter Description..."
          className="w-full px-4 py-3 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white placeholder:text-gray-400 transition duration-200"
        />

      <div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    List
  </label>
  <select
    className="w-full px-4 py-3 border border-blue-300 rounded-xl shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
    value={selectedList}
    onChange={(e) => setSelectedList(e.target.value)}
  >
    {list.map((item, idx) => (
      <option key={idx} value={item}>
        {item}
      </option>
    ))}
  </select>
</div>


        <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Due Date
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>


  <div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-700">Tags</label>

  <div className="flex items-center gap-2">
    <input
      type="text"
      value={newTag}
      onChange={(e) => setNewTag(e.target.value)}
      placeholder="Add tag..."
      className="px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full max-w-xs placeholder:text-gray-400"
    />
    <button
      onClick={handleAddTag}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow"
    >
      + Tag
    </button>
  </div>

  {tags.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-1">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm hover:bg-blue-200 transition"
        >
          #{tag}
        </span>
      ))}
    </div>
  )}
</div>

<div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-700">Subtasks</label>

  <div className="flex items-center gap-2">
    <input
      type="text"
      value={newSubTask}
      onChange={(e) => setNewSubTask(e.target.value)}
      placeholder="Add subtask..."
      className="px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full max-w-xs placeholder:text-gray-400"
    />
    <button
      onClick={handleAddSubTask}
      className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow"
    >
      +Subtask
    </button>
  </div>

  {subTasks.length > 0 && (
    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800 mt-2">
      {subTasks.map((sub, idx) => (
        <li
          key={idx}
          className="px-3 py-1 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition"
        >
          {sub}
        </li>
      ))}
    </ul>
  )}
</div>


      <div className="flex justify-between pt-6 gap-4">
  {/* <button
    className="border border-red-500 text-red-500 px-5 py-2 rounded-lg font-medium hover:bg-red-50 transition shadow-sm"
  >
    🗑️ Delete Task
  </button> */}

  <button
    className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold transition shadow-md"
    onClick={addTask}
  >
   Add Task
  </button>
</div>



</div>
<div className="result bg-gray-100 p-6 w-1/2 rounded-xl shadow-lg">
  {/* <ul className="space-y-3">
   {submittask.map((item: TaskType, idx: number) => (
      <li
        key={idx}
        className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-md hover:bg-blue-50 transition"
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="accent-blue-600 h-4 w-4"
            onChange={() => checkTask(idx)}
            checked={completedTasks.includes(idx)}
          />
          <span className="font-semibold text-gray-800">{item.task}</span>
        </div>

        <i className="fas fa-arrow-right text-gray-500 text-lg hover:text-blue-600 transition duration-200" 
 onClick={() => showData1(item.task)}
         ></i>
      </li>
    ))} */}
  <ul className="space-y-3">
        {submittask.map((item: TaskType, idx: number) => {
          const isCompleted = completedTasks.includes(idx);
          return (
            <li
              key={idx}
              className={`flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-md hover:bg-blue-50 transition ${
                isCompleted ? 'bg-gray-200' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="accent-blue-600 h-4 w-4"
                  onChange={() => checkTask(idx)}
                  checked={isCompleted}
                />
                <span
                  className={`font-semibold transition ${
                    isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {item.task}
                </span>
              </div>

              <i
                className="fas fa-arrow-right text-gray-500 text-lg hover:text-blue-600 transition duration-200"
                onClick={() => showData1(item.task)}
              ></i>
            </li>
          );
        })}
      </ul>

{showModal && data &&  (

   <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    onClick={closeModal}
  >
   <div
      className={`rounded-xl shadow-xl p-6 w-[500px] max-h-[80vh] overflow-y-auto ${
        data.isCompleted ? 'bg-gray-300 cursor-not-allowed' : 'bg-white'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        {data.task}
      </h2>
     

      <div className="space-y-5 text-gray-800 text-sm leading-relaxed">

        {/* Description */}
        <div>
          <h3 className="font-semibold text-gray-500 mb-1">Description:</h3>
          <p>{data.description}</p>
        </div>

        {/* Date */}
        <div>
          <h3 className="font-semibold text-gray-500 mb-1">Date:</h3>
          <p>{data.date}</p>
        </div>

        {/* List */}
        <div>
          <h3 className="font-semibold text-gray-500 mb-1">List:</h3>
          <div className="flex flex-wrap gap-2">
            {data.list.map((listItem: string, idx: number) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
              >
                {listItem}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-semibold text-gray-500 mb-1">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Subtasks */}
        <div>
          <h3 className="font-semibold text-gray-500 mb-1">Subtasks:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {data.subtasks.map((sub: string, idx: number) => (
              <li key={idx}>{sub}</li>
            ))}
          </ul>
        </div>
      </div>
     

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={closeModal}
      >
        Close
      </button>
       </div>
    </div>
)}
</div>
</div>
    </>
  );

};

export default Task;




