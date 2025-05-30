const API_BASE_URL = 'http://localhost:1212/api';

// Helper untuk dapatkan header Authorization dan Content-Type
const getAuthHeaders = (isJson = true) => {
  const token = localStorage.getItem('token');
  return {
    ...(isJson ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Fungsi umum request dengan fetch, otomatis stringify jika ada body dan set headers
const apiRequest = async (endpoint, method = 'GET', body = null, requiresAuth = false, isJson = true, token = null) => {
  const headers = {};
  if (isJson) headers['Content-Type'] = 'application/json';
  if (requiresAuth && token) headers['Authorization'] = `Bearer ${token}`;

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = isJson ? JSON.stringify(body) : body;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }

  // Kalau response 204 No Content biasanya tidak ada JSON
  if (response.status === 204) return null;

  // Jika bukan JSON response (misal file download), handle secara berbeda
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }

  return await response.text();

};

// --- Fungsi News ---

export const addNews = async (newsData) => {
  try {
    const token = localStorage.getItem('token');

    console.log('Token:', token);
    console.log('News Data to Submit:', {
      ...newsData,
      category_id: newsData.category_id,
      image_url: newsData.image, // pastikan snake_case
    });

    const response = await fetch(`${API_BASE_URL}/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...newsData,
        category_id: newsData.category_id,
        image_url: newsData.image, // pastikan snake_case
      }),
    });

    console.log('Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server responded with error:', errorText);
      throw new Error(`Failed to add news: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('News added successfully:', result);

    return result;
  } catch (error) {
    console.error('Error adding news:', error);
    throw error;
  }
};



export const updateNews = async (id, newsData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...newsData,
        category_id: newsData.category_id,
        image_url: newsData.image, // pastikan snake_case
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update news: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
};

export const deleteNews = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete news: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
};

export const fetchCommentsByNewsId = async (newsId) => {
  return await apiRequest(`/comments/${newsId}`);
};

export const addComment = async (newsId, content) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.ID || user?.id;

  if (!userId) {
    throw new Error('User ID not found. Make sure user is logged in and stored correctly.');
  }

  // Kirim camelCase sesuai backend
  return await apiRequest('/comments', 'POST', {
    newsId,      // camelCase
    content,
    userId,      // camelCase
  }, true, true, token);
};

export const fetchAllNews = async (includeCategories = true) => {
  try {
    const [newsData, categories] = await Promise.all([
      apiRequest('/news'),
      includeCategories ? fetchCategories() : Promise.resolve([]),
    ]);

    return newsData.map(item => {
      const category = categories.find(
        cat => String(cat.id) === String(item.CATEGORY_ID || item.category_id)
      );
      return {
        id: item.id || item.ID || item._id,
        title: item.title || item.TITLE || 'Untitled',
        content: item.content || item.CONTENT || '',
        category_id: item.category_id || item.CATEGORY_ID || '',
        categoryName: category ? category.name : '', // jangan Unknown, biar kelihatan kalau memang kosong
        imageUrl: item.image_url || item.IMAGE_URL || '',
        publishedAt: item.publishedAt || item.CREATED_AT || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Failed to fetch all news:', error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return [];
    }

    if (!response.ok) throw new Error(`Failed to fetch categories: ${response.status}`);

    const data = await response.json(); // langsung array

    return data.map(cat => ({
      id: cat.ID,
      name: cat.NAME
    }));

  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};


export const searchNews = async (keyword, category = '') => {
  try {
    const params = new URLSearchParams();
    if (keyword) params.append('search', keyword);
    if (category && category !== 'All') params.append('category', category);

    const url = `/news/search?${params.toString()}`;
    return await apiRequest(url);
  } catch (error) {
    console.error('Search API failed:', error);
    return [];
  }
};


export const fetchNewsById = async (id) => {
  const data = await apiRequest(`/news/${id}`);
  return {
    id: data.id || data.ID || data._id,
    title: data.title || data.TITLE || 'Untitled',
    content: data.content || data.CONTENT || '',
    category_id: data.category_id || data.CATEGORY_ID || '',
    imageUrl: data.image_url || data.IMAGE_URL || '',
    publishedAt: data.publishedAt || data.CREATED_AT || new Date().toISOString(),
    // tambahkan field lain jika perlu
  };
};

// --- Auth API ---

export const authAPI = {
  register: (userData) => apiRequest('/auth/register', 'POST', userData),
  login: (loginData) => apiRequest('/auth/login', 'POST', loginData),
  getProfile: () => apiRequest('/user/profile', 'GET', null, true),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  },
};

// --- User API ---

export const userAPI = {
  updateProfile: (userData) => apiRequest('/user/profile', 'PUT', userData, true),
  getAllUsers: () => apiRequest('/admin/users', 'GET', null, true),
};

// --- Product API ---

export const productAPI = {
  getAllProducts: () => apiRequest('/products'),
  getProduct: (id) => apiRequest(`/products/${id}`),
  createProduct: (productData) => apiRequest('/products', 'POST', productData, true),
};

// --- Utility ---

export const apiUtils = {
  getToken: () => localStorage.getItem('token'),
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: () => !!localStorage.getItem('token'),
  isAdmin: () => localStorage.getItem('role') === 'admin',
};

// --- Default export ---

const api = {
  auth: authAPI,
  user: userAPI,
  product: productAPI,
  utils: apiUtils,
};

export default api;
