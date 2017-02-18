let k = 0;
let recipesTable = () => {
    $('#containerList').append(
        `<table class="table">
		  <thead class="thead-inverse">
		    <tr>
		      <th>#</th>
		      <th>Recipe Name</th>
		      <th>Origin</th>
		      <th>Ingredients</th>
		      <th>Time for preparation</th>
		      <th>Perparation Guide</th>
		      <th></th>
		      <th></th>
		    </tr>
		  </thead>
		  <tbody id='recipesList'>
		    
		  </tbody>
		</table> `
    );
};

let appendRecipe = () => {
    k++;
    $('#recipesList').append(
        `<tr>
		    <th scope="row">${k}</th>
		    <td>${recipes[recipes.length - 1].name}</td>
		    <td>${recipes[recipes.length - 1].origin}</td>
		    <td>${extractIngredientsList()}</td>
		    <td>${recipes[recipes.length - 1].preparationTime}</td>
		    <td>${fixPreparationText()}...</td>
		    <td></td>
		    <td></td>
		</tr> `
    );
    let tds = document.getElementsByTagName("td");
    let trs = document.getElementsByTagName("tr");
    for (let j = 5; j < tds.length; j = j + 7) {
        let td = tds[j];
        let showButton = document.createElement("button");
        showButton.textContent = 'Show';
        $(showButton).on('click', () => {
        	
        });
        if (!td.hasChildNodes())
            td.appendChild(showButton);
    }
    for (let i = 6; i < tds.length; i = i + 7) {
        let td = tds[i];
        let deleteButton = document.createElement("button");
        deleteButton.textContent = 'Delete';
        $(deleteButton).on('click', () => {
            $(deleteButton).parent().parent().remove();
            k--;

            (() => {
                $('tbody tr').each(function(index, el) {
                	index++;
                    $(this).children('th').first().text(index);
                });
            })();
        });
        if (!td.hasChildNodes())
            td.appendChild(deleteButton);
    }
};

let extractIngredientsList = () => {
    let ingredientsList = '';
    let ingredients = Object.keys(recipes[recipes.length - 1].ingredients);
    if (ingredients.length > 3)
        for (let i = 0; i < 3; i++) {
            ingredientsList += ingredients[i];
            if (i < 2)
                ingredientsList += ", ";
            else
                ingredientsList += "...";
        }
    else
        for (let i = 0; i < ingredients.length; i++) {
            ingredientsList += ingredients[i];
            if (i < ingredients.length - 1)
                ingredientsList += ", ";
            else
                ingredientsList += "...";
        }
    return ingredientsList;
};
let fixPreparationText = () => {
    let displayText = '';
    let preparationText = recipes[recipes.length - 1].preparationGuide;
    if (preparationText.length > 50) {
        for (let i = 0; i < 50; i++) {
            displayText += preparationText[i];
        }
        for (let i = displayText.length - 1; i >= 0; i--) {
            if (displayText[i] === " ") {
                displayText = displayText.slice(0, i);
                return displayText;
            }
        }
    } else
        return preparationText;
};
