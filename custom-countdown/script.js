const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// 오늘 날짜로 Min Date 설정하기
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD만 가져오기
dateEl.setAttribute('min', today);

// 남은 시간 계산 및 디스플레이
function updateDOM() {
	countdownActive = setInterval(() => {
		const now = new Date().getTime();
		const remainingTime = countdownValue - now;

		inputContainer.hidden = true;

		if (remainingTime < 0) {
			clearInterval(countdownActive);
			completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;

			countdownEl.hidden = true;
			completeEl.hidden = false;
		} else {
			// 남은 시간 계산
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

			completeEl.hidden = true;
			countdownEl.hidden = false;
		}
	}, 1000);
}

// Form Input 값 가져오기
function updateCountdown(e) {
	e.preventDefault();
	// submit 정보에서 title과 date 값 추출
	countdownTitle = e.srcElement[0].value;
	countdownDate = e.srcElement[1].value;
	// 카운트다운 저장
	savedCountdown = {
		title: countdownTitle,
		date: countdownDate,
	};
	// 자바스크립트 객체를 JSON string으로 변환하여 로컬스토리지에 저장
	localStorage.setItem('countdown', JSON.stringify(savedCountdown));

	// 날짜가 비어있으면 경고 표시
	if (countdownDate === '') {
		alert('Please select a date!');
	} else {
		// 추출한 date 값을 숫자로 변환
		countdownValue = new Date(countdownDate).getTime();
		updateDOM();
	}
}

// 리셋
function reset() {
	countdownEl.hidden = true;
	completeEl.hidden = true;
	inputContainer.hidden = false;

	// 카운트다운 정지
	clearInterval(countdownActive);
	countdownTitle = '';
	countdownDate = '';

	// 로컬스토리지 삭제
	localStorage.removeItem('countdown');
}

// 저장한 카운트다운 불러오기
function restoreCountdown() {
	// 로컬스토리지에서 정보 가져오기
	if (localStorage.getItem('countdown')) {
		inputContainer.hidden = true;
		savedCountdown = JSON.parse(localStorage.getItem('countdown'));
		countdownTitle = savedCountdown.title;
		countdownDate = savedCountdown.date;
		countdownValue = new Date(countdownDate).getTime();
		updateDOM();
	}
}

// 이벤트 리스너
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// 자바스크립트 로드 시, 로컬스토리지 확인
restoreCountdown();
