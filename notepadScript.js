var oldText = "";

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function checkCookie(name) {
    console.log(getCookie(name));
}

function notepadUpdate() {
    var textbox = document.getElementById("notepadTextArea");
    oldText = textbox.value;
    notepadUpdateCookie()
}

function notepadUpdateCookie() {
    var textbox = document.getElementById("notepadTextArea");
    document.cookie = "text="+textbox.value;
}

window.setInterval(function() {
    var textbox = document.getElementById("notepadTextArea");
    if (textbox.value != oldText) {
        notepadUpdate();
    }
}, 5000);

function notepadLoad() {
    var textbox = document.getElementById("notepadTextArea");
    var logoutLink = document.getElementById("logout");
    textbox.addEventListener('keyup', notepadUpdateCookie);
    var textboxText = getCookie("text");
    if (textboxText === undefined) {
        xhttp.open("POST", "getText", true);
        xhttp.send();
    } else {
        textbox.value = textboxText;
        notepadUpdate();
    }
    var mode = getCookie("mode");
    if (mode == "dark") {
        setMode(0);
    } else {
        setMode(1);
    }
    var size = getCookie("textSize");
    setSize(size);
    var font = getCookie("textFont");
    setFont(font);
}

function setMode(mode) {
    var modeLink = document.getElementById("switchMode");
    var body = document.getElementsByTagName("body")[0];
    var textarea = document.getElementById("notepadTextArea");
    if (mode == 0) {
        // set to dark mode
        modeLink.innerHTML = "Light Mode";
        body.className = "dark-mode";
        textarea.className = "notepad dark-mode";
        document.cookie = "mode=dark";
    } else {
        // set to light mode
        modeLink.innerHTML = "Dark Mode";
        body.className = "light-mode";
        textarea.className = "notepad light-mode";
        document.cookie = "mode=light";
    }
}

function switchMode() {
    var modeLink = document.getElementById("switchMode");
    if (modeLink.innerHTML == "Dark Mode") {
        // Switch to dark mode
        setMode(0);
    } else {
        // Switch to light mode
        setMode(1);
    }
}

function textUp() {
    var notepadText = document.getElementById("notepadTextArea");
    notepadText.style.fontSize = "4em"
    document.cookie = "textSize="+notepadText.style.fontSize;
}

function textNorm() {
    var notepadText = document.getElementById("notepadTextArea");
    notepadText.style.fontSize = "2em"
    document.cookie = "textSize="+notepadText.style.fontSize;
}

function textDown() {
    var notepadText = document.getElementById("notepadTextArea");
    notepadText.style.fontSize = "1em"
    document.cookie = "textSize="+notepadText.style.fontSize;
}

function newFont() {
    var notepadText = document.getElementById("notepadTextArea");
    switch (notepadText.style.fontFamily) {
        case "monospace":
            notepadText.style.fontFamily = "sans-serif";
            break;
        case "sans-serif":
            notepadText.style.fontFamily = "serif";
            break;
        case "serif":
            notepadText.style.fontFamily = "monospace";
            break;
        default:
            notepadText.style.fontFamily = "monospace";
    }
    document.cookie = "textFont="+notepadText.style.fontFamily;
}

function setSize(size) {
    var notepadText = document.getElementById("notepadTextArea");
    notepadText.style.fontSize = size;
}

function setFont(font) {
    var notepadText = document.getElementById("notepadTextArea");
    if (font === undefined) {
        notepadText.style.fontFamily = "monospace";
    } else {
        notepadText.style.fontFamily = font;
    }
}

function openNav() {
    document.getElementById("navOverlay").style.height = "50%";
    document.getElementById("navOverlay").style.minHeight = "270px";
}

function closeNav() {
    document.getElementById("navOverlay").style.height = "0%";
    document.getElementById("navOverlay").style.minHeight = "0";
}
