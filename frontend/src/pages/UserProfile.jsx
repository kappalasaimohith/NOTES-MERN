import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiurl = import.meta.env.VITE_API_URL;

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);

      if (!storedToken) {
        alert('No token found, please login.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${apiurl}/api/auth/user-profile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setUserData({ ...response.data, token: storedToken });
        setModalOpen(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user details. Please login again.');
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action is irreversible.'
    );

    if (confirmDelete) {
      try {
        const userId = userData?._id;
        const storedToken = localStorage.getItem('token');

        if (!userId) {
          alert('User ID not found.');
          return;
        }

        await axios.delete(`${apiurl}/api/auth/delete-user/${userId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        View Profile
      </button>
      {modalOpen && userData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Close
            </button>
            <button
              onClick={handleDeleteAccount}
              className="mt-4 ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
