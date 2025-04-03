import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';

const apiurl = import.meta.env.VITE_API_URL;

const useStyles = makeStyles({
  noteContainer: {
    backgroundColor: '#4DB6AC',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    border: '2px solid #00796B',
    marginBottom: '16px',
  },
  noteHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  },
  noteTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#00796B',
  },
  noteContent: {
    color: '#616161',
    marginTop: '8px',
  },
  readMoreButton: {
    color: '#0288D1',
    cursor: 'pointer',
  },
  dialogContent: {
    minWidth: '400px',
  },
});

const NoteList = ({ notes, setNotes }) => {
  const classes = useStyles();
  const [loadingId, setLoadingId] = useState(null);
  const [editNoteId, setEditNoteId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [showReadMore, setShowReadMore] = useState({});
  const [confirmDelete, setConfirmDelete] = useState({ visible: false, id: null });
  const contentRefs = useRef({});

  const token = localStorage.getItem('token');

  const handleDeleteClick = (id) => {
    setConfirmDelete({ visible: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDelete.id) return;

    setLoadingId(confirmDelete.id);
    try {
      await axios.delete(`${apiurl}/api/notes/${confirmDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== confirmDelete.id));
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setLoadingId(null);
      setConfirmDelete({ visible: false, id: null });
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete({ visible: false, id: null });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleEdit = (note) => {
    setEditNoteId(note._id);
    setUpdatedTitle(note.title);
    setUpdatedContent(note.content);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoadingId(editNoteId);
    try {
      await axios.put(`${apiurl}/api/notes/${editNoteId}`, {
        title: updatedTitle,
        content: updatedContent,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === editNoteId ? { ...note, title: updatedTitle, content: updatedContent } : note
        )
      );
      setEditNoteId(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const toggleExpandNote = (id) => {
    setExpandedNoteId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    notes.forEach((note) => {
      if (contentRefs.current[note._id]) {
        const contentElement = contentRefs.current[note._id];
        setShowReadMore((prev) => ({
          ...prev,
          [note._id]: contentElement.scrollHeight > contentElement.clientHeight,
        }));
      }
    });
  }, [notes]);

  return (
    <Box p={6} minHeight="100vh" sx={{ background: 'linear-gradient(90deg, rgba(28, 78, 141, 0.8), rgba(0, 150, 136, 0.8))' }}>
      {notes.length === 0 ? (
        <Typography align="center" variant="h6" color="white">
          No notes available.
        </Typography>
      ) : (
        notes.map((note) => (
          <Box key={note._id} className={classes.noteContainer}>
            <Box className={classes.noteHeader}>
              <Typography variant="body2" color="textSecondary" sx={{ marginRight: 2 }}>
                Created at: {formatDate(note.createdAt)} <br />
                Modified at: {formatDate(note.updatedAt)}
              </Typography>
              <IconButton
                onClick={() => handleEdit(note)}
                disabled={loadingId === note._id}
                color="primary"
              >
                <FaEdit />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteClick(note._id)}
                disabled={loadingId === note._id}
                color="secondary"
              >
                <FaTrash />
              </IconButton>
            </Box>
            <Typography variant="h6" className={classes.noteTitle}>
              {note.title}
            </Typography>
            <Box
              ref={(el) => (contentRefs.current[note._id] = el)}
              sx={{
                maxHeight: expandedNoteId === note._id ? '80vh' : '200px',
                overflow: expandedNoteId === note._id ? 'auto' : 'hidden',
                transition: 'max-height 0.3s ease-in-out',
              }}
            >
              <Typography variant="body1" color="textPrimary" className={classes.noteContent}>
                {note.content}
              </Typography>
            </Box>
            {showReadMore[note._id] && (
              <Button
                onClick={() => toggleExpandNote(note._id)}
                className={classes.readMoreButton}
              >
                {expandedNoteId === note._id ? 'Read Less' : 'Read More'}
              </Button>
            )}
          </Box>
        ))
      )}

      {editNoteId && (
        <Dialog open={true} onClose={() => setEditNoteId(null)}>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <TextField
              label="Title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Content"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditNoteId(null)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {confirmDelete.visible && (
        <Dialog open={true} onClose={handleDeleteCancel}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this note?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default NoteList;
