import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${apiurl}/api/notes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen max-w-screen bg-gray-200 flex">
      <div className="w-1/4 bg-gray-500 p-4 space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-yellow-300">Notes</h2>
          <button
            className="px-4 py-2 bg-red-700 text-gray-200 font-bold rounded-lg shadow-md hover:bg-red-900 transition duration-300"
            onClick={logout}
          >
            Logout
          </button>
        </div>
        <div className="space-y-1">
          {notes.map((note) => (
            <button
              key={note._id}
              className="block w-full text-left p-2 rounded-lg bg-gray-700 text-gray-100 hover:bg-gray-600"
              onClick={() => setSelectedNote(note)}
            >
              {note.title}
            </button>
          ))}
        </div>
        <div className="mt-auto">
          <NoteForm setNotes={setNotes} />
          <UserProfile /> 
        </div>
      </div>
      <div className="w-full bg-blue-500 p-4">
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
          <p className='text-center text-gray-200'>Select a note to view details</p>
        )}  
      </div>
    </div>
  );
};

export default Dashboard;
