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

getData(function(data) {
    console.log(data);
})





// NOTES (Callback)
// 1) Took away data variable and create a new function called "getData".
// 2) The moved all of the code that we use for our xhr request into that function.
// 3) We can take out the "setTimeout" function here now too because we don't need it anymore.
// 4) Add the parameter 'cb' (for callback) to the function getData and this will be the function that we pass in.
// 5) Then use cb on line 9 here, that's going to actually run the function that we pass in as a callback on the first line.
// 6) for this to work we need to invoke a getData method with a function inside the parentheses. This is an anonymous function and it's just going to say "console.log(data).
//    with also 'data' passed in as a parameter inside the braces.
// 7) So when this runs, what it will do is pass itself (itself meaning: (function(data) {console.log(data);}) in as a function (line 1) which will then be executed on line 9 
//    where 'cd' is referenced and therefore the 'data' part will reference 'JSON.parse(this.responseText)'.  Therefore when it console.logs(data), it will be the response 
//    text through the JSON parse.  
// 8) We now do not need to set a timeout here is because we are explicitly invoking our getData function.  Within this we are checking to see if our readyState is 4 and 
//    the status is equal to 200.  Only at that stage, we're then invoking our callback function that we passed through as an argument.
// 9) So what this basically means is that when our script gets to this point (line 9), it's going to run the function that we passed in to getData as an argument.  This 
//    This gives us more control with the code base.
