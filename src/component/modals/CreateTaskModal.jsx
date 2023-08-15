import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";

export default function CreateTaskModal({
  showCreateModal,
  setShowCreateModal,
}) {
  const handleClose = () => !setShowCreateModal();

  const [formTask, setFormTask] = useState({
    id: Date.now(),
    taskName: "",
    description: "",
  });

  const { id, taskName, description } = formTask;

  const handleChange = (e) => {
    setFormTask({
      ...formTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const newTask = {
      id,
      taskName,
      description,
    };

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    existingTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    setFormTask({
      id: 0,
      taskName: "",
      description: "",
    });
  };

  return (
    <>
      <Modal show={showCreateModal} size="sm" onClose={handleClose}>
        <Modal.Header>Create TodoList</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="number"
              value={id}
              onChange={handleChange}
              name="id"
              hidden
            />
            <input
              type="text"
              placeholder="Task Name"
              className="w-full rounded-md"
              value={taskName}
              name="taskName"
              onChange={handleChange}
            />
            <textarea
              rows="5"
              className="w-full rounded-md"
              placeholder="Description"
              value={description}
              name="description"
              onChange={handleChange}
            />
            <div className="flex flex-cols gap-2 justify-end">
              <button
                type="submit"
                className="px-2 py-1 bg-sky-700 text-white rounded-md mt-3"
              >
                Create
              </button>
              <button
                onClick={handleClose}
                className="px-2 py-1 bg-gray-700 text-white rounded-md mt-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
