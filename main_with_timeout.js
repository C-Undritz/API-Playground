var xhr = new XMLHttpRequest(); //New instance of XMLHttpRequest.  This is an inbuilt object 
                                //that JavaScript provides to allow us to consume APIs; gives 
                                //us the method to open connections, to send connections, and close them.
var data;

xhr.open("GET", "https://ci-swapi.herokuapp.com/api/"); //we have the below listener, this opens a connection 
                                                        //which parses in the GET method followed by the URL
xhr.send();

//function setData(jsonData) {
//    data = jsonData;
    //console.log(data);
//}

xhr.onreadystatechange = function() { //create new function which is a listener waiting for xhr's state to change
    //console.log(this.readyState); //will print out the ready state every time the function is invoked.
    if (this.readyState == 4 && this.status == 200) { //for when ever the state changes of our xhr object we want to run a check
        //document.getElementById("data").innerHTML = this.responseText;
        //console.log(typeof(this.responseText));
        //console.log(typeof(JSON.parse(this.responseText)));
        //console.log(JSON.parse(this.responseText));
        //data = this.responseText;
        //console.log(data);
        //setData(JSON.parse(this.responseText));
        data = JSON.parse(this.responseText);
    } //when the state changes, we'll check to see if the ready state is 4 and if everything went well, then 
      //we're going to get a div ID of "data", and put the response text in it.
};

setTimeout(function() {
    console.log(data);
}, 500);

//console.log(data);

// NOTES(xhr):
// 1) XML stands for Extensible Markup Language, which is similar to HTML in the way it structures its data, and it's a precursor to JSON.
// 2) Then we have the xhr.open() method, and the first argument that we parse in is "GET".
//      a) There are several different methods that we can use to communicate with a web server.  The two that you're going to use most often are GET and POST.
//      b) The GET method is used when we're retrieving data from the server. This is a standard one that a browser uses when retrieving a web page.
//      c) POST is used when we're sending data to the server, such as an uploaded file or form data.
//      d) Since in this instance we want to retrieve data from the Star Wars API, then we're going to use the GET method.
// 3) The second argument is the URL that we want to retrieve.
// 4) Then we do xhr.send() to send the request.
// 5) The main chunk of what's going on in this piece of code is in this onreadystatechange() function.  The xhr object maintains an internal state as it's completing various parts 
//    of our request operation.  And "readyState = 4" means that the operation has been completed.
// 6) Then we're looking at an HTTP status code.  The HTTP status code of 200 means "OK".
// 7) So once everything is okay, we then use some JavaScript to getElementById() from the DOM and change its innerHTML to the response text that comes back from our xhr object.

// NOTES(JSON):
// 1) What we're actually working with is a string that's formulated to look like JSON.
// 2) We can confirm that if we do a console.log() and use the typeof() method, which will tell us what type of variable we have here, and pass in "this.responseText".
// 3) It is a string, not an object which we would expect if it were JSON; it is just a string that looks like JSON.
// 4) So need to parse this string into a JSON data structure, similar to how we did with Python in a previous video using the JSON.parse()method.
// 5) So if we type "console.log(typeof(JSON.parse(this.responseText)))" it returns an object
// 6) We can the actually return the object to the console with console.log(JSON.parse(this.responseText));
// 7) If we expand the nodes we can see each of the properties and the values associated with those properties inside the console
// 8) Now, what we would imagine then, is that we could maybe store this in a variable and manipulate the response text.  Let's try that. We'll create one called data "var data"
//    and inside the function type "data = this.responseText".  We would expect then, that outside of this function, we can type console.log(), and log our data variable. Well, 
//    unfortunately, we don't get the result that we were expecting: 'undefined'.

// NOTES(Getting Functional):
// 1) Why doesn't our "console.log(data)" work?  Well there's a very good reason for this which is that the "onreadystatechange" function only sets the data variable to contain 
//    the response text when the ready state equals 4 and the status equals 200.
// 2) Our function has been called five times by the time that our data variable is set, whereas our "console.log" is only ever called once, right after we've run "xhr.send".
// 3) So this means that when we run "console.log(data)", it doesn't have anything in there yet; data is not set until after "console.log" has been called, which is why 
//    we're getting a response of undefined.
// 4) If we move the "console.log" data into line 10, just after where we set the variable within the loop, then it works fine.
// 5) The problem with this is it means that all of the work we need to do with data would have to be done inside the "xhr.onreadystatechange" function, which could make 
//    things really messy and complicated because all of the code for our application could potentially end up inside this function.
// 6) So, to get the data out of the xhr function, we could create a separate function which we can parse our data into.
// 7) Create new function called 'setData' which parses in 'jsonData' and we will set a the variable data to equal this parsed variable.
// 8) Then what I just need to do is call my function "setData" with the 'ahr.onreadystatechange if statement: setData(JSON.parse(this.responseText)), which JSON Parses 'this' 
//    response text  This will send through a JSON parsed object into our setData function.
// 9) We then "console.log" my data and we can see that we get our JSON object, which we can expand just as we did before.  This is also called deserializing our JSON.
// 10) But we have the same problem: If I move "console.log(data)" to the bottom of the file, it goes back to being undefined again.  So that means that everything for our 
//     function could now end up in the setData function.  We've just moved the problem away by one step.  JavaScript has a number of ways of dealing with this: timeouts and 
//     callbacks.

// NOTES(Timeout!)
// 1) let's have a look at what's actually happening inside our onreadystatechange() function.  So put another console.log in the xhr.onreadystatechange function: 
//    'console.log(this.readyState);'.  This will print out the ready state every time the function is invoked.  This function gets called more than once, so we 
//    should see more than one log to the console for every single time the function is called, not just when the readyState is equal to 4 and the status is equal to 200.
//    We can see there that we have a very interesting output.
// 2) Undefined is where we called our console.log(data) that is at the bottom, outside of the loop.  But as we can see, that's getting called long before we have a readyState 
//    of 4, which means that the data isn't actually set until long after we've done our console.log down on line 29. So what we could do is use a setTimeout function.
// 3) The setTimeout function takes two parameters.  The first is a callback function.  So we can actually write a function in here as our first argument and what we're 
//    just going to do is say "console.log(data)".
// 4) The second argument is a parameter in milliseconds, the time in milliseconds that we want our program to wait for (set here as 500 milliseconds which should be plenty 
//    of time to allow our function to do its thing.
// 5) we can see there now, console.log is actually printing our data because we're telling the console.log to wait, to hold off from being executed for 500 milliseconds which
//    gives our "onreadystatechange" function plenty of time to reach a ready state of 4.
// 6) This means we can actually remove our setData function and go back to the previous code that we had here which was "data = JSON.parse(this.responsiveText);"
// 7) So now you can see that our data is actually being displayed after we set the timeout and that's how we can get our code to wait on execution.


