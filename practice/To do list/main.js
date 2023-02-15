$(function () {
    // $("#read").on("click", readHandler);
    // $("#write").on("click", writeHandler);
    // $("#update").on("click", updateHandler);
    // $("#delete").on("click", deleteHandler);

    $("#addBtn").on("click", writeHandler);
    // $(".updateBtn").on("click", updateHandler);
    // $(".deleteBtn").on("click", deleteHandler);
});

readHandler();

function readHandler() {
    let url = "https://raw.githubusercontent.com/Chengyou-Xie/HTML5/master/db.json";
    $.getJSON(url)
        .done((msg) => {
            $("table tr:not(:first)").remove();
            for (let x = 0; x < msg.length; x++) {
                console.log(msg[x].task);
                $("table").append(
                    `<tr><td>${msg[x].id}</td>
                         <td><input type='text' value='${msg[x].task}' id='input${msg[x].id}'></td>
                         <td><button class='updateBtn' name='${msg[x].id}'>Update</button></td>
                         <td><button class='deleteBtn' name='${msg[x].id}'>Delete</button></td></tr>`
                );
                console.log(msg[x].task);
            }
            $(".updateBtn").on("click", updateHandler);
            $(".deleteBtn").on("click", deleteHandler);
        })
        .fail((msg) => {
            console.log("Fail!");
        });
}

function writeHandler() {
    let url = "http://localhost:3000/to-do";
    let input = $("#addInput").val();

    $.post(url, {
        task: input,
    })
        .done((msg) => {
            console.log("write:" + msg.task);
            $("#addInput").val("");
            readHandler();
        })
        .fail(() => {
            console.log("Fail!");
        });
}

function updateHandler() {
    let url = "http://localhost:3000/to-do/" + this.name;
    let inputID = "input" + this.name;
    let input = document.getElementById(inputID).value;
    $.ajax({
        url: url,
        type: "PUT",
        data: `task=${input}`,
        success: (data) => {
            console.log("update:" + data.task);
            readHandler();
        },
    });
}
function deleteHandler() {
    let url = "http://localhost:3000/to-do/" + this.name;
    $.ajax({
        url: url,
        type: "DELETE",
        success: (data) => {
            readHandler();
        },
    });
}
