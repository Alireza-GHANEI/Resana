function hiderec() {
    const div = document.getElementById("ToHideWhenRec")
    div.className = "hiding"
}

function showWhileRec() {

    const div = document.getElementById("circle")
    const div1 = document.getElementById("spanRec")
    const div2 = document.getElementById("stopRecButt")

    div.className = "showRecCircle"
    div1.className = "showSpanRec"
    div2.className = "buttonStopRec"

    div.style.display = "block"
    div1.style.display = "block"
    div2.style.visibility = "visible"
}

window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    backToNormalRecordVision();
}

function closeModall() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function showMessageSave() {
    alert("Sound Saved!");
    closeModall();
}

function backToNormalRecordVision(){
    const div0 = document.getElementById("ToHideWhenRec");
    const div = document.getElementById("circle")
    const div1 = document.getElementById("spanRec")
    const div2 = document.getElementById("stopRecButt")

    div.className = "showRecCircle"
    div1.className = "showSpanRec"
    div2.className = "buttonStopRec"

    div0.style.display = "block"
    div1.style.display = "none"
    div2.style.visibility = "hidden"
    div.style.display = "none";

}
