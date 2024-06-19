import React, { useState } from 'react';
import './Todo.css';

function Todo() {
  const [TaskInput, setTaskInput] = useState('');
  const [Tasks, setTasks] = useState([]);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [doneTasks, setDoneTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
    setErrorMessage('');
  };

  const addTask = () => {
    if (TaskInput.trim() === '') {
      setErrorMessage('Task cannot be empty');
      return;
    }

    if (Tasks.includes(TaskInput)) {
      setErrorMessage('This task already exists');
      return;
    }

    setTasks([...Tasks, TaskInput]);
    setTaskInput('');
  };

  const undoTaskCompletion = (index) => {
    const newDoneTasks = [...doneTasks];
    const task = newDoneTasks.splice(index, 1)[0];
    setDoneTasks(newDoneTasks);
    setTasks([...Tasks, task]);
  };

  const DelTask = (index) => {
    const allTasks = [...Tasks];
    allTasks.splice(index, 1);
    setTasks(allTasks);
  };

  const TaskCompletion = (index) => {
    const newTasks = [...Tasks];
    const task = newTasks.splice(index, 1)[0];
    setTasks(newTasks);
    setDoneTasks([...doneTasks, task]);
  };

  const handleEdit = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setEditedTask(Tasks[index]);
  };

  const handleSave = () => {
    if (editedTask.trim() === '') {
      setErrorMessage('Task cannot be empty');
      return;
    }

    const updatedTasks = [...Tasks];
    updatedTasks[editIndex] = editedTask;
    setTasks(updatedTasks);

    setEditMode(false);
    setEditIndex(-1);
    setEditedTask('');
  };

  return (
    <div>
      <h1>To do List</h1>
      <div id="inputs">
        <input
          type="text"
          id="newTask"
          placeholder="Add a new Task"
          value={TaskInput}
          onChange={handleInputChange}
        />
        <button className="addBtn" onClick={addTask}>
          Add
        </button>
      </div>
      {ErrorMessage && <p className="err">{ErrorMessage}</p>}
      <h2>Task List</h2>
      <ul id="todoList">
        {Tasks.map((task, index) => (
          <li key={index}>
            {editMode && editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button className="saveBtn" onClick={handleSave}>
                  Save
                </button>
              </>
            ) : (
              <>
                <input type="checkbox" onChange={() => TaskCompletion(index)} />
                {task}
                <button className="editBtn" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="delBtn" onClick={() => DelTask(index)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2>Done List</h2>
      <ul id="donelist">
        {doneTasks.map((task, index) => (
          <li key={index}>
            {task}
            <button className="undoBtn" onClick={() => undoTaskCompletion(index)}>
              Undo
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
