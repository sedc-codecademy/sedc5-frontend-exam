class Book {
    constructor(public title: string, public publisher: string,
        public year: string, public lengthInPages: number, public idISBN: string, public review: string) {
    }
}

class Novel extends Book {
    //constants
    readonly type = "Novel";
    //properties
    public series: string;
    public seriesNumber: number;
    public author: string;


    constructor(title: string, publisher: string,
        year: string, lengthInPages: number, idISBN: string, review: string, 
        author: string, series: string, seriesNumber: number) {

        super(title, publisher, year, lengthInPages, idISBN, review);

        this.author = author;
        this.series = series;
        this.seriesNumber = seriesNumber;
    }
}

class Anthology extends Book {
    //constants
    readonly type = "Anthology";
    //properties
    public editor: string;
    public stories: [Story];

    constructor(title: string, publisher: string,
        year: string, lengthInPages: number, idISBN: string, review: string, 
        editor: string, stories: [Story]) {

        super(title, publisher, year, lengthInPages, idISBN, review);

        this.editor = editor;
        this.stories = stories;
    }
}

class Story {
    constructor(public title: string, public storiesAuthor: string, public isOriginal: boolean = false) {
    }
}
