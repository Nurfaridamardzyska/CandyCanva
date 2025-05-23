// Dummy Data
const dummyNews = [
  {
    id: 1,
    title: "BLACKPINK Announces World Tour 2025",
    category: "kpop",
    content: "BLACKPINK is taking over the world stage again!",
    imageUrl: "https://via.placeholder.com/600x300?text=BLACKPINK",
    longContent: "The K-pop sensation BLACKPINK has officially announced their highly anticipated world tour. The tour will kick off in Seoul and continue through major cities across Asia, Europe, and North America, promising an unforgettable experience for global fans."
  },
  {
    id: 2,
    title: "BTS's Jungkook Releases Solo Album",
    category: "kpop",
    content: "Jungkook goes solo with emotional new album.",
    imageUrl: "https://via.placeholder.com/600x300?text=Jungkook",
    longContent: "BTS member Jungkook has dropped his first full-length solo album titled 'Eternal'. The album showcases his versatility and features collaborations with several international artists, marking a significant milestone in his solo career."
  },
  {
    id: 3,
    title: "TWICE Celebrates 10-Year Anniversary",
    category: "kpop",
    content: "A decade of TWICE's music and memories.",
    imageUrl: "https://via.placeholder.com/600x300?text=TWICE+10+Years",
    longContent: "K-pop girl group TWICE is celebrating 10 incredible years in the industry. To mark the occasion, the group held a special fan meeting event and released a commemorative album, expressing gratitude for their fans' continuous love and support."
  },
  {
    id: 4,
    title: "NewJeans Drops Surprise Summer Single",
    category: "kpop",
    content: "NewJeans brings fresh vibes with summer hit.",
    imageUrl: "https://via.placeholder.com/600x300?text=NewJeans+Summer",
    longContent: "Rising K-pop group NewJeans has surprised fans with their new summer-themed digital single 'Sweet Dreams'. Accompanied by a vibrant and colorful music video, the track captures the essence of youthful summer energy."
  },
  {
    id: 5,
    title: "ENHYPEN Announces Fan Meeting Tour",
    category: "kpop",
    content: "Meet ENHYPEN in their upcoming Asia tour!",
    imageUrl: "https://via.placeholder.com/600x300?text=ENHYPEN+Tour",
    longContent: "Boy group ENHYPEN has revealed plans for a special fan meeting tour across Asia. The tour will allow fans to engage closely with the group through live interactions, exclusive performances, and behind-the-scenes content."
  },
  {
    id: 6,
    title: "IVE Wins Daesang at Golden Disc Awards",
    category: "kpop",
    content: "IVE claims the highest honor at GDA!",
    imageUrl: "https://via.placeholder.com/600x300?text=IVE+Daesang",
    longContent: "Girl group IVE has secured the prestigious Daesang (Grand Prize) at this year's Golden Disc Awards. The win highlights their rapid rise and solidifies their status as one of the leading forces in the K-pop industry."
  }
];




// ✅ Ambil semua berita
export const fetchAllNews = async () => {
  const response = await fetch('http://localhost:3001/news');
  if (!response.ok) throw new Error('Failed to fetch news');
  return await response.json();
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

// Ambil komentar berdasarkan ID berita
export const fetchCommentsByNewsId = async (newsId) => {
  const allComments = JSON.parse(localStorage.getItem("comments") || "{}");
  return allComments[newsId] || [];
};

// Simpan komentar baru
export const postComment = async (newsId, user, text) => {
  const allComments = JSON.parse(localStorage.getItem("comments") || "{}");
  const newComment = {
    id: Date.now(), // ID unik
    user,
    text
  };

  if (!allComments[newsId]) {
    allComments[newsId] = [];
  }

  allComments[newsId].push(newComment);
  localStorage.setItem("comments", JSON.stringify(allComments));

  return newComment;
};

export const addNews = async (newsData) => {
  try {
    const response = await fetch('http://localhost:3001/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsData),
    });

    if (!response.ok) {
      throw new Error('Failed to add news');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};


