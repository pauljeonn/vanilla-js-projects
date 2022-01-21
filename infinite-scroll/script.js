// DOM Manipulation
const imageContainer = document.getElementById('image-container');
const loaderContainer = document.getElementById('loader-container');
const loader = document.getElementById('loader');

// 사진 정보를 저장하는 photos 변수 생성
let photos = [];

// 이미지 로딩 관련 변수 생성
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKey = '2IUcEYfwmAKWojV64Nra2EPQGAcwoOb33UyZJzgVaSM';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Helper Function for setAttribute
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// 이미지 1개 로드될때마다 호출
function imageLoaded() {
	imagesLoaded++;
	console.log('images loaded');
	if (imagesLoaded === totalImages) {
		ready = true;
		loaderContainer.classList.add('hidden');
		loader.hidden = true;
		console.log(ready);
	}
}

// 이미지 및 링크 요소 생성 및 DOM에 추가하기
function displayPhotos() {
	// totalImages 갯수 설정 및 imagesLoaded 리셋
	totalImages = photos.length;
	imagesLoaded = 0;

	photos.forEach((photo) => {
		// Unsplash 링크 생성
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});
		// 이미지 생성
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// 이벤트 리스너 사용해서 이미지 한개씩 로드될때마다 체크
		img.addEventListener('load', imageLoaded);
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

// 페이지 바닥에 닿을 때 추가 사진 로드
window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// 자바스크립트 로드 시
getPhotos();
