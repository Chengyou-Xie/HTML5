$(function () {
    // debugger;

    // load video: set video element's src
    $("#myVideo").attr("src", "sample-mp4-file.mp4");

    // set button
    $("#palyBtn").on("click", () => {
        $("#volumeDisplay").text($("#myVideo")[0].volume.toFixed(2));
        $("#progressBar")[0].max = $("#myVideo")[0].duration;

        if ($("#myVideo")[0].paused) {
            // paused 為<video>屬性，回傳是否為暫停
            $("#myVideo")[0].play();
            $("#palyBtn").text("Pause");
        } else {
            $("#myVideo")[0].pause();
            $("#palyBtn").text("Play");
        }
    });
    $("#fullBtn").on("click", () => {
        $("#myVideo")[0].webkitEnterFullscreen();
    });

    $("#lowerVolumeBtn").on("click", downVolume);
    $("#higherVolumeBtn").on("click", upVolume);
    $("#myVideo").on("timeupdate", updateProgress);
    $("#progressBar").on("change", changeProgress);

    function downVolume() {
        var myVideo = $("#myVideo")[0];
        if (myVideo.volume <= 0.1) {
            myVideo.volume = 0;
        } else {
            myVideo.volume -= 0.1;
        }
        $("#volumeDisplay").text(myVideo.volume.toFixed(2));
    }
    function upVolume() {
        var myVideo = $("#myVideo")[0];
        if (myVideo.volume >= 0.9) {
            myVideo.volume = 1;
        } else {
            myVideo.volume += 0.1;
        }
        $("#volumeDisplay").text(myVideo.volume.toFixed(2));
    }
    function updateProgress() {
        $("#timeDisplay").text(Math.floor($("#myVideo")[0].currentTime));
        $("#timeDisplay").append(
            "/" + Math.floor($("#myVideo")[0].duration) + "秒"
        );
        // $('#timeDisplay').append(`/${Math.floor($('#myVideo')[0].duration)}秒`);
        $("#progressBar")[0].value = $("#myVideo")[0].currentTime;
    }
    function changeProgress() {
        // $("#myvideo")[0].pause();
        $("#myVideo")[0].currentTime = $("#progressBar")[0].value;
        // $("#myvideo")[0].play();
    }
});
