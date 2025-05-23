import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNews } from '../../utils/api';

const AdminAddNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNews({ title, content, comments: [] });
      alert('Berita berhasil ditambahkan!');
      navigate('/'); // atau redirect ke dashboard admin
    } catch (err) {
      setError('Gagal menambahkan berita. Coba lagi.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Tambah Berita</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded mb-3"
          placeholder="Isi berita"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded" type="submit">
          Tambah Berita
        </button>
      </form>
    </div>
  );
};

export default AdminAddNews;
