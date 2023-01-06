const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '42b7d7e344msh77a41addf263d41p1392f0jsn579753d4289b',
		'X-RapidAPI-Host': 'open-weather-map27.p.rapidapi.com'
	}
};

fetch('https://open-weather-map27.p.rapidapi.com/weather', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));