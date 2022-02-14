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

// Build Bookmarks DOM
function buildBookmarks() {
	// 기존에 있던 북마크 제거
	bookmarksContainer.textContent = '';
	// 북마크 요소 생성
	bookmarks.forEach((bookmark) => {
		const { name, url } = bookmark;
		// Item
		const item = document.createElement('div');
		item.classList.add('item');
		// Close icon
		const closeIcon = document.createElement('i');
		closeIcon.classList.add('fas', 'fa-times');
		closeIcon.setAttribute('title', 'Delete Bookmark');
		closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
		// Link container
		const linkInfo = document.createElement('div');
		linkInfo.classList.add('name');
		// Link
		const link = document.createElement('a');
		link.setAttribute('href', `${url}`);
		link.setAttribute('target', '_blank');
		link.textContent = name;
		// Append to bookmarks container
		linkInfo.append(link);
		item.append(closeIcon, linkInfo);
		bookmarksContainer.appendChild(item);
	});
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
	buildBookmarks();
}

// Delete bookmark
function deleteBookmark(url) {
	bookmarks.forEach((bookmark, i) => {
		if (bookmark.url === url) {
			bookmarks.splice(i, 1);
		}
	});
	// localStorage 업데이트 및 북마크 리렌더링
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();
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
	fetchBookmarks();
	bookmarkForm.reset();
	websiteNameEl.focus();
}

// Event listener
bookmarkForm.addEventListener('submit', storeBookmark);

// 자바스크립트 로드 시, bookmarks 가져오기
fetchBookmarks();
