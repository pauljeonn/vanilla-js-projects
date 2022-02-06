const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// 오늘 날짜로 Min Date 설정하기
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD만 가져오기
console.log(today);
dateEl.setAttribute('min', today);

// 남은 시간 계산 및 업데이트
function updateDOM() {
	const now = new Date().getTime();
	const remainingTime = countdownValue - now;

	const days = Math.floor(remainingTime / day);
	const hours = Math.floor((remainingTime % day) / hour);
	const minutes = Math.floor((remainingTime % hour) / minute);
	const seconds = Math.floor((remainingTime % minute) / second);

	// 카운트다운 정보 표시
	countdownElTitle.textContent = `${countdownTitle}`;
	timeElements[0].textContent = `${days}`;
	timeElements[1].textContent = `${hours}`;
	timeElements[2].textContent = `${minutes}`;
	timeElements[3].textContent = `${seconds}`;

	inputContainer.hidden = true;
	countdownEl.hidden = false;
}

// Form Input 값 가져오기
function updateCountdown(e) {
	e.preventDefault();
	// submit 정보에서 title과 date 값 추출
	countdownTitle = e.srcElement[0].value;
	countdownDate = e.srcElement[1].value;
	console.log(countdownTitle, countdownDate);
	// 추출한 date 값을 숫자로 변환
	countdownValue = new Date(countdownDate).getTime();
	console.log(countdownValue);
	updateDOM();
}

// 이벤트 리스너
countdownForm.addEventListener('submit', updateCountdown);
