// STEP 2: Create tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-backend.herokuapp.com/topics
// Once the data is resolved use console logs or breakpoints to review the structure.
// Iterate over the topics creating a new tab for each topic, and appending it to the DOM
// under the div.topics element.
//
//  Each tab should look like this:
//    <div class="tab">topic here</div>

// check out the response data
function displayDataInConsole() {

    axios.get("https://lambda-times-backend.herokuapp.com/topics")
        .then(response => {
            console.log("Data from https://lambda-times-backend.herokuapp.com/topics:");
            console.log(response);
        })
        .catch(error => {
            console.log("There was an error fetching data from https://lambda-times-backend.herokuapp.com/topics");
        })
        .finally(() => {
            console.log("Data retrieval process complete from https://lambda-times-backend.herokuapp.com/topics in displayDataInConsole()");
        });

}

// display the response data by calling it to find out what I need from the response
displayDataInConsole();

// The data I am interested in for this component is response.data.topics

// makes a tab from a value
function tabMaker(value) {

    const divTab = document.createElement("div");
    divTab.classList.add("tab");
    divTab.textContent = value;

    return divTab;

}

// creates tabs from whatever is returned from response.data.topics
function generateTabsFromAPI(parent) {

    axios.get("https://lambda-times-backend.herokuapp.com/topics")
        .then(response => {
            response.data.topics.forEach(value => {
                const tab = tabMaker(value);
                parent.appendChild(tab);
            });
        })
        .catch(error => {
            console.log("Error fetching data in generateTabsFromAPI()");
        })
        .finally(() => {
            console.log("generateTabsFromAPI API call has resolved in generateTabsFromAPI()")
        })

}

// grab the parent
const divTopics = document.querySelector(".topics");

// send parent to API call and tab generator
generateTabsFromAPI(divTopics);