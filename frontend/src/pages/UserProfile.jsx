import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

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
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        sx={{ mt: 2 }}
      >
        View Profile
      </Button>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          {userData ? (
            <>
              <Typography variant="body1">
                <strong>Username:</strong> {userData.username}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {userData.email}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Loading user data...
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="secondary">
            Close
          </Button>
          <Button onClick={handleDeleteAccount} color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
