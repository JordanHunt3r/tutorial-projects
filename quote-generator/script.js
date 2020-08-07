const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loader
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner(){
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get quote from API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const respone = await fetch(proxyUrl + apiUrl);
        const data = await respone.json();
         if(data.quoteAuthor === '') {
             authorText.innerText = 'Unknown';
         } else {
             authorText.innerText = data.quoteAuthor;
         }
         //Reduce quote font size
         if(data.quoteText.length > 50) {
             quoteText.classList.add('long-quote');
         } else {
             quoteText.classList.remove('long-quote');
         }
        quoteText.innerText = data.quoteText;
        //Stop Loader
        hideLoadingSpinner();
    } catch (error) {
        quoteText.innerText = 'Oops! There was an error!'
        authorText.innerText = 'Unknown';
        hideLoadingSpinner();
        //getQuote();
        console.log("Error! ", error);
    }
}

//Tweet
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);


//On Load
getQuote();