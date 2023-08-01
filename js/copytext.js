function discordCopy() {
    navigator.clipboard.writeText("@catzilla_");
    var copyAlert = document.getElementById("discordName");
    // change text to "copied!"
    copyAlert.innerHTML = "Copied!";
    // change text back to original after 2 seconds
    setTimeout(function(){ copyAlert.innerHTML = "@catzilla_" }, 2000);
}