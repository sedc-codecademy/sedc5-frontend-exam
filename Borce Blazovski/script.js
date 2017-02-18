$(()=>{
  let nameTitle = $("#nameTitle");
  let nameAuthor = $("#nameAuthor");
  let namePublisher = $("#nameAuthor");
  let nameYear = $("#nameYear");
  let nameLength = $("#nameLength");
  let nameSeries = $("#nameSeries");
  let nameSeriesNumber = $("#nameSeriesNumber");
  let nameISBN = $("#nameISBN");
  let nameReview = $("#nameReview");
  let nameStories = $("#nameStories");
    

})
class Novel {
  constructor(title, author, publisher, year, lengts, series, nameSeriesNumber, ISBN, review){
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.year = year;
    this.lengts = length;
    this.series = series;
    this.nameSeriesNumber = nameSeriesNumber;
    this.ISBN = ISBN;
    this.review = review;
  }



}

class Anthologies {
  constructor(title, editor, publisher, year, lengts, stories,ISBN, review){
    this.title = title;
    this.editor = editor;
    this.publisher = publisher;
    this.year = year;
    this.lengts = length;
    this.stories = stories;
    this.ISBN = ISBN;
    this.review = review;
  }
}

class Story {
  constructor()
}