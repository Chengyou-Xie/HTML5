let btns = document.querySelectorAll("button");
let showData = document.querySelector("#showData");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", loadServerData);
}

function pad2(num) {
    // if (num.toString().length >= 2) {
    //     return num;
    // } else {
    //     return "0" + num;
    // }
    return num.toString().length >= 2 ? num : "0" + num;
}

function loadServerData() {
    // console.log("Load Server Data");
    // 無參數時則為當日日期、2022/2/2、2022/2/22、2022/12/2
    let d;
    if (this.id == "btnToday") {
        d = new Date();
    } else {
        d = new Date(this.innerHTML);
    }

    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let date = "" + year + pad2(month) + pad2(day);

    console.log(date);

    let xmlHttpRequest;
    if (window.XMLHttpRequest) {
        xmlHttpRequest = new XMLHttpRequest();
    } else {
        alert("No xmlHttpRequest");
        return;
    }

    // 設定 XMLHttpRequest 物件
    xmlHttpRequest.open("GET", date + ".txt", true);
    xmlHttpRequest.send();

    xmlHttpRequest.onreadystatechange = function () {
        // console.log("readyState:", xmlHttpRequest.readyState);
        // console.log("status:", xmlHttpRequest.status);

        // 此狀態為最佳
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            showData.innerHTML = xmlHttpRequest.responseText;
            // btn.style.visibility = "hidden";
        }
    };
}
