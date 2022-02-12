const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// Show modal, focus on input
function showModal() {
	modal.classList.add('show-modal');
	websiteNameEl.focus();
}

// Modal event listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () =>
	modal.classList.remove('show-modal')
);
window.addEventListener('click', (e) =>
	e.target === modal ? modal.classList.remove('show-modal') : false
);

// Validate form
function validate(nameValue, urlValue) {
	const expression =
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
	const regex = new RegExp(expression);
	if (!nameValue || !urlValue) {
		alert('Please submit values for both fields.');
	}
	if (!urlValue.match(regex)) {
		alert('Please provide a valid web address');
		return false;
	}
	// Valid
	return true;
}

// Fetch bookmarks
function fetchBookmarks() {
	// localStorage에 bookmarks가 있으면 가져오기
	if (localStorage.getItem('bookmarks')) {
		bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	} else {
		// localStorage에 bookmarks 배열 생성
		bookmarks = [
			{
				name: 'Google',
				url: 'https://google.com',
			},
		];
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
}

// Handle data from form
function storeBookmark(e) {
	e.preventDefault();
	const nameValue = websiteNameEl.value;
	let urlValue = websiteUrlEl.value;
	// http 또는 https가 없는 urlValue를 입력받으면 자동으로 https 추가해주기
	if (!urlValue.includes('http:;//') || !urlValue.includes('https://')) {
		urlValue = `https://${urlValue}`;
	}
	if (!validate(nameValue, urlValue)) {
		return false;
	}
	const bookmark = {
		name: nameValue,
		url: urlValue,
	};
	bookmarks.push(bookmark);
	// localStorage에 bookmarks 저장
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	bookmarkForm.reset();
	websiteNameEl.focus();
}

// Event listener
bookmarkForm.addEventListener('submit', storeBookmark);

// 자바스크립트 로드 시, bookmarks 가져오기
fetchBookmarks();
