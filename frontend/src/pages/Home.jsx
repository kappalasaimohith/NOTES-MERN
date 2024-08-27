import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex justify-center items-center">
                <div className="text-center">
                    <p className="mb-4 text-lg">This is the Home page</p>
                    <button
                        className="text-white p-2 rounded-3xl bg-[#6E6565] hover:bg-[#5a5a5a] transition-colors duration-300"
                        onClick={() => navigate('/login')}
                    >
                        Get Notes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
