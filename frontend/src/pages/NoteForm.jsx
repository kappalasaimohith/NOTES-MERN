import { useState } from 'react';
import axios from 'axios';

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
    <div className="max-w-sm mx-auto p-6 rounded-2xl shadow-lg">
      {!isFormVisible ? (
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Create a New Note
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Create a New Note</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter note title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your note here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                rows="4"
              ></textarea>
            </div>
            <div className='flex justify-between space-x-12'>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Add Note
            </button>
            <button
              type="button"
              onClick={() => setIsFormVisible(false)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Cancel
            </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default NoteForm;
