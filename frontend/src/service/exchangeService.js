import axios from 'axios';


export const getExchangeRate = async () => {
    try {
        const response = await axios.get(`http://apilayer.net/api/live?access_key=2a349994112baa23ed1ee9e91d910529&currencies=VND&source=USD&format=1`);
        return response.data.quotes.USDVND;
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        return null;
    }
};