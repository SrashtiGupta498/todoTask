import React, { useState } from "react";


interface TaskType {
  task: string;
  description: string;
  list: string[];
  date: string;
  tags: string[];
  subtasks: string[];
}

const Task: React.FC = () => {
  const [taskData, setTaskData] = useState({ task: "", description: "" });
  const [list] = useState(["Personal", "Work"]);
  const [selectedList, setSelectedList] = useState("Personal"); // separate selected list value
  const [date, setDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [subTasks, setSubTasks] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newSubTask, setNewSubTask] = useState("");

  const [submittask, setSubmitTask] = useState<TaskType[]>([]);

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

    setSubmitTask(prev => [...prev, newTask]);
    console.log(submittask, "SUBMIT TASK");
  };

  return (
    <>
      <div className="max-w-md p-4 bg-white shadow rounded space-y-4">
        <h2 className="text-lg font-semibold">Task:</h2>

        <input
          type="text"
          name="task"
          value={taskData.task}
          onChange={handleTaskChange}
          placeholder="Task title"
          className="w-full px-3 py-2 border rounded"
        />

        <textarea
          name="description"
          value={taskData.description}
          onChange={handleTaskChange}
          placeholder="Description"
          className="w-full px-3 py-2 border rounded"
        />

        <div>
          <label className="block font-medium text-sm mb-1">List</label>
          <select
            className="w-full px-3 py-2 border rounded"
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
          <label className="block font-medium text-sm mb-1">Due Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">Tags</label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="px-2 py-1 border rounded"
              placeholder="Add Tag"
            />
            <button
              onClick={handleAddTag}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              + Add Tag
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">Subtasks</label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={newSubTask}
              onChange={(e) => setNewSubTask(e.target.value)}
              className="px-2 py-1 border rounded"
              placeholder="Add Subtask"
            />
            <button
              onClick={handleAddSubTask}
              className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
            >
              + Add
            </button>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {subTasks.map((sub, idx) => (
              <li key={idx}>{sub}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between pt-4">
          <button className="border px-4 py-2 rounded">Delete Task</button>
        
          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold"
            onClick={addTask}
          >
            + Add Task
          </button>
         
        </div>
      </div>
    </>
  );
};

export default Task;
