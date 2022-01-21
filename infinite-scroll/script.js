// DOM Manipulation
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// 사진 정보를 저장하는 photos 변수 생성
let photos = [];

// Unsplash API
const count = 10;
const apiKey = '2IUcEYfwmAKWojV64Nra2EPQGAcwoOb33UyZJzgVaSM';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// 이미지 및 링크 요소 생성 및 DOM에 추가하기
function displayPhotos() {
	photos.forEach((photo) => {
		// Unsplash 링크 생성
		const item = document.createElement('a');
		item.setAttribute('href', photo.links.html);
		item.setAttribute('target', '_blank');
		// 이미지 생성
		const img = document.createElement('img');
		img.setAttribute('src', photo.urls.regular);
		img.setAttribute('alt', photo.alt_description);
		img.setAttribute('title', photo.alt_description);
		// 링크 요소 안에 이미지 넣어주고, imageContainer 안에 링크 아이템 넣기
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Unsplash API에서 사진 가져오기
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photos = await response.json();
		displayPhotos();
	} catch (error) {
		console.log(error);
	}
}

getPhotos();
