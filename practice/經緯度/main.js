// $(function () {
//     getLocation();
// });

// function getLocation() {
//     if (navigator.geolocation == undefined) {
//         alert("Fail to get locetion");
//         return;
//     }
//     let settings = {
//         enableHighAccuracy: true,
//     };

//     navigator.geolocation.getCurrentPosition(result, error, settings);
// }

// function result(position) {
//     // debugger;
//     let thisCoords = position.coords;
//     console.log(`Location: ${thisCoords.latitude}, ${thisCoords.longitude}`);
//     // window.location.href = `https://googlemaps.com.tw?q=${thisCoords.latitude},${thisCoords.longitude}`;
// }
// function error(err) {
//     alert(err);
// }

// var m = document.getElementById("msg");
// function getLocation() {
//     //取得 經緯度
//     if (navigator.geolocation) {
//         //
//         navigator.geolocation.getCurrentPosition(showPosition); //有拿到位置就呼叫 showPosition 函式
//     } else {
//         m.innerHTML =
//             "您的瀏覽器不支援 顯示地理位置 API ，請使用其它瀏覽器開啟 這個網址";
//     }
// }
// function showPosition(position) {
//     m.innerHTML =
//         " 緯度 (Latitude): " +
//         position.coords.latitude +
//         "<br>經度 (Longitude): " +
//         position.coords.longitude;
// }
