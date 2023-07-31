function discordCopy() {
    navigator.clipboard.writeText("@catzilla_");
    var copyAlert = document.getElementsByClassName("copyAlert")[0];
    copyAlert.style.display = "block";
    setTimeout(function(){ copyAlert.style.display = "none"; }, 2000);
}