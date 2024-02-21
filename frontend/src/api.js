import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf',
  headers: {
    'X-RapidAPI-Key': 'e78bf361acmsh7e9eee6da651b7bp11d947jsnc0a16b8b8774',
    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}