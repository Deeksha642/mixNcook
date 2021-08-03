$(document).ready(function() {
    $("#query-form").submit(function(event) { performSearch(event); });
});
function performSearch(event) {
    event.preventDefault();
    var $form = $(this);
    setFormDisabledProps(true);

    $("#search-results-heading").text("Searching ...");
    $("#results").text("");
    temp1 = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=ab196c10956d4c29a5e3a8740c654b25&ingredients=';

    data = $("#ingredients").val();
    url = temp1 + data;
    $.getJSON(url, function(items) {
        let text = ``;
        for (let item in items) {
            href = `${items[item].image}`;
            text += `Title: ${items[item].title}<br> <img src=${href}><br><br>`;
            $(".dish-title-div").html(text);
        }
        setFormDisabledProps(false);
    });
}

function sanitizeInputs() {
    var str = $("#ingredients").val();
    str = str.replace(/[^a-zA-Z 0-9,]/gim, "");
    str = str.trim();
    $("#ingredients").val(str);

}

function resetResults() {
    $("#search-results-heading").text("");
    $("#results").text("");
}

function setFormDisabledProps(statusToSet) {
    document.getElementById("ingredients").disabled = statusToSet;
    document.getElementById("resetButton").disabled = statusToSet;
    document.getElementById("searchButton").disabled = statusToSet;
}

function setNotFoundMessages() {
    $("#search-results-heading").text("No recipes found, please change search criteria.");
    $("#results").text("");
}

/**/