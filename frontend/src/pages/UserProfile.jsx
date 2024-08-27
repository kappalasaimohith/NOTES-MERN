import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action is irreversible.");

    if (confirmDelete) {
      try {
        const userId = localStorage.getItem('userId'); // Assumed that you store the user ID in localStorage
        const token = localStorage.getItem('token');

        await axios.delete(`http://localhost:5000/api/auth/delete-user/${userId}`, {
          headers: { Authorization: token },
        });

        // Log the user out and redirect to the homepage or login page
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
      } catch (error) {
        alert('Error deleting account');
      }
    }
  };

  return (
    <div>
      <h1>Your Profile</h1>
      <button
        onClick={handleDeleteAccount}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete Account
      </button>
    </div>
  );
};

export default UserProfile;
