const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// 이미지 변경 함수
function imageMode(mode) {
	image1.src = `img/undraw_proud_coder_${mode}.svg`;
	image2.src = `img/undraw_feeling_proud_${mode}.svg`;
	image3.src = `img/undraw_conceptual_idea_${mode}.svg`;
}

// 다크 모드 스타일
const darkMode = () => {
	nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
	textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
	// 다크 모드 텍스트 및 아이콘 변경
	toggleIcon.children[0].textContent = 'Dark Mode';
	toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
	// 다크 모드용 이미지로 변경
	imageMode('dark');
};

// 라이트 모드 스타일
const lightMode = () => {
	nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
	textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
	// 라이트 모드 텍스트 및 아이콘 변경
	toggleIcon.children[0].textContent = 'Light Mode';
	toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
	// 라이트 모드용 이미지로 변경
	imageMode('light');
};

// 동적으로 테마 변경
const switchTheme = (event) => {
	console.log(event.target.checked);
	if (event.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		// 로컬스토리지에 현재 테마 저장
		localStorage.setItem('theme', 'dark');
		darkMode();
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		// 로컬스토리지에 현재 테마 저장
		localStorage.setItem('theme', 'light');
		lightMode();
	}
};

// 이벤트 리스너 추가
toggleSwitch.addEventListener('change', switchTheme);

// 로컬 스토리지에 저장된 모드가 있는지 확인
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);

	// 저장된 테마가 다크 모드면 toggleSwitch 상태 변경 및 darkMode 함수 실행
	if (currentTheme === 'dark') {
		toggleSwitch.checked = true;
		darkMode();
	}
}
