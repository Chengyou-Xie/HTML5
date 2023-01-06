$(function () {
    $("[type='checkbox']").on("change", updateProgress);
});

function updateProgress() {
    let hasChecked = 0;
    for (let x = 0; x < $("[type='checkbox']").length; x++) {
        if ($("[type='checkbox']")[x].checked) {
            hasChecked += 1;
        }
    }

    $("progress").attr("min", 0);
    $("progress").attr("max", $("[type='checkbox']").length);
    $("progress").attr("value", hasChecked);
}

///////////////////////////////////////////////////////////

$(function () {
    $("#myRange").on("change", updateRange);
});

function updateRange() {
    console.log(this.value);
    // let hasChecked = 0;
    // for (let x = 0; x < $("[type='checkbox']").length; x++) {
    //     if ($("[type='checkbox']")[x].checked) {
    //         hasChecked += 1;
    //     }
    // }

    $("meter").attr("min", 0);
    $("meter").attr("max", this.max);
    $("meter").attr("value", this.value);
}
