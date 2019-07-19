var container = document.getElementById('container')
var imageWidth = 220
var imagesSrc = []
var containerWidth = container.clientWidth
var colNum = Math.floor(containerWidth/imageWidth)
var space = (containerWidth-colNum*imageWidth)/(colNum+1)


getImages()
createImage()

//计算宽度等
function cal(){
    containerWidth = container.clientWidth
    colNum = Math.floor(containerWidth/imageWidth)
    space = (containerWidth-colNum*imageWidth)/(colNum+1)
}

// 获取图片资源
function getImages(){
    for(var i=0;i<24;i++){
        imagesSrc.push('images/'+(i+1)+".jpg")
    }
}

function createImage(){
    for(var i=0;i<imagesSrc.length;i++){
        var image = document.createElement('img')
        image.src = imagesSrc[i]
        image.style.width=imageWidth+'px'
        image.style.position="absolute"
        container.appendChild(image)
        image.onload = function(){
            // 图片onload后才有高度
            posiotion()
        }

    }
}

function posiotion(){
    cal()
    var images = document.getElementsByTagName('img')
    var pos = new Array(colNum)
    pos.fill(0)
    for(var i=0;i<images.length;i++){
        //var col = i%colNum
        //pos中最小的，为该图片所在列
        var minHeight = Math.min(...pos)
        var col = pos.indexOf(minHeight)
        images[i].style.left = (col*imageWidth+(col+1)*space)+'px'
        images[i].style.top = pos[col]+'px'
        pos[col] = pos[col]+space+images[i].height
    }

    // 容器高度设为能包住所有图片
    var maxHeight = Math.max(...pos)
    container.style.height = maxHeight+'px'
}

// 窗口改变时
var timer = null
window.onresize = function(){
    //防抖 ，防止频繁调用
    if(timer){
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        posiotion()
    }, 1000);

}