import axios from 'axios';

//const apiUrl = process.env.NEXT_API_URL;
const apiUrl = 'http://localhost:8080/github-integration';


export const getRepo = async (repoName) => {
    const response = await axios.get(`${apiUrl}/get-branches/${repoName}`);

    return response.data;
}