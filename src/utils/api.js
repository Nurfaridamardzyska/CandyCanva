// Dummy Data
const dummyNews = [
  { id: 1, title: "K-Pop Comeback Alert!", category: "kpop", content: "New releases from BLACKPINK, BTS, and more!" },
  { id: 2, title: "Taylor Swift Drops Surprise Album", category: "western", content: "The queen of pop is back!" },
];

// ✅ Ambil semua berita
export const fetchNews = async (category = '') => {
  if (!category) return dummyNews;
  return dummyNews.filter(item => item.category === category);
};

// ✅ Search berita
export const searchNews = async (keyword, category = '') => {
  return dummyNews.filter(item =>
    item.title.toLowerCase().includes(keyword.toLowerCase()) &&
    (category ? item.category === category : true)
  );
};

// ✅ Ambil kategori
export const fetchCategories = async () => {
  return [
    { id: "kpop", name: "K-Pop" },
    { id: "western", name: "Western" }
  ];
};

// ✅ Simulasi login
export const loginUser = async (credentials) => {
  return { token: "fake-token", user: { name: "User" } };
};

// ✅ Simulasi register
export const registerUser = async (userData) => {
  return { success: true };
};

// ✅ Fetch berita berdasarkan ID
export const fetchNewsById = async (id) => {
  return dummyNews.find(item => item.id === parseInt(id));
};
