// base URL for the first call
var url = "https://www.dnd5eapi.co/api/classes";
var pickedClassURL; //`https://www.dnd5eapi.co/${}`;
var br = document.createElement("br");

window.onload = fetchClassList();

// Makes the first API call for a list of player classes
function fetchClassList() {
    fetch(url).then(res => res.json()).then(res => {
        console.log(url);

        listHelper(res);
    })
}

// Generates class list as HTML elements
function listHelper(res) {
    var list = document.getElementById("classList");
    var listItem, text;

    for (var i = 0; i < res.results.length; i++) {

        text = res.results[i].name;

        listItem = document.createElement("li");
        listItem.setAttribute("id", `class${i}`);
        listItem.style.display = "inline-block";
        listItem.style.margin = "0px 0px 0px 2px";
        listItem.innerHTML = `<button id="class${i}" onClick="chosenClass('${res.results[i].url}')">` + text;

        listItem.appendChild(br);

        list.appendChild(listItem);
    }
}

// Gets info about a class from the given url
function chosenClass(pickedClass) {

    var url = `https://www.dnd5eapi.co${pickedClass}`;
    console.log(url);

    fetch(url).then(res => res.json()).then(res => {

        if (url != "https://www.dnd5eapi.co/api/classes/monk") {
            proficienciyBlock(res, url);
        }
        else {
            monkProfBlock(res)
        }
        console.log(res);
        document.getElementById("className").innerHTML = res.name;
    })

}


function proficienciyBlock(pickedClass) {

    var skill = document.getElementById("skills");
    var tools = document.getElementById("tools");

    var li, header;

    clearLists(skill, tools);

    // Generates the header "proficiencies"
    header = document.createElement("h2");
    header.innerHTML = "Proficiencies: (" + pickedClass.proficiency_choices[0].choose + ")";
    skill.appendChild(header);

    // Generates list of skill proficiencies
    for (var i = 0; i < pickedClass.proficiency_choices[0].from.length; i++) {

        li = document.createElement("li");

        // All proficiencies comes with "skill: " so i use substr(7) to trim that off
        li.innerHTML = pickedClass.proficiency_choices[0].from[i].name.substr(7);

        skill.appendChild(li);
    }
}

// The API was wonky for monks - profeciency_choices[0] was tools and not skills for Monk only
function monkProfBlock(pickedClass) {

    var container = document.getElementById("grid-container");
    var skill = document.getElementById("skills");
    var tools = document.getElementById("tools");
    var li, header, pick, tools;

    clearLists(skill, tools);

    // Generates the header "proficiencies"
    header = document.createElement("h2");
    header.innerHTML = "Proficiencies: (" + pickedClass.proficiency_choices[2].choose + ")";
    skill.appendChild(header);

    // Generates list of skill proficiencies
    for (var i = 0; i < pickedClass.proficiency_choices[2].from.length; i++) {

        li = document.createElement("li");
        li.innerHTML = pickedClass.proficiency_choices[2].from[i].name.substr(7);

        skill.appendChild(li);
    }
    container.appendChild(skill);

    // Generates the header "tools"
    header = document.createElement("h2");
    header.innerHTML = "Tools: (" + pickedClass.proficiency_choices[0].choose + ")";
    tools.appendChild(header);

    // Generates the list of tool proficiencies
    for (var i = 0; i < pickedClass.proficiency_choices[0].from.length; i++) {
        li = document.createElement("li");
        li.innerHTML = pickedClass.proficiency_choices[0].from[i].name;

        tools.appendChild(li);
    }
    container.appendChild(tools);
}

// Clears the lists for next class search
function clearLists(skill, tools) {

    while (skill.firstChild) {
        skill.removeChild(skill.firstChild);
    };

    while (tools.firstChild) {
        tools.removeChild(tools.firstChild);
    }
}