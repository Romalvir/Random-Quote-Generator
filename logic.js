
// 1 This will select the element and store it in a container 
const newQuoteButton = document.querySelector('#js-new-quote');
// 2 This will listen for a click and then run the second argument
newQuoteButton.addEventListener("click", getQuote);

//4 API URL store it in a variable too !
const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

//spinner
const spinner = document.querySelector('#js-spinner');

// 3 Next we declare  a fucntion that will execute a code
async function getQuote() {
	// remove the "hidden" class on the spinner
  spinner.classList.remove('hidden');
  // disable the quote button
  newQuoteButton.disabled = true;
  // The `try` block executes the statements within it as usual.
  // If an exception is thrown, the statements defined in
  // the `catch` block will be executed.
  // Learn more here: https://javascript.info/try-catch
  try {
    const response = await fetch(endpoint)
    // If the response is not 200 OK...
    if (!response.ok) {
      // ...throw an error. This causes control flow
      // to skip to the `catch` block below.
      throw Error(response.statusText)
    }

    const json = await response.json();
    displayQuote(json.message);
  } catch (err) {
    console.log(err)
    alert('Failed to fetch new quote');
  }finally {
    // enable the quote button
    newQuoteButton.disabled = false;
    // add the "hidden" class back again
    spinner.classList.add('hidden');
  }
}

//display it within the application interface
function displayQuote(quote) {
  const quoteText = document.querySelector('#js-quote-text');
  quoteText.textContent = quote;
}