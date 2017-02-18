class Book {
    constructor(public title:string, 
    public author:string, 
    public publisher:string, 
    public year:number, 
    public length:number, 
    public isbn:string, 
    public review:string, 
    public id:number){
        
        
    }

}
class Novel extends Book{
    constructor( title:string,  
    author:string,  
    publisher:string, 
    year:number,  
    length:number, 
    public series:string, 
    public seriesNumber:number, 
    isbn:string, 
    review:string, 
    id:number  ){
        super(title, author, publisher, year, length, isbn, review, id );
    }


 

}
class Anthologie extends Book{
    constructor( title:string,  
    editor:string,  
    publisher:string,  
    year:number,  
    length:number, 
    public stories:string[], 
    isbn:string, 
    review:string, 
    id:number  ){
        super(title, editor, publisher, year, length, isbn, review, id );
    }
    
}
class Story {
    constructor(public title:string, 
    public author:string, 
    public isOriginal:boolean){}
    public toString = () : string => {
       
    return `${this.author}`;

}
}