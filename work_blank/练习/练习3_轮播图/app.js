
// 功能说明:
// 1. 点击向右(左)的图标, 平滑切换到下(上)一页
// 2. 无限循环切换: 第一页的上一页为最后页, 最后一页的下一页是第一页
// 3. 每隔3s自动滑动到下一页
// 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
// 5. 切换页面时, 下面的圆点也同步更新
// 6. 点击圆点图标切换到对应的页

/*
* 整体的实现思路：
*   1.绑定所有要操作的id
*   2.至少能够手动点击或者其他操作，让它动起来
*   2.5 解决循环播放的问题
*   3.自动轮播
*
*
* */

$(function () {
    //绑定所有需要的操作的事件，这也是JS的根本操作
    //轮播图区域
    var $container = $("#container");
    //图片
    var $list = $("#list");
    //图片下方的圆点
    var $pointsDiv = $("#pointsDiv>span");
    //图片数量
    var imgCount = $pointsDiv.length;
    //圆点下标
    var index=0;
    //标识翻页状态 true 代表此时翻页正在执行，不能再次点击翻页，false 代表可以翻页
    var moving=false;


    //上下翻页
    var $prev = $("#prev");
    var $next = $("#next");


    // 3. 每隔3s自动滑动到下一页
    var intervalId=setInterval(function () {
        nextPage(true);
    },1000);

    // 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
    $container.hover(function () {
        // 清除定时器
        clearInterval(intervalId)
    }, function () {
        intervalId = setInterval(function () {
            nextPage(true)
        }, 1000)
    });



    // 1. 点击向右(左)的图标, 平滑切换到下(上)一页
    $next.click(function () {
        //写一个函数来进行翻页
        nextPage(true);
    });
    $prev.click(function () {
        //写一个函数来进行翻页
        nextPage(false);
    });

    //6. 点击圆点图标切换到对应的页
    $pointsDiv.click(function () {
        //当点击的时候，获取当前span的下标值
        var currIndex = $(this).index();
        if (currIndex!==index){//确保点击的值和当前的红点下标不同。
            nextPage(currIndex);
        }


    })


    /**
     * nextPage() 用于上下翻页
     * @param next true 代表下一页 false代表上一页
     */
    function nextPage(next) {

        if (moving){
            return
        }
        moving=true;
        //每次移动的Left值
        var moveLeft=600;

        //当前的left值
        var currLeft = $list.position().left;
        var upOrDownOffset;
        if (typeof next==='boolean'){//如果是boolean值，就用原来的
            //用于确定是向左还是向右翻页 负数向左，正数向右
             upOrDownOffset=next ? -moveLeft : moveLeft;
        }else{
            //如果是数值 向右 值为负，向左 值为正

            upOrDownOffset=-(next-index)*moveLeft;
            //console.log(upOrDownOffset);
        }



        /*//当前的left + 需要移动的left = 跳转的页面
        $list.css("left",currLeft+upOrDownOffset);*/

        /*
        * 平滑翻页
        *  方法:setInterval()
        * 需要的参数：
        *   1.总时间
        *   2.每次间隔移动时间
        *   3.每次间隔移动的距离
        *   4.目标距离
        *
        * */
        //总时间 (自定义)
        var timeAll=400;

        //每次间隔移动时间 (自定义)
        var intervalTimeMove=10;

        //每次需要移动的距离 先算每次移动需要的时间（分成一块块的），在算出在规定的时间内每次需要移动的距离（每一块需要移动的距离）
        var moveOffsetLeft=upOrDownOffset/(timeAll/intervalTimeMove);

        //目标距离
        var targetLeft=currLeft+upOrDownOffset;

        var intervalOne=setInterval(function () {
            currLeft+=moveOffsetLeft;
            if (targetLeft===currLeft){//到达目标位置，停止当前的定时器
                clearInterval(intervalOne);
                moving=false;
            }

            /*console.log(Math.floor(currLeft));
            console.log((imgCount+1)*upOrDownOffset)*/
            //这两个是负值，所以判断大小要反过来
            if (Math.floor(currLeft)===(imgCount+1)*upOrDownOffset){//如果到达了最右边的1.jpg,则直接返回至开始第二张的1.jpg
               //alert(upOrDownOffset)
                currLeft=upOrDownOffset;

            }else if (currLeft===0){//如果是最开始的5.jpg,则直接返回至倒数第二张的5.jpg
                currLeft=-imgCount*upOrDownOffset;

            }


            //当前的left + 需要移动的left = 跳转的页面
            $list.css("left",currLeft);



        },intervalTimeMove);
        //更新圆点
        //console.log("next:"+next);
        updatePoints(next);


    }


    /**
     * 更新圆点
     * @param next
     */
    function updatePoints(next) {
        var targetIndex=0;
        if (typeof next ==='boolean'){
            if (next){//true 是往下翻一页 false是往上翻一页
                targetIndex=index+1;
                //目前有七张图片，但是index只能[0,imgCount.length-1]
                if (targetIndex===imgCount){
                    targetIndex=0;
                }
            }else{
                targetIndex=index-1;
                if(targetIndex===-1) { // 此时看到的是5.jpg-->第5个圆点
                    targetIndex = imgCount-1
                }

            }
        }else{
            //如果传进来的是数值，直接赋值就好了
            targetIndex=next;

        }

        //span 显示红点通过class=on
        //取消原来的红点
        $pointsDiv.eq(index).removeClass("on")
        //增加目前需要显示的红点
        $pointsDiv.eq(targetIndex).addClass("on");

        //更新下标
        index=targetIndex;

    }




})