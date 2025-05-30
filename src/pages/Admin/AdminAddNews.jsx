import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNews, fetchCategories } from '../../api/api';
import axios from 'axios'; // Tambahkan ini

const AdminAddNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null); // Tambahkan ini
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
      if (cats.length > 0) setCategoryId(cats[0].id); // default pilih category pertama
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", categoryId); // <-- ubah ke snake_case
    formData.append("image", image);

    const token = localStorage.getItem('token');

    await axios.post("/api/news", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Lanjutkan...
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
        <select
          className="w-full p-2 border rounded mb-3"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setImage(e.target.files[0])}
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
