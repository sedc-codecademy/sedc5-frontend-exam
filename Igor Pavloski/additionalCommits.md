<h2>Commit #2 ------------------------------------------------------------------------------</h2>
1. Added <strong>Delete Book</strong> function for deleting a table row;
2. Made series and series number into one column;
3. Added <strong>bootstrap-select.js script</strong>.
4. New header image;

<h2>Commit #3 ------------------------------------------------------------------------------</h2>
1. Publisher <strong>select bug</strong> fixed (forgot to add this.publisher = publisher; in the Book class);

<h2>Commit #4 ------------------------------------------------------------------------------</h2>
1. Made alert to notify if title or author for the novel is not entered;
2. Made alert to notify if title, editor or atleast 2 stories for the anthology are not entered;
3. Removed <strong>publisher</strong> and <strong>year of Publication</strong> columns and added <strong>Publishing information</strong> column containing both;
4. Removed <strong>author</strong> and <strong>editor</strong> columns and added them in <strong>author/editor</strong> column that shows author for novels and editor for anthology;
5. Removed <strong>Series/Series#</strong> and <strong>Stories</strong> columns and added new column <strong>Additional Information</strong> containing <strong>series(# )</strong> if it's a novel or <strong>Number of stories and their author/s</strong> if it's an anthology;
6. Added the <strong>displayStoryAuthors()</strong> function that returns <strong>${author}</strong> or <strong>${numberOfAuthors} authors</strong>depending if there is only one author or more then one authors;
7. Created 2 new variables <strong>infoNovel</strong> and <strong>infoAnthology</strong>. If the book is novel <strong>additionalInformation</strong> gets the value of <strong>infoNovel</strong> or if anthology then gets the value of <strong>infoAnthology</strong>;
8. Removed the <strong>Novel</strong> and <strong>Anthology</strong> classes. Made it so there is no need for more classes then one, the <strong>Book</strong> class.
9. Removed the <strong>Year of Publication</strong> input and put <strong>select with search</strong>. The options for the new select are generated with a newly added function <strong>optionsGenerator()</strong>;
10. Added the <strong>number of pages validation</strong> (from 1 to 1000). Now on input change there is a function checking if the number is in the range and giving alert messages accordingly;
11. Added a new div called <strong>alertEmptyInputs</strong> that is under the author/editor input and when the title,author or editor are empty, the alert goes red under them.
12. Added a new div called <strong>alertPages</strong> that is under the pages input and when the page number is <1 or >1000 it goes red;
13. Added a new div called <strong>alertSuccess</strong> that is under the Save Button and when the book is saved successfully it goes green;
14. Put the <strong>jquery-confirm.js</strong> and <strong>jquery-confirm.css</strong> scripts for the <strong>Delete Book button</strong> alert comfirmation, put all the code for deleteBook into a jquery confirm alert;

<h2>Commit #5 ------------------------------------------------------------------------------</h2>
1. Optimizied the code for alert messages. Made similar alerts into function which will be called with different parameter for different alerts. (<strong>successAlert(bookType), emptyInputsAlert(whatToFill), pagesAlert(range)</strong>);
2. Added validation for the ISBN input. The string can only contain digits and it must be 15 digits long. Used the regex <strong>/^(\d{15})$/</strong>;
3. Added if statement that cuts the <strong>Review to 50 characters</strong>. If it is longer then 50, cuts first 47 characters and adds three dots;
4. Added onkeyup function to the search input. Also added a <strong>filter dropdwon menu</strong> in which you can choose the criteria for the search. Criterias: Title, Author/Editor and Length;
5. Added <strong>Sort By<strong> button in the table header. Clicking it makes all the table headers buttons that sort that column by their value;
