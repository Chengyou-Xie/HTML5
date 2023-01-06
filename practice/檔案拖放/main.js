$(function () {
    $("#dropBox").on("dragenter", dragenter);
    $("#dropBox").on("dragleave", dragleave);
    $("#dropBox").on("dragover", dragover);
    $("#dropBox").on("drop", drop);
});

function dragenter() {
    $("#dropBox").css("backgroundColor", "red");
    $("#dropBox").text("Drop it!");
}
function dragleave(e) {
    $("#dropBox").css("backgroundColor", "blue");
    $("#dropBox").text("Come here.");
}
function dragover(e) {
    e.preventDefault();
}
function drop(e) {
    e.preventDefault();
    let files = e.originalEvent.dataTransfer.files;

    if (files.length == 0) {
        return false;
    }
    convert(files[0]);
}

function convert(file) {
    if (!file.type.match(/text.*/)) {
        alert("請拖放文字檔");
        dragleave();
        return;
    }

    let reader = new FileReader();
    reader.readAsText(file);

    reader.onloadend = function () {
        let s = reader.result;
        $("#preview").text(s);
        dragleave();
    };
}
