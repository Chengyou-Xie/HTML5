const LegalVideoFormats = [
    "mp4",
    "fiv",
    "avi",
    "mov",
    "mkv",
    "mpeg",
    "3gp",
    "wmv",
    "swf",
];
window.URL = window.URL || window.webkitURL;

$(function () {
    $("#inputFile").on("change", function (e) {
        $("table").empty();
        $("table").append(
            "<tr><th>檢查項目</th><th>需求規格</th><th>檢查結果</th> <th>是否通過</th></tr>"
        );
        processFile(e.target.files);
    });

    $("#dropBox").on("dragenter", dragenter);
    $("#dropBox").on("dragleave", dragleave);
    $("#dropBox").on("dragover", dragover);
    $("#dropBox").on("drop", drop);
});

function dragenter() {
    $("#dropBox").css("border", "5px solid red");
    $("#dropBox").text("Drop it!");
}
function dragleave(e) {
    $("#dropBox").css("border", "5px dashed black");
    $("#dropBox").text("Choose file by the button below or drop here.");
}
function dragover(e) {
    e.preventDefault();
}
function drop(e) {
    e.preventDefault();
    let files = e.originalEvent.dataTransfer.files;
    console.log(e.originalEvent.dataTransfer.files);

    if (files.length == 0) {
        return false;
    }
    // convert(files[0]);
    $("table").empty();
    $("table").append(
        "<tr><th>檢查項目</th><th>需求規格</th><th>檢查結果</th> <th>是否通過</th></tr>"
    );
    processFile(files);
    dragleave();
}

// function convert(file) {
//     if (!file.type.match(/text.*/)) {
//         alert("請拖放文字檔");
//         dragleave();
//         return;
//     }

//     let reader = new FileReader();

//     reader.onloadend = function () {
//         let s = reader.result;
//         $("#preview").text(s);
//         dragleave();
//     };
//     reader.readAsText(file);
// }

function processFile(file) {
    let thisVideo = file[0];
    $("table").append(
        $(`<tr><td colspan="4">影片名稱: ${thisVideo.name}</td></tr>`).css(
            "backgroundColor",
            "yellow"
        )
    );

    $("table").append(
        `<tr><td>影片長度:</td> <td>需介於60~90秒</td> <td id="thisDuration"></td> <td id="thisDurationResult"></td></tr>`
    );
    $("table").append(
        `<tr><td>影片格式:</td> <td>"mp4",
        "fiv", "avi", "mov", "mkv", "mpeg", "3gp", "wmv", "swf"</td> <td id="thisFormat">${thisVideo.type}</td> <td id="thisFormatResult"></td></tr>`
    );
    var thisFileType = thisVideo.type.split("/");

    if (thisFileType[0] == "video") {
        if (LegalVideoFormats.indexOf(thisFileType[1] != -1)) {
            $("#thisFormatResult").text("O").css("color", "green");
        } else {
            $("#thisFormatResult").text("X").css("color", "red");
        }
    } else {
        $("#thisFormatResult").text("非影片格式").css("color", "red");
    }

    $("table").append(
        `<tr><td>影片解析度:</td> <td>720p以上</td> <td id="thisResolution"></td> <td id="thisResolutionResult"></td></tr>`
    );

    let videoElement = document.createElement("video");
    videoElement.preload = "metadata";

    videoElement.onloadedmetadata = function () {
        thisVideo.duration = videoElement.duration;
        thisVideo.videoWidth = videoElement.videoWidth;
        thisVideo.videoHeight = videoElement.videoHeight;

        $("#thisDuration").text(thisVideo.duration);
        $("#thisResolution").text(
            thisVideo.videoWidth + "*" + thisVideo.videoHeight
        );

        if (thisVideo.duration >= 60 && thisVideo.duration <= 90) {
            $("#thisDurationResult").text("O").css("color", "green");
        } else {
            $("#thisDurationResult").text("X").css("color", "red");
        }

        if (thisVideo.videoWidth >= 1200 && thisVideo.videoHeight >= 720) {
            $("#thisResolutionResult").text("O").css("color", "green");
        } else {
            $("#thisResolutionResult").text("X").css("color", "red");
        }
    };
    videoElement.src = URL.createObjectURL(thisVideo);
}
