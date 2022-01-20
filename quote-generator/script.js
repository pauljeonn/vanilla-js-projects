// HTML 요소 접근
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('quote-author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// 로딩 함수
function startLoading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// 로딩 완료 함수
function finishLoading() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

// 새로운 명언 함수
function newQuote() {
	startLoading();
	// 랜덤 명언 선택
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	console.log(quote);
	if (!quote.author) {
		quote.author = 'Unknown';
	}
	authorText.textContent = quote.author;

	// 명언 텍스트 길이에 따라 스타일링 변경
	if (quote.text.length > 50) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	// 명언 텍스트 할당 후 로딩 멈추기
	quoteText.textContent = quote.text;
	finishLoading();
}

// API에서 quotes 가져오기
async function getQuotes() {
	startLoading();
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (err) {
		console.log(err);
	}
}

// 트위터에 명언 남기기
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	// 새로운 탭에서 트위터 url 열기
	window.open(twitterUrl, '_blank');
}

// 이벤트 리스너 추가
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

// 자바스크립트 로드 시 작동
getQuotes();
