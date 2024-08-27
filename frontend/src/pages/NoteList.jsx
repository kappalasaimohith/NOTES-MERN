import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './NoteList.css';

const apiurl = import.meta.env.VITE_API_URL;

const NoteList = ({ notes, setNotes }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [editNoteId, setEditNoteId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [showReadMore, setShowReadMore] = useState({});
  const contentRefs = useRef({});

  const token = localStorage.getItem('token');

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    setLoadingId(id);
    try {
      await axios.delete(`${apiurl}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setLoadingId(null);
    }
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
    <div className="p-6 min-h-screen bg-gradient-to-r rounded-lg from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-full">
        {notes.length === 0 ? (
          <p className="text-center text-white col-span-full">No notes available.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-teal-300 p-4 rounded-lg shadow-xl transform transition-transform hover:shadow-2xl relative overflow-hidden border-2 border-teal-400 scrollableContent"
            >
              <div className="absolute top-0 right-0 p-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(note)}
                  disabled={loadingId === note._id}
                  className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full focus:outline-none transition-transform transform hover:scale-110"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  disabled={loadingId === note._id}
                  className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-full focus:outline-none transition-transform transform hover:scale-110"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                  {note.title[0]}
                </div>
                <h3 className="text-3xl font-semibold text-teal-800">{note.title}</h3>
              </div>
              <div
                ref={(el) => (contentRefs.current[note._id] = el)}
                className={`transition-all duration-300 ease-in-out ${expandedNoteId === note._id ? 'max-h-[80vh] overflow-auto' : 'max-h-80 overflow-hidden'} scrollableContent`}
              >
                <p className="text-gray-800 mt-2">{note.content}</p>
              </div>
              {showReadMore[note._id] && (
                <button
                  onClick={() => toggleExpandNote(note._id)}
                  className="text-blue-500 m-2 focus:outline-none hover:underline"
                >
                  {expandedNoteId === note._id ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {editNoteId && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
          <form
            onSubmit={handleUpdate}
            className="bg-gray-800 p-8 rounded-lg shadow-2xl w-11/12 max-w-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-teal-600">Edit Note</h2>
            <label className="block mb-4">
              <span className="text-gray-200 text-lg font-medium">Title</span>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="form-input mt-1 block w-full border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-gray-900"
                required
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-200 text-lg font-medium">Content</span>
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="form-textarea mt-1 block w-full border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-gray-900"
                rows="6"
                required
              />
            </label>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-700 text-white px-5 py-2 rounded-md shadow-md"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditNoteId(null)}
                className="bg-gray-600 hover:bg-gray-800 text-white px-5 py-2 rounded-md shadow-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NoteList;
