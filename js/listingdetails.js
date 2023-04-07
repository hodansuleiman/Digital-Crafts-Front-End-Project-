

let urlParams = new URLSearchParams(window.location.search); // creates a new URLSearchParams object that extracts the query parameters from the URL in the current window
let id = urlParams.get('id'); //  retrieves the value of the 'id' parameter from the URL query string using the get(insert what you're redirecting) method
let imgId = urlParams.get('imgId'); // retrieves the value of the 'imgId' parameter from the URL query string using the get(insert what you're redirecting) method.

let detailsEl = document.querySelector("#details"); // retrieves the element with an ID of "details" from the DOM and stores it in the detailsEl variable
let type = urlParams.get('type'); // "sale"; sets the value of the type variable to "sale"

let query = ""; // The query variable is set based on the value of type.  
if(type == "buy"){ //buy
    query = `https://realty-mole-property-api.p.rapidapi.com/saleListings/${id}`; // If type is "sale", the query variable is set to the API endpoint for sale listings with the id parameter inserted
} else { //rent
    query = `https://realty-mole-property-api.p.rapidapi.com/rentalListings/${id}`; // If type is not "sale", the query variable is set to the API endpoint for rental listings with the id parameter inserted
}

function numberWithCommas(x) { // add comma to number // takes a number as an argument and returns a string with commas added to the thousands places
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


function createLine(value, targetEl, exist, tag = "p"){ // utility function that creates a new element with the specified tag and text content, and appends it to the specified target element if the exist parameter is not undefined
    console.log("check?", exist);
    if(exist === undefined){
        return ""
    }
    let tempEl = document.createElement(tag);
    tempEl.textContent = value;
    targetEl.appendChild(tempEl);

}

console.log("this is m y query", query)

fetch(query, {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '073e8d9172mshdb82d5e4353d0c8p10487bjsnc51b2de1e97b',
        'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
    }
}).then(response => response.json())
.then(data=>{
    console.log("detail data", data)

    let imgEl = document.createElement("img"); // creates new image element 
    imgEl.setAttribute("src", "./images/" + imgId + ".jpg");
    detailsEl.appendChild(imgEl) // appends the image element to the detailsEL element 

    createLine(data.formattedAddress, detailsEl, data.formattedAddress, "h2"); // creates a new h2 element with the formatted address of the property and appends it the detailsEL element 
    createLine("Property Type: " + data.propertyType, detailsEl, data.propertyType); // creates a new p element with the property type and appends it to the listingEL element 
    createLine( "$" + numberWithCommas(data.price), detailsEl, data.price);
    createLine(data.squareFootage + "sqft", detailsEl, data.squareFootage);
    createLine("Bedrooms: " + data.bedrooms, detailsEl, data.bedrooms);
    createLine("Bathroom:" + data.bathrooms, detailsEl, data.bathrooms);
    createLine("Year built: " + data.yearBuilt, detailsEl, data.yearBuilt);


    let interestedBtn = document.createElement("button");
    interestedBtn.textContent = "Interested?";
    interestedBtn.classList = "btn btn-primary";
    detailsEl.appendChild(interestedBtn)
    interestedBtn.addEventListener("click",()=>{
        contactForm.style.display = "block";
    });
   

    


})