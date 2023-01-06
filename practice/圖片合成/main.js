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
let arrImg = [];

$(function () {
    $(".inputFile").on("change", function (e) {
        // $("table").empty();
        // $("table").append(
        //     "<tr><th>檢查項目</th><th>需求規格</th><th>檢查結果</th> <th>是否通過</th></tr>"
        // );
        // console.log(e.target.files[0]);
        // processFile(e.target.files);
        convert(e, e.target.files[0]);
    });

    $(".dropBox").on("dragenter", dragenter);
    $(".dropBox").on("dragleave", dragleave);
    $(".dropBox").on("dragover", dragover);
    $(".dropBox").on("drop", drop);
});

function dragenter(e) {
    e.currentTarget.style.border = "5px solid red";
    e.currentTarget.text = "Drop it!";
}
function dragleave(e) {
    e.currentTarget.style.border = "5px dashed black";
    e.currentTarget.text = "Choose file by the button below or drop here.";
}

function dragleave(e) {
    e.currentTarget.style.border = "5px dashed black";
    e.currentTarget.text = "Choose file by the button below or drop here.";
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
    // console.log(files[0]);
    // convert(files[0]);
    // $("table").empty();
    // $("table").append(
    //     "<tr><th>檢查項目</th><th>需求規格</th><th>檢查結果</th> <th>是否通過</th></tr>"
    // );
    // convert(files[0]);
    // processFile(files);
    convert(e, files[0]);
    // dragleave(e);
}

function convert(e, file) {
    console.log(e.target);

    // 讓從 <input> 匯入檔案的 bar 不要被變更樣式
    if (e.type == "change") {
        if (!file.type.match(/image.*/)) {
            alert("請拖放圖片");
            // dragleave();
            return;
        }

        // 判斷從哪裡上傳
        if (e.target.id == "dropBox1" || e.target.id == "input1") {
            $("#p1").text("成功上傳!");
        } else if (e.target.id == "dropBox2" || e.target.id == "input2") {
            $("#p2").text("成功上傳!");
        }

        processFile(file);
        // dragleave();
        return;
    }
    //input from dragBox
    else if (!file.type.match(/image.*/)) {
        alert("請拖放圖片");
        dragleave(e);
        return;
    }
    // 判斷從哪裡上傳
    if (e.target.id == "dropBox1" || e.target.id == "input1") {
        $("#p1").text("成功上傳!");
    } else if (e.target.id == "dropBox2" || e.target.id == "input2") {
        $("#p2").text("成功上傳!");
    }
    processFile(file);
    dragleave(e);

    // let reader = new FileReader();
    // reader.onloadend = function () {
    //     let s = reader.result;
    //     $("#preview").text(s);
    //     dragleave();
    // };
    // reader.readAsText(file);
}

function processFile(file) {
    // console.log(file.name);

    let imgName = file.name;
    arrImg.push(imgName);
    // console.log(arrImg);

    if (arrImg.length == 2) {
        // $("#result").css("backgroundColor", "red");
        $("#result").css(
            "backgroundImage",
            `url('./${arrImg[0]}'), url('./${arrImg[1]}')`
        );
        console.log(2);
    }
    // console.log(file[0]);
    // $("table").append(
    //     $(`<tr><td colspan="4">影片名稱: ${thisVideo.name}</td></tr>`).css(
    //         "backgroundColor",
    //         "yellow"
    //     )
    // );

    // $("table").append(
    //     `<tr><td>影片長度:</td> <td>需介於60~90秒</td> <td id="thisDuration"></td> <td id="thisDurationResult"></td></tr>`
    // );
    // $("table").append(
    //     `<tr><td>影片格式:</td> <td>"mp4",
    //     "fiv", "avi", "mov", "mkv", "mpeg", "3gp", "wmv", "swf"</td> <td id="thisFormat">${thisVideo.type}</td> <td id="thisFormatResult"></td></tr>`
    // );
    // var thisFileType = thisVideo.type.split("/");

    // if (thisFileType[0] == "video") {
    //     if (LegalVideoFormats.indexOf(thisFileType[1] != -1)) {
    //         $("#thisFormatResult").text("O").css("color", "green");
    //     } else {
    //         $("#thisFormatResult").text("X").css("color", "red");
    //     }
    // } else {
    //     $("#thisFormatResult").text("非影片格式").css("color", "red");
    // }

    // $("table").append(
    //     `<tr><td>影片解析度:</td> <td>720p以上</td> <td id="thisResolution"></td> <td id="thisResolutionResult"></td></tr>`
    // );

    // let videoElement = document.createElement("video");
    // videoElement.preload = "metadata";

    // videoElement.onloadedmetadata = function () {
    //     thisVideo.duration = videoElement.duration;
    //     thisVideo.videoWidth = videoElement.videoWidth;
    //     thisVideo.videoHeight = videoElement.videoHeight;

    //     $("#thisDuration").text(thisVideo.duration);
    //     $("#thisResolution").text(
    //         thisVideo.videoWidth + "*" + thisVideo.videoHeight
    //     );

    //     if (thisVideo.duration >= 60 && thisVideo.duration <= 90) {
    //         $("#thisDurationResult").text("O").css("color", "green");
    //     } else {
    //         $("#thisDurationResult").text("X").css("color", "red");
    //     }

    //     if (thisVideo.videoWidth >= 1200 && thisVideo.videoHeight >= 720) {
    //         $("#thisResolutionResult").text("O").css("color", "green");
    //     } else {
    //         $("#thisResolutionResult").text("X").css("color", "red");
    //     }
    // };
    // videoElement.src = URL.createObjectURL(thisVideo);
}
