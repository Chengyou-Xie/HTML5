var thisColor;

$(function () {
    $("[type='color']").on("change", showColor);
});

function showColor() {
    // let thisColor = this.value;

    // document.querySelector("body").style.background = this.value;
    $("body").css("background", this.value);
}
