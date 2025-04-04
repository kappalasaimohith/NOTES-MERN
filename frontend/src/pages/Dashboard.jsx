import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, List, ListItem, Drawer, Box, Divider } from '@mui/material';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import UserProfile from './UserProfile';

const apiurl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.error('No token found. Please login again.');
      navigate('/login');
      return;
    }

    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${apiurl}/api/notes`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setNotes(res.data);
        } else {
          console.error(`Error: ${res.status} - ${res.statusText}`);
        }
      } catch (error) {
        console.error('Failed to fetch notes:', error.response ? error.response.data : error.message);
      }
    };

    fetchNotes();
  }, [navigate, token]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${apiurl}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      if (selectedNote && selectedNote._id === id) {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error('Failed to delete note:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            backgroundColor: '#333',
            color: '#e0f7fa',
          },
        }}
      >
        <Box p={2}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6" sx={{ color: '#ffeb3b', fontWeight: 'bold' }}>
              Notes
            </Typography>
            <Button
              onClick={logout}
              variant="contained"
              sx={{
                backgroundColor: '#d32f2f',
                '&:hover': { backgroundColor: '#c62828' },
                color: '#fff',
              }}
            >
              Logout
            </Button>
          </Box>

          <List>
            {notes.length > 0 ? (
              notes.map((note) => (
                <ListItem
                  key={note._id}
                  sx={{
                    backgroundColor: '#616161',
                    color: '#fff',
                    mb: 1,
                    '&:hover': { backgroundColor: '#757575' },
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedNote(note)}
                >
                  {note.title}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note._id);
                    }}
                    variant="outlined"
                    color="error"
                    sx={{ marginLeft: 2 }}
                  >
                    Delete
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography variant="h6" align="center" color="textSecondary">
                No notes available
              </Typography>
            )}
          </List>

          <Divider sx={{ my: 2, borderColor: '#777' }} />
          <Box sx={{ position: 'absolute', bottom: 20, width: '100%' }}>
            <NoteForm setNotes={setNotes} />
            <UserProfile />
          </Box>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#1976d2',
          color: '#e0f7fa',
          padding: 2,
        }}
      >
        {selectedNote ? (
          <NoteList
            notes={[selectedNote]}
            setNotes={(updatedNotes) =>
              setNotes((prevNotes) =>
                prevNotes.map((note) =>
                  note._id === selectedNote._id ? updatedNotes[0] : note
                )
              )
            }
          />
        ) : (
          <Typography variant="h6" align="center" color="textSecondary">
            Select a note to view details
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
