let apiQuotes = [];

// New quote
function newQuote() {
	// Get a random quote
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	console.log(quote);
	return quote;
}

// Get quotes from API
async function getQuotes() {
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (err) {
		console.log(err);
	}
}

// On load
getQuotes();
