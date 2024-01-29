/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTaskContext } from "./TaskContext";

const AddTask = ({ editedTask, closeModal }) => {
  const { addTask, updateTask } = useTaskContext();
  const [title, setTitle] = useState(editedTask ? editedTask.title || "" : "");
  const [description, setDescription] = useState(
    editedTask ? editedTask.description || "" : ""
  );
  const [tags, setTags] = useState(
    editedTask && editedTask.tags ? editedTask.tags.join(",") : ""
  );
  const [priority, setPriority] = useState(
    editedTask ? editedTask.priority || "" : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      priority,
    };
    if (editedTask) {
      updateTask(editedTask.id, taskData);
    } else {
      addTask(taskData);
    }
    closeModal();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11'
    >
      <h2 className='mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]'>
        Add New Task
      </h2>
      <div className='space-y-9 text-white lg:space-y-10'>
        <div className='space-y-2 lg:space-y-3'>
          <label htmlFor='title'>Title</label>
          <input
            className='block w-full rounded-md bg-[#2D323F] px-3 py-2.5'
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='space-y-2 lg:space-y-3'>
          <label htmlFor='description'>Description</label>
          <textarea
            className='block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]'
            type='text'
            name='description'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className='grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20'>
          <div className='space-y-2 lg:space-y-3'>
            <label htmlFor='tags'>Tags</label>
            <input
              className='block w-full rounded-md bg-[#2D323F] px-3 py-2.5'
              type='text'
              name='tags'
              id='tags'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>
          <div className='space-y-2 lg:space-y-3'>
            <label htmlFor='priority'>Priority</label>
            <select
              className='block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5'
              name='priority'
              id='priority'
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value=''>Select Priority</option>
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </select>
          </div>
        </div>
      </div>
      <div className='mt-16 flex justify-center lg:mt-20'>
        <button
          type='submit'
          className='rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80'
        >
          Create new Task
        </button>
      </div>
    </form>
  );
};

export default AddTask;
