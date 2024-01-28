/* eslint-disable no-unused-vars */
import { useState } from "react";
import AddTask from "./AddTask";
import { useTaskContext } from "./TaskContext";

const Table = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starredTasks, setStarredTasks] = useState([]);

  const { tasks, deleteAllTasks } = useTaskContext();

  const handleDeleteAll = () => {
    deleteAllTasks();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleStar = (taskId) => {
    setStarredTasks((prevStarredTasks) => {
      if (prevStarredTasks.includes(taskId)) {
        return prevStarredTasks.filter((id) => id !== taskId);
      } else {
        return [...prevStarredTasks, taskId];
      }
    });
  };

  const isTaskStarred = (taskId) => {
    return starredTasks.includes(taskId);
  };

  return (
    <section className='mb-20' id='tasks'>
      <div className='container'>
        <div className='rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16'>
          <div className='mb-14 items-center justify-between sm:flex'>
            <h2 className='text-2xl font-semibold max-sm:mb-4'>Your Tasks</h2>
            <div className='flex items-center space-x-5'>
              <form>
                <div className='flex'>
                  <div className='relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]'>
                    <input
                      type='search'
                      id='search-dropdown'
                      className='z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none'
                      placeholder='Search Task'
                      required
                    />
                    <button
                      type='submit'
                      className='absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4'
                    >
                      <svg
                        className='h-4 w-4'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 20'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                        />
                      </svg>
                      <span className='sr-only'>Search</span>
                    </button>
                  </div>
                </div>
              </form>
              <button
                onClick={openModal}
                className='rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold'
              >
                Add Task
              </button>
              <button
                onClick={handleDeleteAll} // Attach the handleDeleteAll function to the onClick event
                className='rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold'
              >
                Delete All
              </button>
            </div>
          </div>
          <div className='overflow-auto'>
            {tasks.length === 0 ? (
              <p className='text-center text-white'>Task List is empty!</p>
            ) : (
              <table className='table-fixed overflow-auto xl:w-full'>
                <thead>
                  <tr>
                    <th className='p-4 pb-8 text-sm font-semibold capitalize w-[48px]'>
                      {" "}
                      Click To Fav{" "}
                    </th>
                    <th className='p-4 pb-8 text-sm font-semibold capitalize w-[300px]'>
                      {" "}
                      Title{" "}
                    </th>
                    <th className='p-4 pb-8 text-sm font-semibold capitalize w-full'>
                      {" "}
                      Description{" "}
                    </th>
                    <th className='p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]'>
                      {" "}
                      Tags{" "}
                    </th>
                    <th className='p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]'>
                      {" "}
                      Priority{" "}
                    </th>
                    <th className='p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]'>
                      {" "}
                      Options{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr
                      key={task.id}
                      className='border-b border-[#2E3443] align-baseline px-4 py-2'
                    >
                      <td>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-star'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          strokeWidth='2'
                          stroke={isTaskStarred(task.id) ? "yellow" : "none"}
                          fill={isTaskStarred(task.id) ? "yellow" : "none"}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          onClick={() => toggleStar(task.id)}
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z' />
                        </svg>
                      </td>
                      <td>{task.title}</td>
                      <td>
                        <div>{task.description}</div>
                      </td>
                      <td>
                        <ul className='flex justify-center gap-1.5 flex-wrap'>
                          {task.tags.map((tag, index) => (
                            <li key={index}>
                              <span className='inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]'>
                                {tag}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className='text-center'>{task.priority}</td>
                      <td>
                        <div className='flex items-center justify-center space-x-3'>
                          <button className='text-red-500'>Delete</button>
                          <button className='text-blue-500'>Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30'>
          <div className='bg-white p-8 rounded-xl'>
            <AddTask closeModal={closeModal} />
            <button className='absolute top-4 right-4' onClick={closeModal}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Table;
