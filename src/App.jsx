import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Table from "./Components/Table";
import { TaskProvider } from "./Components/TaskContext";

const App = () => {
  return (
    <>
      <body className='bg-[#191D26] font-[Inter] text-white'>
        <Navbar />
        <Hero />
        <TaskProvider>
          <Table />
        </TaskProvider>
        <Footer />
      </body>
    </>
  );
};

export default App;
