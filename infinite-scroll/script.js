// DOM Manipulation
const imageContainer = document.getElementById('image-container');

// Unsplash API
const count = 10;
const apiKey = '2IUcEYfwmAKWojV64Nra2EPQGAcwoOb33UyZJzgVaSM';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Unsplash API에서 사진 가져오기
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}

getPhotos();
