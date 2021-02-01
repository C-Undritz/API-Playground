const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL + type + "/");// this will append the base url with the type that are parsing in (people, film, vehicles or species) 
    xhr.send();

    xhr.onreadystatechange = function() { 
        if (this.readyState == 4 && this.status == 200) { 
            cb(JSON.parse(this.responseText));
        } 
    };
}

function writeToDocument(type) {
    var el = document.getElementById("data");
    el.innerHTML = ""; // every time the button is clicked, the innerHTML will clear as it is set to an empty string here
    getData(type, function(data) {
        console.dir(data);
        data = data.results;

        data.forEach(function(item) {
            el.innerHTML += "<p>" + item.name + "</p>";
        });
    });
}

// NOTES (Getting the Data onto the Page)
// 1) Remove my call to getData and function printDataToConsole and then create a new function here called "writeToDocument".
// 2) This takes one parameter called "type" and when we say "type", we mean the type that comes from the API.  So that would be a film, people, starships, vehicles, species, so on.
// 3) With that function it is going to call our getData function and parse in the type parameter as a first argument and then the second argument is going to be our function that 
//    uses "document.getElementByID".  It's going to get the div which has the ID of data and set the innerHTML to the data that gets parsed into this function.
// 4) Modify our getData function and parse in a type.
// 5) Then took the base url from the xhr.open command and moved it ourside of the function.  Then created a constant called "baseURL" so that never changes and assigned the 
//    API url that we have for that that we've been using so far, in "" so that it is a string.
// 6) Now inside our 'open' method, instead of the string, what we can actually do is parse in "baseURL + type".   also added a trailing "/" as well after the type.
// 7) Then added insode HTML the buttons and added to each of the buttons an onclick event which invokes that 'writeToDocument' function and parses ina string value which is the
//    relevant type.
// 8) When this is then run we have adjacent object printing to the screen, which is great. That's exactly what we would want.  Of course, that data isn't terribly useful to 
//    us just yet because all it's telling us is that we have an object.

// NOTES (Unpacking Our Data onto the DOM)
// 1) The first thing we need to do, is determine how to access it.  So this time, we're going to use a "console.dir".  dir stands for directory and we parse in our data.
// 2) When the code is then run, an output to the console will allow us to browse through the object and see its format.
// 3) So we can see there that we have an array called "results" and this contains an array of 10 items which are 10 different people in the arrangement from Luke Skywalker 
//    down to Obi-Wan Kenobi at the end.
// 4) We also have a URL called "next".  That's for pagination, so we just show 10 items at a time. When we click on the "next" button, it will show us the next 10 items, 
//    and so on and so forth.  
// 5) So if we want to display this, then what we need to do is set our innerHTML to "data.results".  So then you refresh your page and click on people you will then have 10
//    objects rendered.  This is doing what we expect, but they still need to be unpacked further.
// 6) So what we're going to do instead of using "data.results" in 'document.getElementById("data").innerHTML = data.results;' we're going to overwrite our existing data 
//    variable with "data.results": data = data.results.  So this will then give us the values from the results we see above (console.dir results).
// 7) Now we can do is a 'for each' loop.  We are  going to say "data.forEach", so 'for each element in data', it's going to run this function, it's going to take the item and 
//    then we are just going to take the same code that we used before: document.getElementById("data").innerHTML = data.results;.  Instead of "data.results", we're going 
//    to say "item";.
// 8) If we run that again we get [object Object] again, but this time, we're getting one individual object as opposed to 10.  Which means that our 'for' loop is working just 
//    not quite correctly at the moment
// 9) What we want to do is display the name; now that we have this unpacked into JSON format, we can just do "item.name".  the we can see we get returned Obi-Wan Kenobi, which is
//    an issue because we know that the first person i the list is Luke Skywalker.  But for the time-being, this is working. I can click on the other buttons. They all work, apart 
//    from films.  The reason is because films doesn't actually have a property called "name".
// 10) So we can see then that the reason why only one item has been displayed is because every time I call the "document.getElementByID" innerHTML method, it's overwriting it.
//     so we nee to add "+=".  if we then run it:
// 11) I now have all of the people displayed.  Now we could improve how that looks if I put in <p> tags surrounding the item name:
// 12) But as I click on the other buttons, you will see that all of the information has just been appended on to the page every time and with films, when we click on that, we 
//     have a lot of undefined objects here at the end.  This is not what we want.  We want to just display 10 items at a time for clarity.  And we don't want it all mixed 
//     together like that.
// 13) So what we're going to do, then, is I'm going to create a variable called "el", short for element and store our data ID in there (var el = document.getElementByID("data"))
//     Then every time the button is clicked, I'm going to set the innerHTML of our element to an empty string.  So that will clear it every time the button is clicked.
// 14) We can the replace the code within the 'for each' loop from 'document.getElementById("data").innerHTML' to 'el.innerHTML'. SO when this is run we're having 10 items 
//     displayed at a time.






