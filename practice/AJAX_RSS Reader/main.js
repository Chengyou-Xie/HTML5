$(function () {
    $("button").on("click", loadServerData);
});

function loadServerData() {
    let rss2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

    // 這裡放你要抓取的 rss網址
    $.getJSON(rss2JSON + "https://www.ttv.com.tw/rss/RSSHandler.ashx?d=news")
        .done((data) => {
            for (let x = 0; x < data.items.length; x++) {
                // let thisRow = `<tr><td><a target='_blank' href='${
                //     data.items[x].link
                // }'>${data.items[x].title}</a></td> <td>${
                //     data.items[x].pubDate.split(" ")[0]
                // }</td></tr>`;
                // $("#dataTable").append(thisRow);
                let thisRow = "<tr>";
                thisRow += `<td><a target='_blank' href='${data.items[x].link}'>${data.items[x].title}</a></td>`;
                thisRow += `<td>${data.items[x].pubDate.split(" ")[0]}</td>`;
                thisRow += "</>";

                $("#dataTable").append(thisRow);
            }
        })
        .fail(() => {
            console.log("Fail");
        })
        .always(() => {
            console.log("Always");
        });
}
