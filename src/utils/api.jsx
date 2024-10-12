import axios from 'axios';

export const fetchQuestions = async (amount = 5, type = 'boolean') => {
    try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&type=${type}`);
        if (response.data.response_code === 0) {
            return response.data.results;
        } else {
            throw new Error('Gagal mengambil data soal');
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};