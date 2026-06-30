const axios = require('axios');

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

exports.searchMeals = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search || '';
    
    // Jika ada kata kunci pencarian, lakukan pencarian normal
    const response = await axios.get(`${API_BASE_URL}/search.php?s=${query}`);
    
    res.json({
      success: true,
      data: response.data.meals || []
    });
  } catch (error) {
    console.error('Error fetching from TheMealDB:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data makanan dari server.'
    });
  }
};

exports.getMealById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
    
    if (!response.data.meals || response.data.meals.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Makanan tidak ditemukan.'
      });
    }

    res.json({
      success: true,
      data: response.data.meals[0]
    });
  } catch (error) {
    console.error('Error fetching from TheMealDB:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail makanan dari server.'
    });
  }
};
