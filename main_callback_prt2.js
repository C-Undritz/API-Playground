function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://ci-swapi.herokuapp.com/api/"); 
    xhr.send();

    xhr.onreadystatechange = function() { 
        if (this.readyState == 4 && this.status == 200) { 
            cb(JSON.parse(this.responseText));
        } 
    };
}

function printDataToConsole(data) {
    console.log(data);
}

getData(printDataToConsole); 


//NOTES
// What we could also do instead of actually writing the function inside the brackets for getData, is we could write a separate function.
// 1) Create a new function called "printDataToConsole" that's going to take in "data" as an argument and, as before, that's going to console.log the data.
// 2) Inside the brackets, when I'm calling the getData function, I'm going to pass in the "printDataToConsole" function as an argument.  Notice I don't put 
//    the opening and closing brackets because I'm parsing in the actual function itself.  Run that and you will see the data logged to the onsole once again.
