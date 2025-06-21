// Array of quote objects
const quotes = [
    { 
        text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", 
        author: "Albert Einstein" 
    },
    { 
        text: "Strive not to be a success, but rather to be of value.", 
        author: "Albert Einstein" 
    },
    { 
        text: "A room without books is like a body without a soul.", 
        author: "Marcus Tullius Cicero" 
    },
    { 
        text: "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.", 
        author: "Dr. Seuss" 
    },
    {
        text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
        author: "Wayne Gretzky"
    },
    {
        text: "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
        author: "J.K. Rowling, Harry Potter and the Goblet of Fire"
    },
    {
        text: "If you tell the truth, you don't have to remember anything.",
        author: "Mark Twain"
    },
    {
        text: "Whether you think you can or you think you can't, you're right.",
        author: "Henry Ford"
    }
];


const quoteTextElement = document.getElementById('quoteText');
const quoteAuthorElement = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');


let lastQuoteIndex = -1;

function displayNewQuote() {
    let randomIndex;
    
    if (quotes.length > 1) {
        do {
            randomIndex = Math.floor(Math.random() * quotes.length);
        } while (randomIndex === lastQuoteIndex);
    } else if (quotes.length === 1) {
        randomIndex = 0; 
    } else {
        // If there are no quotes
        quoteTextElement.textContent = "No quotes available at the moment.";
        quoteAuthorElement.textContent = "";
        return;
    }

    lastQuoteIndex = randomIndex; 
    const randomQuote = quotes[randomIndex];
    quoteTextElement.innerHTML = `"${randomQuote.text}"`; 
    quoteAuthorElement.innerHTML = `-- ${randomQuote.author}`;
}

newQuoteBtn.addEventListener('click', displayNewQuote);
