class Book{
    constructor(
    public title: string, 
    public publisher: string,
    public yearOfPublication: number,
    public lengthInPages: number,
    public digitIsbn: number,
    public review: string){
        
    }
 
}  

class Novel extends Book{
    public author: string;
    public series: string;
    public seriesNumber: number;

    constructor(title: string, publisher: string, yearOfPublication: number, lengthInPages: number, digitIsbn: number, review: string, author: string, series:string, seriesNumber:number ){
         
        super(title, publisher, yearOfPublication, lengthInPages, digitIsbn, review);
        this.author = author;  
        this.series = series;  
        this.seriesNumber = seriesNumber; 
    }}

    class Anthology extends Book{
        public editor: string;
        public stories: [string];
    

    constructor(title: string, publisher: string, yearOfPublication: number, lengthInPages: number, digitIsbn: number, review: string, editor:string, stories:[string]){
         
        super(title, publisher, yearOfPublication, lengthInPages, digitIsbn, review);
        this.editor = editor;
        this.stories = stories;


        
    }}