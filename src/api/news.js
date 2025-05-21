// api/news.js
import axios from 'axios';

// Base URL for the API
// Replace with your actual API endpoint if you have a backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// For demonstration, we'll use localStorage if no backend is available
const LOCAL_STORAGE_KEY = 'sweet_kpop_news';

// Sample initial data
const sampleNewsData = [
  {
    id: '1',
    title: "BLACKPINK Announces World Tour 2025",
    summary: "The K-pop sensation BLACKPINK has announced their highly anticipated world tour, set to begin in Seoul before heading to major cities across Asia, Europe, and North America.",
    content: "BLACKPINK, one of the biggest K-pop groups globally, has announced their 2025 World Tour titled 'PINK PLANET'. The tour will kick off with two shows in Seoul's Olympic Stadium before traveling to major cities including Tokyo, Bangkok, Los Angeles, New York, London, and Paris. This marks the group's second world tour and is expected to be even bigger than their previous 'BORN PINK' tour which broke several attendance records.",
    image: "https://via.placeholder.com/400x300/FF66B2/FFFFFF?text=BLACKPINK+Tour",
    category: "Concert",
    publishedAt: "2025-05-15T09:00:00Z"
  },
  {
    id: '2',
    title: "BTS's Jungkook Releases Solo Album",
    summary: "BTS member Jungkook has released his first full-length solo album 'Eternal', featuring collaborations with several international artists.",
    content: "Jungkook, the youngest member of global K-pop phenomenon BTS, has finally released his highly anticipated solo album 'Eternal'. The album features 12 tracks including collaborations with several international artists. The title track 'Forever Young' has already broken streaming records within hours of its release. This marks Jungkook's first full album release since his debut solo single 'Still With You' in 2020.",
    image: "https://via.placeholder.com/400x300/FF66B2/FFFFFF?text=Jungkook+Album",
    category: "Release",
    publishedAt: "2025-05-10T10:30:00Z"
  },
  {
    id: '3',
    title: "TWICE Celebrates 10-Year Anniversary",
    summary: "K-pop girl group TWICE celebrates their 10-year anniversary with a special fan meeting event and the release of a commemorative album.",
    content: "TWICE, one of K-pop's most beloved girl groups, is celebrating their 10-year anniversary this month. To mark this significant milestone, the group announced a special fan meeting event to be held at the KSPO Dome in Seoul, as well as the release of a commemorative album titled 'TWICE: A Decade of Memories'. The album will feature new versions of their biggest hits along with two brand new songs.",
    image: "https://via.placeholder.com/400x300/FF66B2/FFFFFF?text=TWICE+Anniversary",
    category: "Celebrity",
    publishedAt: "2025-05-18T14:45:00Z"
  }
];

// Initialize local storage with sample data if it doesn't exist
const initializeLocalStorage = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sampleNewsData));
  }
};

// Helper to check if we should use localStorage
const isUsingLocalStorage = () => {
  // Try to make a simple call to the API
  return axios.get(`${API_URL}/api/health-check`)
    .then(() => false) // API is available, don't use localStorage
    .catch(() => true); // API error, use localStorage
};

// Fetch all news
export const fetchNews = async () => {
  try {
    // Try to use the API first
    if (await isUsingLocalStorage()) {
      // If API fails, use localStorage
      initializeLocalStorage();
      const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      return data;
    } else {
      // API is available
      const response = await axios.get(`${API_URL}/api/news`);
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    // Fallback to localStorage on any error
    initializeLocalStorage();
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    return data;
  }
};

// Fetch a single news item by ID
export const fetchNewsById = async (id) => {
  try {
    // Try to use the API first
    if (await isUsingLocalStorage()) {
      // If API fails, use localStorage
      initializeLocalStorage();
      const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      const newsItem = data.find(item => item.id === id);
      if (!newsItem) throw new Error('News not found');
      return newsItem;
    } else {
      // API is available
      const response = await axios.get(`${API_URL}/api/news/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching news with ID ${id}:`, error);
    throw error;
  }
};

// Add a new news item
export const addNews = async (newsData) => {
  try {
    // Try to use the API first
    if (await isUsingLocalStorage()) {
      // If API fails, use localStorage
      initializeLocalStorage();
      const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      
      // Generate a new ID
      const newId = Date.now().toString();
      const newNewsItem = { ...newsData, id: newId };
      
      // Add to the data array
      data.push(newNewsItem);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      
      return newNewsItem;
    } else {
      // API is available
      const response = await axios.post(`${API_URL}/api/news`, newsData);
      return response.data;
    }
  } catch (error) {
    console.error('Error adding news:', error);
    throw error;
  }
};

// Update an existing news item
export const updateNews = async (id, newsData) => {
  try {
    // Try to use the API first
    if (await isUsingLocalStorage()) {
      // If API fails, use localStorage
      initializeLocalStorage();
      let data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      
      // Find the index of the news item
      const index = data.findIndex(item => item.id === id);
      if (index === -1) throw new Error('News not found');
      
      // Update the news item
      const updatedNewsItem = { ...data[index], ...newsData, id };
      data[index] = updatedNewsItem;
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      return updatedNewsItem;
    } else {
      // API is available
      const response = await axios.put(`${API_URL}/api/news/${id}`, newsData);
      return response.data;
    }
  } catch (error) {
    console.error(`Error updating news with ID ${id}:`, error);
    throw error;
  }
};

// Delete a news item
export const deleteNews = async (id) => {
  try {
    // Try to use the API first
    if (await isUsingLocalStorage()) {
      // If API fails, use localStorage
      initializeLocalStorage();
      let data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      
      // Filter out the news item with the given ID
      data = data.filter(item => item.id !== id);
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      return true;
    } else {
      // API is available
      await axios.delete(`${API_URL}/api/news/${id}`);
      return true;
    }
  } catch (error) {
    console.error(`Error deleting news with ID ${id}:`, error);
    throw error;
  }
};