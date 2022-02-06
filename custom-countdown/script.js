const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

// 오늘 날짜로 Min Date 설정하기
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD만 가져오기
console.log(today);
dateEl.setAttribute('min', today);

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
}

// 이벤트 리스너
countdownForm.addEventListener('submit', updateCountdown);
