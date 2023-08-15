import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import CreateTaskModal from "./modals/CreateTaskModal";

export default function TodoList() {
  const [showCreateModal, setShowCreateModal] = useState();

  const getDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksFromLocalStorage = getDataFromLocalStorage();
    setTasks(tasksFromLocalStorage);
  }, []);

  const handleDelete = (taskId) => {
    const deleteTask = tasks.filter((task) => task.id !== taskId);
    setTasks(deleteTask);
    localStorage.setItem("tasks", JSON.stringify(deleteTask));
  };

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  return (
    <>
      <div className="bg-gray-600 w-full h-[200px] flex justify-center items-center">
        <div>
          <h3 className="text-center font-semibold text-2xl">Todo List</h3>
          <div className="flex justify-center mt-2">
            <button
              className="px-2 py-1 bg-sky-500 rounded-md"
              onClick={() => setShowCreateModal(true)}
            >
              Create Task
            </button>
          </div>
          {tasks.length !== 0 && (
            <div className="flex justify-center mt-3">
              <button
                className="px-2 py-1 bg-amber-700 rounded-md"
                onClick={() => handleClear()}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {tasks.length === 0 ? (
        <p>No Tasks</p>
      ) : (
        <div className="grid grid-cols-4 gap-5 mx-5 mt-5">
          {tasks.map((task) => (
            <div key={task?.id}>
              <div className="border-2 rounded-md">
                <div>
                  <p>{task?.taskName}</p>
                  <p>{task?.description}</p>
                </div>
                <div className="flex justify-center">
                  <button
                    className="px-2 py-1 bg-sky-500 rounded-xl w-full"
                    onClick={() => handleDelete(task.id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateTaskModal
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
      />
    </>
  );
}
