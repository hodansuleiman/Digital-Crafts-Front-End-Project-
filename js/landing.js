
// this function will help us by taking the numbers and adds commas 
function numberWithCommas(x) { // add comma to number 
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//setting up setInterval method used to animate the front page heading 
setInterval( ()=>{
 let h1Special = document.querySelector("h1");
h1Special.classList.remove("animateOut");
h1Special.classList.add("animateIn");
}, 1000)


// Event listener listening to click on the submit button , and that will trigger a fetch request to the API endpoint
let submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click",(event)=>{
    event.preventDefault();  // cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur
    let cityValue = document.querySelector("#inputCity").value;
    let stateValue = document.querySelector("#inputState").value;
    
    console.log("data:", cityValue, stateValue)


    let inputState = document.querySelector("#inputState").value //we get i here // reference to input field element on html pg with id attribute of "input state". Then value property retrives the value and assigns to the input state variable. 
    let inputCity = document.querySelector("#inputCity").value //we get i here // reference to input field element on html pg with id attribute of "input city". Then value property retrives the value and assigns to the input city variable. 
    let optionFilter = document.querySelector("#filterOption").value; // reference to select dropdown element on html pg with id attribute of "filter options". Then value property retrives the value and assigns it to variable called 'optionFilter'
    console.log(optionFilter)
    let state = inputState.trim(); //2 letter character // assign the value of input state to variable called state // trim spaces within user input
    let city = inputCity.trim();  // assign the value of input city to variable called city //  // trim spaces within user input
    let dropdownChoice = optionFilter; // sets the value of 'dropdownchoice' to a string 'buy'
    //let dropdownsecondchoice = "rent"


    let query = "https://realty-mole-property-api.p.rapidapi.com/"; // sets initial value of a the variable 'query' to the URL for the API endpoint // end points will be added via swith statements 

    switch (dropdownChoice){ // this switch statement that will determine the API endpoint to query based on the value of the dropdownChoice variable.
        case "buy": query += "saleListings"; break; // i will add string "properties" to to the 'query' variable if the value of 'dropdownchoice' is "Buy".  Breaks end the code block. 
        case "rent": query += "rentalListings"; break; //  i will add the string "rental listenings" to the 'query' variable if the value of 'dropdownchoice' is "Rent".  Breaks end the code block.
    } // switch statement ends here 



    query += "?" 

    if(city !== ""){ //if city is not empty add city
      query += "city=" + city 
    }

    if(city !== "" && state !== ""){ //if both city and state are not empty prep the & because to do two paramaters the formula is ?key-value&key2=value2
      query += "&" 
    }

    
    if(state !== ""){
      query += "state=" + state
    }
    
    
    
    + "&limit=20"  ; //"&" + "state=" + state // string concatenation 
    // ? is the start of the query parameters, which are used to provide additional information to the server for a request
    // string "city=" is concatenated next, followed by the value of the city variable
    // basically we are creating one long string where we are  adding on to tp the query the value of 'city_name' which is replaced with the actual value of the 'city; variable

    // console.log("final query:", query);

    // console.log("q1", query);
    // query = "https://realty-mole-property-api.p.rapidapi.com/saleListings?city=Austin&limit=500";
    // console.log("q2", query);

    fetch(query,{
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '073e8d9172mshdb82d5e4353d0c8p10487bjsnc51b2de1e97b',
            'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
        }
    })
    .then(response => response.json())
	.then(data => {
      console.log("data",data)
      document.querySelector("#search").style.display = "none"; // hide search display box
    

      //add listings to the page
      data.forEach((d, i)=>{ // for each loop on the data array which is an array of objects that contains info about each property listing
          let listingsEl = document.querySelector("#listings") // select html element of  listings and assigns it to listingEL variable
          listingsEl.style.display = "flex";
          document.querySelector("#listingHeader").textContent = dropdownChoice; // selects the HTML element with an ID of listingHeader and sets its textContent property to the selected dropdownChoice
          document.querySelector("#listingHeader").style.display = "block";
          let imgEl = document.createElement("img"); // creates new image
          //console.log("property type?",d.propertyType)
          let randomImage = Math.floor(Math.random() * 19);
          let imgId = "";
          if(d.propertyType === 'Land'){ // i want to drill down if data propertyType is equal to Land pull the land image 
            imgId = "land";
            imgEl.setAttribute("src", "./images/land.jpg");
  
          } else if(d.propertyType==="Apartment"){ // i want to drill down if data propertyType is equal to apartment pull the apartment image 
            imgId = "apartment";
            imgEl.setAttribute("src", "./images/apartment.jpg"); 

          } else if(d.propertyType==="Condo"){ // i want to drill down if data propertyType is equal to condo pull the condo image 
            imgId = "condo";
            imgEl.setAttribute("src", "./images/condo.jpg");

           } else if(d.propertyType==="Single Family"){ // i want to drill down if data propertyType is equal to condo pull the condo image 
            imgId = "1";
            imgEl.setAttribute("src", "./images/1.jpg");

           } else { 
            imgId = randomImage;
            imgEl.setAttribute("src", "./images/" + randomImage + ".jpg");
          }
       
          //console.log(imgEl);
          let divEl = document.createElement("div"); // created new div element and assigned it to divEL
          let divElDetails = document.createElement("div"); // created new div element and assigned it to divEL
          let h4El = document.createElement("p"); // created new h4 element and assigned it to h3EL
          h4El.textContent =  d.formattedAddress; // sets the textContent property of the h4 element to the formatted address of the current listing, with a number and a dot before it.
          let pEl = document.createElement("h4"); // created new p element and assigned it to pEL
          pEl.textContent = "$" + numberWithCommas(d.price); //  set the textContent property of the pEl element to a string that includes a dollar sign and the price property of the current listing object (d). The numberWithCommas() function is called to add commas to the price for readability.
          let secPEL = document.createElement("p");
          secPEL.textContent = d.propertyType;
          let buttonEl = document.createElement("button"); // created new button element and assign it to the varibLE buttonEL 
          buttonEl.classList = "btn btn-custom"
          buttonEl.textContent = "See Details" // set textcontent property of the butttonEL element to a string (see details). This sets the text that will be displayed on the button


          divEl.appendChild(imgEl); // appended to div element 
          divElDetails.appendChild(pEl);// appended to div element 
          divEl.appendChild(divElDetails);
          divElDetails.appendChild(h4El);// appended to div element 
 
          divElDetails.appendChild(secPEL);
          divElDetails.appendChild(buttonEl);// appended to div element 
  
          listingsEl.appendChild(divEl); // div element is appended to the listings element in html 


          buttonEl.addEventListener("click", () => { // adds an event listener to the buttonEL element that listens for a click event 
            console.log("Clicked on listing #" + (i + 1)); // i want to know which property listing was clicked based on its index in the data array in the console
            window.location.href = `details.html?type=${dropdownChoice}&id=${d.id}&imgId=${ imgId}`; // sets the window.location.href property to a string that includes the ID of the current listing (d.id) and the index of the image associated with the current listing (i). This causes the browser to navigate to a new page (details.html) with the ID and image index included in the URL as query parameters, which can be used to retrieve the details for the selected listing on the details page.
          }); //end of eventlistner
    
     
    }) //end of foreach
  
   
    console.log(data) // logging data in console log
   


    }) //end of then

  }) //end of submit btn
