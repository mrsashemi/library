# odin-library
Created as part of the Odin Project curriculum.

**Introduction**
The goal of this project is to use Objects and Object constructors in Javascript to create a Library App where the user can save and track books they've read.

**Functionality**
The page has a very simple layout in which the user is prompted to add books. Upon clicking the add button, a modal box with a form displays asking the user to enter the book name, author name, page count, and whether or not they have read the book. 

Upon submitting an entry, the book is stored locally in the browser. From there, the user has to option to toggle whether or not a book as been read and to delete books from their library. 

**Process**
Coming off the intermediate HTML/CSS section of the odin project, this project was a nice review of JS for me. I did find certain aspects of the project challenging, specifically creating a delete button for the books.

My process was as follows:

1) Create basic html and CSS layout with the intention of using Grid to display the books
2) Create an Array and a book object constructor in JS
3) Create a function to create HTML Divs/grid items for each object in the Array, and add   document selectors
4) Create a placeholder object and add to the Array in order to test the function from the previous step
5) Create a basic form in HTML and a function that adds an object to the array upon submitting the form
6) Turn form into a modal pop-up with JS and CSS
7) Create a delete button each Object
8) Create a function to toggle READ and NOT READ
9) Add local storage to the app and test to make sure objects are being stored correctly

**Closing Thoughts**
I'm quite happy with how this app turned out! It's much simpler than my previous projects.

The delete buttons gave me somewhat of a headache as I initially had trouble figuring out the best way to identify the index of the book object in the array. Initially, the button would delete the div, but the object was still stored in the array. To solve the issue, I added a hidden object property representing an ID number that is used to identify the order of the object in the array, from there I created a function to splice the array.

In the future, I'd like to add cloud storage, log in button, and more object properties to the Book constructors for additional information (like what page the user is on).
