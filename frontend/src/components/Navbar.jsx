import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#001f3f] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-[#e0f7fa] text-xl font-bold">Notes</h1>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="relative inline-block font-medium px-4 py-2 text-[#e0f7fa] bg-[#004080] rounded-3xl text-lg group transition-transform duration-300 hover:bg-[#003366] hover:translate-y-[-3px]"
          >
            Home
            <span className="absolute bottom-[-5px] left-0 w-full h-[3px] bg-[#007bff] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
          </Link>
          <Link
            to="/login"
            className="relative inline-block font-medium px-4 py-2 text-[#e0f7fa] bg-[#004080] rounded-3xl text-lg group transition-transform duration-300 hover:bg-[#003366] hover:translate-y-[-3px]"
          >
            Login
            <span className="absolute bottom-[-5px] left-0 w-full h-[3px] bg-[#007bff] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
          </Link>
          <Link
            to="/register"
            className="relative inline-block font-medium px-4 py-2 text-[#e0f7fa] bg-[#004080] rounded-3xl text-lg group transition-transform duration-300 hover:bg-[#003366] hover:translate-y-[-3px]"
          >
            Register
            <span className="absolute bottom-[-5px] left-0 w-full h-[3px] bg-[#007bff] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
