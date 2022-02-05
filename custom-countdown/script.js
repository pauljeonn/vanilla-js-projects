const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

// 오늘 날짜로 Min Date 설정하기
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD만 가져오기
console.log(today);
dateEl.setAttribute('min', today);
