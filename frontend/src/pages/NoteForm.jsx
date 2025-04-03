import { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';

const apiurl = import.meta.env.VITE_API_URL;

const NoteForm = ({ setNotes }) => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiurl}/api/notes`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prevNotes) => [...prevNotes, res.data]);
      setFormData({ title: '', content: '' });
      setIsFormVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3, borderRadius: 2, boxShadow: 3 }}>
      {!isFormVisible ? (
        <Box display="flex" justifyContent="center" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsFormVisible(true)}
            sx={{ width: '100%' }}
          >
            Create a New Note
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="h6" align="center" mb={2} sx={{ fontWeight: 'bold' }}>
            Create a New Note
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                id="title"
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="content"
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Box>
            <Box display="flex" justifyContent="space-between" gap={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: '48%' }}
              >
                Add Note
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => setIsFormVisible(false)}
                sx={{ width: '48%' }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </>
      )}
    </Box>
  );
};

export default NoteForm;
