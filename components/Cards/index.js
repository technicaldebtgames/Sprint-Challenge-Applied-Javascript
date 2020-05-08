// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each 'article' in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Use your function to create a card for each of the articles and add the card to the DOM.

// check out the response data
function displayDataInConsole() {

    axios.get("https://lambda-times-backend.herokuapp.com/articles")
        .then(response => {
            console.log("Data from https://lambda-times-backend.herokuapp.com/articles:");
            //response.data.articles.forEach(category => {
            //    console.log(category);
                //category.forEach(value => {
                //    console.log(value);
                //});
            //}); // this doesn't work and I am not sure why
            console.log(response.data.articles);
            console.log(response.data.articles.bootstrap); // these work fine
        })
        .catch(error => {
            console.log("There was an error fetching data from https://lambda-times-backend.herokuapp.com/articles");
        })
        .finally(() => {
            console.log("Data retrieval process complete from https://lambda-times-backend.herokuapp.com/articles in displayDataInConsole()");
        });

}

// display the response data by calling it to find out what I need from the response
displayDataInConsole();

// The data I am interested in for this component is response.data.articles.["category_name"] (each is an array)
//
// These contain articles which are objects with the following:
//  authorName: string
//  authorPhoto: string of a relative path
//  headling: string

// makes a card from a dataObj with authorName, authorPhoto, and headline properties
function cardMaker(value) {

    const divCard = document.createElement("div");
    const divHeadline = document.createElement("div");
    const divAuthor = document.createElement("div");
    const divImgContainer = document.createElement("div");
    const imgAuthor = document.createElement("img");
    const spanAuthorName = document.createElement("span");

    divCard.classList.add("card");
    divHeadline.classList.add("headline");
    divAuthor.classList.add("author");
    divImgContainer.classList.add("img-container");
    
    divHeadline.textContent = value.headline;
    imgAuthor.src = value.authorPhoto;
    spanAuthorName.textContent = "By " + value.authorName;

    divCard.appendChild(divHeadline);
    divCard.appendChild(divAuthor);
    divAuthor.appendChild(divImgContainer);
    divImgContainer.appendChild(imgAuthor);
    divAuthor.appendChild(spanAuthorName);

    return divCard;

}

// creates tabs from whatever is returned from response.data.topics
function generateCardsFromAPI(parent) {

    axios.get("https://lambda-times-backend.herokuapp.com/articles")
        .then(response => {
            //Array.from(response.data.articles).forEach(category => {
            //    Array.from(category).forEach(value => {
            //        const card = cardMaker(value);
            //        parent.appendChild(card);
            //    });
            //}); // these don't work and I am not sure why, tried with/without Array.from()
            response.data.articles.bootstrap.forEach(value => {
                const card = cardMaker(value);
                parent.appendChild(card);
            });
            response.data.articles.javascript.forEach(value => {
                const card = cardMaker(value);
                parent.appendChild(card);
            });
            response.data.articles.jquery.forEach(value => {
                const card = cardMaker(value);
                parent.appendChild(card);
            });
            response.data.articles.node.forEach(value => {
                const card = cardMaker(value);
                parent.appendChild(card);
            });
            response.data.articles.technology.forEach(value => {
                const card = cardMaker(value);
                parent.appendChild(card);
            });
        })
        .catch(error => {
            console.log("Error fetching data in generateCardsFromAPI()");
        })
        .finally(() => {
            console.log("generateCardsFromAPI API call has resolved in generateCardsFromAPI()");
        })

}

// grab the parent
const divCardsContainer = document.querySelector(".cards-container");

// send parent to API call and tab generator
generateCardsFromAPI(divCardsContainer);