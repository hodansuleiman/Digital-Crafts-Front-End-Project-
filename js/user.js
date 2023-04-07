
let submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", (event)=>{ // adds event listener to submit btn element and listens for click. when clicked function inside parentheses is called. The function that is being called is the event and it is anonymous. 

    //get dropdown data
    //get state
    //city

    let inputState = document.querySelector("#inputState").value //we get i here // reference to input field element on html pg with id attribute of "input state". Then value property retrives the value and assigns to the input state variable. 
    let inputCity = document.querySelector("#inputCity").value //we get i here // reference to input field element on html pg with id attribute of "input city". Then value property retrives the value and assigns to the input city variable. 
    let optionFilter = document.querySelector("#filterOption").value; // reference to select dropdown element on html pg with id attribute of "filter options". Then value property retrives the value and assigns it to variable called 'optionFilter'
    console.log(optionFilter)
    let state = inputState; //2 letter character // assign the value of input state to variable called state
    let city = inputCity; // assign the value of input city to variable called city
    let dropdownChoice = "buy"; // sets the value of 'dropdownchoice' to a string 'buy'
    //let dropdownsecondchoice = "rent"


    let query = "https://realty-mole-property-api.p.rapidapi.com/"; // sets initial value of a the variable 'query' to the URL for the API endpoint // end points will be added via swith statements 

    switch (dropdownChoice){ // this switch statement that will determine the API endpoint to query based on the value of the dropdownChoice variable.
        case "buy": query += "properties"; break; // i will add string "properties" to to the 'query' variable if the value of 'dropdownchoice' is "Buy".  Breaks end the code block. 
        case "rent": query += "rentalListings"; break; //  i will add the string "rental listenings" to the 'query' variable if the value of 'dropdownchoice' is "Rent".  Breaks end the code block.
    } // switch statement ends here 

    query += "?" + "city=" + city ; //"&" + "state=" + state // string concatenation 
    // ? is the start of the query parameters, which are used to provide additional information to the server for a request
    // string "city=" is concatenated next, followed by the value of the city variable
    // basically we are creating one long string where we are  adding on to tp the query the value of 'city_name' which is replaced with the actual value of the 'city; variable

    console.log("final query:", query);

    fetch(query,{
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '073e8d9172mshdb82d5e4353d0c8p10487bjsnc51b2de1e97b',
            'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
        }
    })
    .then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

})