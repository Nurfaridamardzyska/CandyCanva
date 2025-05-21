import React, { useState, useEffect } from 'react';
import { fetchNews, addNews, updateNews, deleteNews } from '../../api/news';

const Admin = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for news form
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [currentNewsId, setCurrentNewsId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'Release',
    image: '',
    publishedAt: new Date().toISOString().split('T')[0],
  });

  // States for form display
  const [showForm, setShowForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Fetch all news on component mount
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await fetchNews();
      setNewsList(data);
      setError(null);
    } catch (err) {
      setError('Failed to load news. Please try again.');
      console.error('Error loading news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Reset form to default values
  const resetForm = () => {
    setFormData({
      title: '',
      summary: '',
      content: '',
      category: 'Release',
      image: '',
      publishedAt: new Date().toISOString().split('T')[0],
    });
    setCurrentNewsId(null);
    setFormMode('add');
    setSubmitStatus(null);
  };

  // Open form for adding new news
  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
    setFormMode('add');
  };

  // Open form for editing existing news
  const handleEdit = (news) => {
    setFormData({
      title: news.title,
      summary: news.summary,
      content: news.content || '',
      category: news.category,
      image: news.image,
      publishedAt: new Date(news.publishedAt).toISOString().split('T')[0],
    });
    setCurrentNewsId(news.id);
    setFormMode('edit');
    setShowForm(true);
    setSubmitStatus(null);
  };

  // Handle news deletion with confirmation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await deleteNews(id);
        setNewsList(newsList.filter(news => news.id !== id));
        setSubmitStatus({ success: true, message: 'News deleted successfully!' });
        setTimeout(() => setSubmitStatus(null), 3000);
      } catch (err) {
        setSubmitStatus({ success: false, message: 'Failed to delete news. Please try again.' });
        console.error('Error deleting news:', err);
      }
    }
  };

  // Handle form submission for both add and edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    try {
      // Prepare the news data
      const newsData = {
        ...formData,
        publishedAt: new Date(formData.publishedAt).toISOString(),
      };

      let result;
      
      if (formMode === 'add') {
        // Add new news
        result = await addNews(newsData);
        setNewsList([...newsList, result]);
        setSubmitStatus({ success: true, message: 'News added successfully!' });
      } else {
        // Update existing news
        result = await updateNews(currentNewsId, newsData);
        setNewsList(newsList.map(news => news.id === currentNewsId ? result : news));
        setSubmitStatus({ success: true, message: 'News updated successfully!' });
      }

      // Close form after short delay to show success message
      setTimeout(() => {
        setShowForm(false);
        resetForm();
      }, 2000);
    } catch (err) {
      setSubmitStatus({ 
        success: false, 
        message: `Failed to ${formMode === 'add' ? 'add' : 'update'} news. Please try again.` 
      });
      console.error(`Error ${formMode === 'add' ? 'adding' : 'updating'} news:`, err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  // Custom icon components
  const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );

  const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Admin header */}
      <div className="bg-pink-600 py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">Sweet K-Pop Admin</h1>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Status message */}
        {submitStatus && (
          <div className={`mb-4 p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitStatus.message}
          </div>
        )}

        {/* News management section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">News Management</h2>
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <PlusIcon /> Add New
            </button>
          </div>

          {/* Loading and error states */}
          {loading ? (
            <div className="text-center py-10">
              <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full mx-auto animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading news...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : newsList.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No news found. Add your first news item!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-pink-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">Published Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {newsList.map((news) => (
                    <tr key={news.id} className="hover:bg-pink-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full object-cover" src={news.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{news.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-600">
                          {news.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(news.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleEdit(news)} 
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <EditIcon />
                        </button>
                        <button 
                          onClick={() => handleDelete(news.id)} 
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Form for adding/editing news */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="bg-pink-500 text-white py-4 px-6 rounded-t-lg flex justify-between items-center">
                <h3 className="text-xl font-semibold">{formMode === 'add' ? 'Add New News' : 'Edit News'}</h3>
                <button 
                  onClick={handleCancel}
                  className="text-white hover:text-pink-200"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                    <textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    >
                      <option value="Release">Release</option>
                      <option value="Concert">Concert</option>
                      <option value="Celebrity">Celebrity</option>
                      <option value="Event">Event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
                    <input
                      type="date"
                      name="publishedAt"
                      value={formData.publishedAt}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                    {formData.image && (
                      <div className="mt-2 w-24 h-24 overflow-hidden rounded-lg border border-gray-200">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image'}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                  >
                    {formMode === 'add' ? 'Add News' : 'Update News'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;