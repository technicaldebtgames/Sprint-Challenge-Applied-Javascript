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
            
            //
            //response.data.articles.forEach(category => {
            //    console.log(category);
                //category.forEach(value => {
                //    console.log(value);
                //});
            //}); // this doesn't work and I am not sure why
            //

            //
            //for (let i = 0; i < response.data.articles.length; i++) {
            //    console.log(articles[i]);
            //} // also does not work, probably because articles doesn't have a length property?
            //

            //
            //response.data.articles.forEach(value => {
            //    console.log(value);
            //}); // causes error as well
            //

            //
            //Array.from(response.data.articles).forEach(value => {
            //    console.log(value);
            //}); // no error, doesn't log data
            //

            //
            // Another test section:
            
            //const categories = Array.from(response.data.articles); // creates an array of 0 length w no items
            
            //let categories = response.data.articles; // tried let, const, var
            //categories = Array.from(categories); // creates a 0 length array as well

            //const categories = response.data.articles;
            //for (const val in categories){
            //    val.forEach(item => {
            //        console.log(item);
            //    })
            //} // causes error to be thrown

            //const categories = response.data.articles;
            //for (let i = 0; i < categories.length; i++){
            //    console.log(categories[i]);
            //} // no data output, 0 length array/object

            //console.log(categories);
            
            // End Another test section.
            //

            console.log(response.data.articles);
            console.log(response.data.articles.bootstrap); // these work fine, so I will just call them manually
            
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
            }); // I don't like calling them like this but I am not sure what the solution is to
                // not being able to have categories be iterated over (shown above in the data output
                // to console function).
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