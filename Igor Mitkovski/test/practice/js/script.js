let $container = $('#container');
let recipes = [];

class Recipe {
    constructor(name, origin) {
        this.name = name;
        this.origin = origin;
        this.ingredients = {};
    }
    addIngredient(ingredient) {

    }
}


let newRecipe = () => {
    $('#containerList').addClass('hide');
    $container.append(
        `<h1>New Recipe</h1>
		<label for='name'>Name: </label> 
		<input id='name' type='text'><br>
		<label for='origin'>Origin:</label>
		<input id='origin' type='text'><br>
		<button id='addRecipe'>Add Recipe</button> `
    );
};


let getIngredients = () => {
    $container.append(
        `<h3>Ingredients:</h3><br>
		<select>
			<option value='Ingredients' selected disabled>Ingredients</option>
			<option value="milk">Milk</option>
			<option value="eggs">Eggs</option>
			<option value="flour">Flour</option>
			<option value="tomatoes">Tomatoes</option>
			<option value="potatoes">Potatoes</option>
			<option value="paprika">Paprika</option>
			<option value="cheese">Cheese</option>
			<option value="sugar">Sugar</option>
			<option value="oil">Oil</option>
			<option value="salt">Salt</option>
			<option value="meat">Meat</option>
		</select>
		<input id='ingredientAmmount' type='number' style='width: 100px'><br />
		<button id='getIngredient'>Add Ingredient</button> 
		<button id='next'>Next</button> `
    );
};


let preparation = () => {
    $container.append(
        `<h3>Preparation:</h3>
		<label for='preparationTime'>Preparation Time</label>
		<input id='preparationTime' type='number' style='width: 100px'><br>
		<label for='preparationGuide'>Preparation Guide</label><br>
		<textarea id='preparationGuide' rows='10' cols='30'></textarea><br>
		<button id='saveRecipe'>Save Recipe</button> `
    );
};

$(() => {
    newRecipe();
    recipesTable();

    $('#newRecipe').on('click', () => {
        $container.html('');
        newRecipe();
    });
    $('#listOfRecipes').on('click', () => {
        $container.html('')
        $('#containerList').removeClass('hide');
    });
    $container.on('click', '#addRecipe', () => {
        recipes.push(new Recipe($('#name').val(), $('#origin').val()));
            getIngredients();
        $('#addRecipe').toggle('.hide');

    });
    $container.on('click', '#getIngredient', () => {
        if (recipes != [])
            recipes[recipes.length - 1].ingredients[$('select option:selected').attr('value')] = $('#ingredientAmmount').val();
    });
    $container.on('click', '#next', () => {
            preparation();
        $('#next').toggle('.hide');
        $('#getIngredient').toggle('.hide');
    });
    $container.on('click', '#saveRecipe', () => {
        if (recipes != []) {
            recipes[recipes.length - 1].preparationTime = $('#preparationTime').val();
            recipes[recipes.length - 1].preparationGuide = $('#preparationGuide').val();
            appendRecipe();
            $container.html("");
            newRecipe();
        }
    });
    $('#containerList').on('click', 'deleteButton', () => {
        $('deleteButton').parent().parent().remove();
        console.log('clicked');
    });
});
