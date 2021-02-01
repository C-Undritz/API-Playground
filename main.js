//const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);// this will append the base url with the type that are parsing in (people, film, vehicles or species) 
    xhr.send();

    xhr.onreadystatechange = function() { 
        if (this.readyState == 4 && this.status == 200) { 
            cb(JSON.parse(this.responseText));
        } 
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];
    
    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });
    
    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = ""; // every time the button is clicked, the innerHTML will clear as it is set to an empty string here
    
    getData(url, function(data) {
        var pagination;
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous)
        }
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;
    });
}

// NOTES(Tabular Data - Part One)
// 1) Enter "object.keys", and then I pass in "item" here inside our forEach loop. And do another forEach loop inside, then we can actually iterate over each of these keys.  Add
//    a function inside here again, just like we have with our first forEach loop, and then add "console.log" each key.
// 2) So we save that and look on the browser, click on films, then you'll see that it gives me a list of all of the keys. And we can see that the problem is films doesn't have 
//    a key called "name".  It has "title" instead, which becomes a problem because we're dealing specifically with a name.
// 3) What we want to do is use this kind of approach to iterate over the keys to build ourselves a table full of data without actually explicitly specifying a property; And we 
//    can allow JavaScript to do that for us.
// 4) Create a new function called "getTableHeaders".  This is going to take in a single object, which we will call "obj".
// 5) Then created a new array called "tableHeaders", which we're going to initialize as an empty array.
// 6) Then we take our object and iterate over the keys with the forEach function once again.  This function inside this is going to iterate over each 'key' and push it to our 
//    tableHeaders array.
// 7) Now, we're not just going to push the key; we want this to be formatted nicely, so we're going to send in a <td> to create a new table cell, then the key, and then close our 
//    table cell
// 8) And what we're going to do is add each of those to a row using a template literal which allows us to interpolate variables and strings like this.  And then we are going 
//    to return the tableHeaders.
// 9) Back inside our writeToDocument function, we now need to invoke that function where we're calling our getTableHeaders.  So once we've retrieved our data with the getData(type) 
//    we'll call the getTableHeaders function pass through the first object in the array by referencing [0].
// 10) Then we will set the innerHTML of "el" to our table headers.  we're going to use the template literal again to send in a <table> using the tableHeaders variable in there:
//     el.innerHTML = `<table>${tableHeaders}</table>`;
// 11) Then on line 32, need to create the tableHeaders variable: "var tableHeaders = getTableHeaders(data[0])".
// 12) So now if you refresh the page and click on films, you can see we have a table row that contains each of the keys from a film object. So that's good; we don't have to specify 
//     name or any of the properties that are contained in our data. It's going to build the table for us.

// NOTES(Tabular Data - Part Two)
// 1) In the above, we put our table headers in place so now we need to start adding tabular data to the rest of our table.  To do this, we're going to create a new row of 
//    data for every record in the array.
// 2) Firstly, at the top of the writeToDocument() function we create a new empty array called tableRows which will house each row of data for us.
// 3) Then on row 38, following the {tableHeaders}, add that into a template literal: {tableRows}.  So we'll have our heading, and then we'll have rows of data.
// 4) Now in our forEach() function, what we need to do is create an empty array, first of all, for each individual row (var dataRow = []). And then we're going to iterate over 
//    our keys again using the same method as before, object.keys(item) using the forEach() method.  The function inside that is going to push each element onto our data row.
//    And what we want to do is create a new 'td', or tableCell element, for each of these items which we will do in our template literal here (line 39). We have {$item}, and 
//    then we pass in [key] as the index, so this will actually get us the data that's in each individual key. Rather than just the key name itself, we'll get the value.
// 5) When that row is created then, after it's iterated over, we need to push that row into our tableRows array: tableRows.push() and we want to push dataRow into our tableRows 
//    array.
// 6) Save and run this and Click on films and now we can see that we have the data being displayed. it's not terribly pretty, but it's tabular data nonetheless and it's functional.

// NOTES(Tabular Data - Part Three)
// 1) First thing that we need to do is to have everything appearing on a separate row.  So let's just put in a <tr> opening and a </tr> closing tag there when we're pushing 
//    on to our tableRows array: tableRows.push(`<tr>${dataRow}</tr>`);
// 2) The other thing that we need to do to get it displaying nicely is to truncate, or shorten, the information that's been inserted into our <td> element which means that 
//    it'll take up less space on the screen, and we won't have to keep scrolling out to the side.  We're not too worried about presentation, but we really just want to learn 
//    how to display this JSON data.
// 3) So created a new variable called rowData, which is going to be set to the value of the keyand we're going to make sure that that's a string.
// 4) Then created a new variable called truncatedData, which is going to be equal to a substring of our rowData.
// 5) And we're just going to take from the 0 to the 15th character.  So that will just take the first 15 characters from our rowData.
// 6) Now update my template literal here to show truncated data instead of rowData: dataRow.push(`<td>${truncatedData}</td>`);
// 7) Now when it is refreshed we can see that everything is displayed in a much nicer format. It fits neatly on the page.

