let buttonHtml;
let navHTML;
function onload(){
    if(!localStorage.getItem("theme") || localStorage.getItem("theme") == "nebula") localStorage.setItem("theme", "main");
    document.getElementById('theme_css').href = `/assets/themes/${localStorage.getItem("theme")}.css`;
    if(!localStorage.getItem("theme")){
        localStorage.setItem("theme", "main")
    }
    if(localStorage.getItem("theme") !== "main"){
        
    }
    buttonHtml = document.getElementById("dropdownnav").innerHTML;
    navHTML = document.getElementById("nav").innerHTML;
    responsive();
}


document.addEventListener('DOMContentLoaded', (event) => {
    if(!localStorage.getItem("theme") || localStorage.getItem("theme") == "nebula") localStorage.setItem("theme", "main");
    if(!localStorage.getItem("theme")){
        localStorage.setItem("theme", "main")
    }
    document.getElementById('theme_css').href = `/assets/themes/${localStorage.getItem("theme")}.css`;
});
/*function responsive() {
    if (document.body.offsetWidth < 768) {


        
        console.log("Optimizing display for smaller screens...");
        if (document.getElementById("searchimg"))
            document.getElementById("searchimg").style.display = "none";

        if(document.getElementById('cardHolder')){
            document.getElementById('cardHolder').setAttribute("style", "column-count: 1 !important;");
        }
        if (document.getElementById("search")) {
            document.getElementById("search").parentElement.href = "/search/";
            document.getElementById("search").contentEditable = "false";
            document.getElementById("search").innerHTML = "Search";
        }

        document.getElementById("aLink1").remove();
        document.getElementById("aLink2").remove();
        document.getElementById("aLink3").remove();
        document.getElementById("aLink4").remove();
        document.getElementById("aLink5").remove();
        console.log(buttonHtml);
        if(user){
            document.getElementById("dropdownnav").innerHTML = "<button class='dropbtn'><li><a onclick='dropdownMenu()'>Menu</a></li></button><div class='dropdown-content' id='dropdownContent'><a href='/'>Home</a><a href='/add'>Add bot</a><a href='/search'>Search</a><a href='/servers'>Servers</a><a href='/logout'>logout</a></div></div>"
 
        } else {
            document.getElementById("dropdownnav").innerHTML = "<button class='dropbtn'><li><a onclick='dropdownMenu()'>Menu</a></li></button><div class='dropdown-content' id='dropdownContent'><a href='/'>Home</a><a href='/add'>Add bot</a><a href='/search'>Search</a><a href='/servers'>Servers</a><a href='/login'>login</a></div></div>"

        }
        if (document.getElementsByClassName("active-navtext").length === 0) return;
        document.getElementsByClassName("active-navtext")[0].style.display = "none";
        let x = document.getElementsByClassName("active-navtext")[0].parentElement
            .parentElement;
        if (x.children[3]) x.children[3].style.display = "none";
        if (x.children[6]) x.children[6].style.display = "none";
    } else {
        console.log("Optimizing display for larger screens...");
        if (document.getElementById("searchimg"))
            document.getElementById("searchimg").style.display = "inline";
        if (document.getElementById("searchlink"))
            document.getElementById("searchlink").style.display = "none";
        var nav = document.getElementById('nav');
        if(!document.getElementById("aLink1")){
            nav.innerHTML = navHTML;
            console.log(buttonHtml);
            document.getElementById('dropdownnav').innerHTML = buttonHtml;
        }
    }
}

window.onresize = function () {
    responsive();
};

function dropdownMenu(){
    document.getElementById('dropdownContent').style.display = 'block';
}
 */

function changeTheme(){
    console.log("theme")
    if(localStorage.getItem("theme") == "main"){
        localStorage.setItem("theme", "dark")
    } else {
        localStorage.setItem("theme", "main")
    }

    document.getElementById('theme_css').href = `../assets/themes/${localStorage.getItem("theme")}.css`;
    console.log('owo');
}


(function() {
    try {
        var $_console$$ = console;
        Object.defineProperty(window, "console", {
            get: function() {
                if ($_console$$._commandLineAPI)
                    throw "Sorry, for security reasons, the script console is deactivated on Botrix.";
                return $_console$$
            },
            set: function($val$$) {
                $_console$$ = $val$$
            }
        })
    } catch ($ignore$$) {
    }
})();

