let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;

const gridLength = 200;

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

$(function () {
    // 0可走 1障礙物 2終點 3敵人
    mapArray = [
        [0, 1, 1],
        [0, 0, 0],
        [3, 1, 2],
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    // 角色位置
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        x: 0,
        y: 0,
    };

    // 確認圖片載入完成時再繪製到 canvas 上
    imgMain.onload = function () {
        ctx.drawImage(
            imgMain,
            0,
            0,
            80,
            130,
            currentImgMain.x,
            currentImgMain.y,
            gridLength,
            gridLength
        );
    };
    // 此段程式碼改寫成網頁撰寫方式

    // 障礙物位置、敵人位置
    //   imgMountain = new Image();
    //   imgMountain.src = "images/material.png";
    //   imgEnemy = new Image();
    //   imgEnemy.src = "images/Enemy.png";

    // https://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
    // imgMountain.onload = function () {
    //     imgEnemy.onload = function () {
    //         for (var i = 0; i < mapArray.length; i++) {
    //             for (var j = 0; j < mapArray.length; j++) {
    //                 if(mapArray[i][j] == 1){
    //                     ctx.drawImage(imgMountain, 32, 65, 32, 32, j*gridLength, i*gridLength, gridLength, gridLength );
    //                 }
    //                 else if(mapArray[i][j] == 3){
    //                     ctx.drawImage(imgEnemy, 7, 40, 104, 135, j*gridLength, i*gridLength, gridLength, gridLength );
    //                 }
    //             }
    //         }
    //     }
    // }
    var sources = {
        mountain: "images/material.png",
        enemy: "images/Enemy.png",
    };

    loadImages(sources, function (images) {
        for (var i = 0; i < mapArray.length; i++) {
            for (var j = 0; j < mapArray.length; j++) {
                if (mapArray[i][j] == 1) {
                    ctx.drawImage(
                        images.mountain,
                        32,
                        65,
                        32,
                        32,
                        j * gridLength,
                        i * gridLength,
                        gridLength,
                        gridLength
                    );
                } else if (mapArray[i][j] == 3) {
                    ctx.drawImage(
                        images.enemy,
                        7,
                        40,
                        104,
                        135,
                        j * gridLength,
                        i * gridLength,
                        gridLength,
                        gridLength
                    );
                }
            }
        }
    });
});

// 使用者動作事件
$(document).on("keydown", (event) => {
    // debugger;
    let targetImg, targetBlock, cutImagePositionX, cutImagePositionY;
    targetImg = {
        x: -1,
        y: -1,
    };
    targetBlock = {
        x: -1,
        y: -1,
    };
    event.preventDefault();
    // console.log(event.code);

    switch (event.code) {
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            break;

        default:
            return;
    }

    // 確認目標位置仍在 map 內，並改變其座標
    if (
        targetImg.x <= 400 &&
        targetImg.x >= 0 &&
        targetImg.y <= 400 &&
        targetImg.y >= 0
    ) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if (targetBlock.x != -1 && targetBlock.y != -1) {
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有山");
                break;
            case 2:
                $("#talkBox").text("終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3:
                $("#talkBox").text("哈囉");
                break;
        }
    } else {
        $("#talkBox").text("邊界");
    }
    ctx.drawImage(
        imgMain,
        cutImagePositionX,
        0,
        80,
        130,
        currentImgMain.x,
        currentImgMain.y,
        gridLength,
        gridLength
    );
});
