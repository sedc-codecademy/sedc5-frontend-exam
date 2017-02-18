$(document).ready(function(){
    function AddressBook(){
        var contacts = new Array();
        var index = 3;


        var form = document.getElementById("submitForm");
        var table = document.getElementById("contacts-table");
        var min = 1800,
    max = 2017,
    select = document.getElementById('selectElementId');

    for (var i = min; i<=max; i++){
       var opt = document.createElement('option');
       opt.value = i;
       opt.innerHTML = i;
       select.appendChild(opt);
    }

        this.init = function(){
            /*---------------------- Button Click Events Start -----------------------*/
            var instance = this;

            var newContact = new Contact(1, "Lisa", "lisagmail.com", "98763123", "Lisa", "lisagmail.com", "98763123", "asdlkasld", "asdasdas");

            instance.addContact(newContact);
            instance.addTable(newContact);

            newContact = new Contact(2, "Liasa", "lisagmail.com", "98763123", "Liasa", "lisagmail.com", "98763213123", "asdlaskasld", "safashn");

            instance.addContact(newContact);
            instance.addTable(newContact);

            form.addEventListener("submit", function(event){
                event.preventDefault();

                var title = this.title.value.trim();
                var author = this.author.value.trim();
                var publisher = this.publisher.value.trim();
                var year = this.year.value.trim();
                var leng = this.leng.value.trim();
                var series = this.series.value.trim();
                var isbn = this.isbn.value.trim();
                var review = this.review.value.trim();
                var _ID = this.id_entry.value;

                if(title !== "" && author!=="" && publisher !== "" && year!=="" && leng !== "" && series!=="" && isbn !== "" && review !=="" && _ID !== ""){
                    var newContact = new Contact(_ID, title, author, publisher, year, leng, series, isbn, review);

                    if (parseInt(_ID) === 0){
                        newContact.ID = index;
                        index++;
                        instance.addContact(newContact);
                        instance.addTable(newContact);
                    } else {
                        instance.editContact(newContact);
                    }
                } else alert("Ve molime popolnete gi site polinja.");

                this.reset();
                event.stopPropagation();
            });

            $('#contacts-table tr').bind('click', function(e) {
                $(e.currentTarget).children('td, th').css('background-color','deepskyblue');
            });

            table.addEventListener("click", function(){
                event.preventDefault();

                var clickedElement = event.target;
                var operationToExecute = clickedElement.getAttribute("data-op");
                var clickedElementID = clickedElement.getAttribute("data-id");
                if (operationToExecute !== null){
                    if (operationToExecute === "update"){
                        instance.modifyTableForEditing(clickedElementID);
                    } else if(operationToExecute === "delete"){
                        instance.removeFromTable(clickedElementID);
                        instance.removeContact(clickedElementID);
                    } else if(operationToExecute === "save"){
                        instance.editTable(clickedElementID);
                    } else if(operationToExecute === "read"){
                        instance.displayReadModal(clickedElementID);
                    }
                }

                event.stopPropagation();
            });

            /*---------------------- Button Click Events End -----------------------*/
        };

        this.displayReadModal = function(contactID){
            var text = "";
            $("#readDataModal .modal-body").html(function(){
                for(var i = 0; i < contacts.length; i++){
                    if(parseInt(contacts[i].ID) === parseInt(contactID)){
                        text += "Title: " + contacts[i].title + "<br/>" +
                         "Author: " + contacts[i].author + "<br/>" +
                         "Publisher: " + contacts[i].publisher + "<br/>" +
                         "Year: " + contacts[i].year + "<br/>" +
                         "Leng: " + contacts[i].leng + "<br/>" +
                         "Series: " + contacts[i].series + "<br/>" +
                         "ISBN: " + contacts[i].isbn;
                         "Review: " + contacts[i].review;
                        break;
                    }
                }
                return text;
            });
            $("#readDataModal").modal("show");
        };

        this.addContact = function(contactToAdd){
            contacts.push(contactToAdd);
        };
        this.removeContact = function(contactID){
            for(var i = 0; i < contacts.length; i++){
                if(contacts[i].ID === contactID){
                    contacts.splice(contactID, 1);
                    break;
                }
            }
        };
        this.editContact = function(contactToEdit){
            for(var i = 0; i < contacts.length; i++){
                if(parseInt(contacts[i].ID) === parseInt(contactToEdit.ID)){
                    contacts[i].ID = parseInt(contactToEdit.ID);
                    contacts[i].title = contactToEdit.title;
                    contacts[i].author = contactToEdit.author;
                    contacts[i].publisher = contactToEdit.publisher;
                    contacts[i].year = contactToEdit.year;
                    contacts[i].leng = contactToEdit.leng;
                    contacts[i].series = contactToEdit.series;
                    contacts[i].isbn = contactToEdit.isbn;
                    contacts[i].review = contactToEdit.review;
                    break;
                }
            }
        };
        this.addTable = function(contactToAdd){
            var tableRow = document.createElement("tr");
            tableRow.setAttribute("id", "contact-" + contactToAdd.ID);

            var currentParameter = document.createElement("td");
            var theNode = document.createTextNode(contactToAdd.ID);

            currentParameter = document.createElement("td");
            theNode = document.createTextNode(contactToAdd.title);
            currentParameter.appendChild(theNode);
            tableRow.appendChild(currentParameter);

            currentParameter = document.createElement("td");
            theNode = document.createTextNode(contactToAdd.author);
            currentParameter.appendChild(theNode);
            tableRow.appendChild(currentParameter);

            currentParameter = document.createElement("td");
            theNode = document.createTextNode(contactToAdd.publisher);
            currentParameter.appendChild(theNode);
            tableRow.appendChild(currentParameter);

            currentParameter = document.createElement("td");
            theNode = document.createTextNode(contactToAdd.year);
            currentParameter.appendChild(theNode);
            tableRow.appendChild(currentParameter);

            currentParameter = document.createElement("td");
            theNode = document.createTextNode(contactToAdd.leng);
            currentParameter.appendChild(theNode);
            tableRow.appendChild(currentParameter);

            currentParameter = document.createElement("td");
            theNode = document.createTextNode(contactToAdd.series);
            currentParameter.appendChild(theNode);
            tableRow.appendChild(currentParameter);

            currentParameter = document.createElement("td");
            theNode = document.createTextNode(contactToAdd.isbn);
            currentParameter.appendChild(theNode);
            tableRow.appendChild(currentParameter);

            currentParameter = document.createElement("td");
            theNode = document.createTextNode(contactToAdd.review);
            currentParameter.appendChild(theNode);
            tableRow.appendChild(currentParameter);

            currentParameter = document.createElement("td");
            currentParameter.innerHTML = "<button class='btn btn-default' data-op='read' data-id='" + contactToAdd.ID + "' >Read</button> " +
                "<button class='btn btn-success' data-op='update' data-id='" + contactToAdd.ID + "'>Update</button> " +
                "<button class='btn btn-danger' data-op='delete' data-id='" + contactToAdd.ID + "'>Delete</button>";
            tableRow.appendChild(currentParameter);

            table.appendChild(tableRow);
        };
        this.editTable = function(contactID){
            var rowToEdit = document.getElementById("contact-" + contactID);
            var dataToFields = rowToEdit.getElementsByTagName("td");
            var inputFields = rowToEdit.getElementsByTagName("input");
            var inputFieldsData = new Array();

            for(var i = 0; i < inputFields.length; i++){
                inputFieldsData.push(inputFields[i].value);
            }

            var newContact = new Contact(contactID, inputFieldsData[1], inputFieldsData[2], inputFieldsData[3], inputFieldsData[4], inputFieldsData[5], inputFieldsData[6], inputFieldsData[7]);
            this.editContact(newContact);

            dataToFields[0].innerHTML = inputFieldsData[0];
            dataToFields[1].innerHTML = inputFieldsData[1];
            dataToFields[2].innerHTML = inputFieldsData[2];
            dataToFields[3].innerHTML = inputFieldsData[3];
            dataToFields[4].innerHTML = inputFieldsData[4];
            dataToFields[5].innerHTML = inputFieldsData[5];
            dataToFields[6].innerHTML = inputFieldsData[6];
            dataToFields[7].innerHTML = inputFieldsData[7];
            dataToFields[8].innerHTML = "<button class='btn btn-default' data-op='read' data-id='" + contactID + "' >Read</button> " +
                "<button class='btn btn-success' data-op='update' data-id='" + contactID + "'>Update</button> " +
                "<button class='btn btn-danger' data-op='delete' data-id='" + contactID + "'>Delete</button>";
        };

        this.modifyTableForEditing = function(contactID){
            var rowToEdit = document.getElementById("contact-" + contactID);
            var dataToFields = rowToEdit.getElementsByTagName("td");

            dataToFields[0].innerHTML = "<input id='title' size='15' type='text' value='" + dataToFields[0].innerHTML.trim() + "' />";
            dataToFields[1].innerHTML = "<input id='author' size='30' type='text' value='" + dataToFields[1].innerHTML.trim() + "' />";
            dataToFields[2].innerHTML = "<input id='publisher' size='20' type='text' value='" + dataToFields[2].innerHTML.trim() + "' />";
            dataToFields[3].innerHTML = "<input id='year' size='15' type='text' value='" + dataToFields[3].innerHTML.trim() + "' />";
            dataToFields[4].innerHTML = "<input id='leng' size='30' type='text' value='" + dataToFields[4].innerHTML.trim() + "' />";
            dataToFields[5].innerHTML = "<input id='series' size='20' type='text' value='" + dataToFields[5].innerHTML.trim() + "' />";
            dataToFields[6].innerHTML = "<input id='isbn' size='20' type='text' value='" + dataToFields[6].innerHTML.trim() + "' />";
            dataToFields[7].innerHTML = "<input id='review' size='20' type='text' value='" + dataToFields[7].innerHTML.trim() + "' />";
            
            dataToFields[8].innerHTML = "<button class='btn btn-default' data-op='read' data-id='" + contactID + "' >Read</button> " +
                "<button class='btn btn-success' data-op='save' data-id='" + contactID + "'>Save</button> " +
                "<button class='btn btn-danger' data-op='delete' data-id='" + contactID + "'>Delete</button>";
        };

        this.removeFromTable = function(contactID){

            var id = "#contact-" + contactID;

            $(id).fadeOut(500, function(){
                    table.removeChild(document.getElementById("contact-" + contactID));
                });
        };

        this.getContacts = function(){
            return contacts;
        };
        this.getIndex = function(){
            return index;
        };
        this.setIndex = function(value){
            index = value;
        };
    }

    function Contact(_ID, title, author, publisher, year, leng, series, isbn, review){
        this.ID = _ID;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.year = year;
        this.leng = leng;
        this.series = series;
        this.isbn = isbn;
        this.review = review;
    }

    var addressBook = new AddressBook();
    addressBook.init();
});