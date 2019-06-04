// Function taken from https://www.w3schools.com/howto/howto_js_tabs.asp
function openTable(evt, table_name) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="hover_text" and remove the class "active"
    hover_text = document.getElementsByClassName("hover_text");
    for (i = 0; i < hover_text.length; i++) {
        hover_text[i].className = hover_text[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(table_name).style.display = "block";
    evt.currentTarget.className += " active";
}

function clickDefault() {
    document.getElementById("default").click();
}

