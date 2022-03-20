$(function () {

    showhide();
    showmeun();
    search();
    share();
    address();
    address_tabs();
    mini_cart();
    product_tabs();
    move_miniImg();
    hover_Mini_Transform_Medium_Img();
    medium_Transform_large_Img();
    //bigImg();

    function medium_Transform_large_Img() {
        var $mediumImg = $('#mediumImg');
        var $mask = $('#mask');
        var $maskTop = $('#maskTop');
        var $largeImgContainer = $('#largeImgContainer');
        var $loading = $('#loading');
        var $largeImg = $('#largeImg');
        var maskWidth = $mask.width();
        var maskHeight = $mask.height();
        var maskTopWidth = $maskTop.width();
        var maskTopHeight = $maskTop.height();
        $maskTop.hover(function () {
            $mask.show();
            // 动态加载对应的大图
            // images\products\product-s2-m.jpg
            // images/products/product-s2-l.jpg
            var src = $mediumImg.attr('src').replace('-m.', '-l.')
            $largeImg.attr('src', src)
            $largeImgContainer.show()
            // 绑定加载完成的监听
            //当需要加载当前先处理好的数据时（不是静态的数据，是动态的产生的数据(比如执行方法之后产生的数据)）,用on(load) 来获取数据
            //不然获取不到
            $largeImg.on('load', function () { // 大图加载完成

                // 得到大图的尺寸
                var largeWidth = $largeImg.width()
                var largeHeight = $largeImg.height()

                // 给$largeImgContainer设置尺寸
                $largeImgContainer.css({
                    width: largeWidth/2,
                    height: largeHeight/2
                })
                // 显示大图
                $largeImg.show()
                // 隐藏加载进度条
                $loading.hide()
                //console.log($largeImg.width(), $largeImg.height())

                //鼠标移动的监听
                $maskTop.mousemove(function (event) {
                    /*
                    1. 移动小黄块
                    2. 移动大图
                     */
                    /*1. 移动小黄块*/
                    //计算left/top
                    var left = 0
                    var top = 0
                    // 事件的坐标
                    var eventLeft = event.offsetX
                    var eventTop = event.offsetY
                    left = eventLeft - maskWidth/2
                    top = eventTop - maskHeight/2
                    // left在[0, maskTopWidth-maskWidth]
                    if(left<0) {
                        left = 0
                    } else if(left>maskTopWidth-maskWidth) {
                        left = maskTopWidth-maskWidth
                    }
                    // top在[0, maskTopHeight-maskHeight]
                    if(top<0) {
                        top = 0
                    } else if(top>maskTopHeight-maskHeight) {
                        top = maskTopHeight-maskHeight
                    }
                    //给$mask重新定位
                    $mask.css({
                        left: left,
                        top: top
                    })

                    /*2. 移动大图*/
                    // 得到大图的坐标
                    left = -left *  largeWidth / maskTopWidth
                    top = -top * largeHeight / maskTopHeight
                    // 设置大图的坐标
                    $largeImg.css({
                        left: left,
                        top: top
                    })
                })
            })
            /*$maskTop.mousemove(function (event) {
                //计算left/top
                var left = 0;
                var top = 0;
                //事件的坐标
                var eventLeft = event.offsetX
                var eventTop = event.offsetY
                left = eventLeft - maskWidth/2
                top = eventTop - maskHeight/2
                // left在[0, maskTopWidth-maskWidth]
                if(left<0) {
                    left = 0
                } else if(left>maskTopWidth-maskWidth) {
                    left = maskTopWidth-maskWidth
                }
                // top在[0, maskTopHeight-maskHeight]
                if(top<0) {
                    top = 0
                } else if(top>maskTopHeight-maskHeight) {
                    top = maskTopHeight-maskHeight
                }



                $mask.css({
                    left: left,
                     top: top
                })
            });*/


        }, function () {
            $mask.hide();
            $largeImgContainer.hide()
            $largeImg.hide()

        })


    }

    /*
 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
 */
   /* function bigImg () {
        var $mediumImg = $('#mediumImg')
        var $mask = $('#mask') // 小黄块
        var $maskTop = $('#maskTop')
        var $largeImgContainer = $('#largeImgContainer')
        var $loading = $('#loading')
        var $largeImg = $('#largeImg')
        var maskWidth = $mask.width()
        var maskHeight = $mask.height()
        var maskTopWidth = $maskTop.width()
        var maskTopHeight = $maskTop.height()

        $maskTop.hover(function () {// 进入
            $mask.show()

            // 动态加载对应的大图
            // images\products\product-s2-m.jpg
            // images/products/product-s2-l.jpg
            var src = $mediumImg.attr('src').replace('-m.', '-l.')
            $largeImg.attr('src', src)
            $largeImgContainer.show()
            // 绑定加载完成的监听
            //当需要加载当前先处理好的数据时（不是静态的数据，是动态的产生的数据(比如执行方法之后产生的数据)）,用on(load) 来获取数据
            //不然获取不到
            $largeImg.on('load', function () { // 大图加载完成

                // 得到大图的尺寸
                var largeWidth = $largeImg.width()
                var largeHeight = $largeImg.height()

                // 给$largeImgContainer设置尺寸
                $largeImgContainer.css({
                    width: largeWidth/2,
                    height: largeHeight/2
                })
                // 显示大图
                $largeImg.show()
                // 隐藏加载进度条
                $loading.hide()
                console.log($largeImg.width(), $largeImg.height())

                //鼠标移动的监听
                $maskTop.mousemove(function (event) {
                    /!*
                    1. 移动小黄块
                    2. 移动大图
                     *!/
                    /!*1. 移动小黄块*!/
                    //计算left/top
                    var left = 0
                    var top = 0
                    // 事件的坐标
                    var eventLeft = event.offsetX
                    var eventTop = event.offsetY
                    left = eventLeft - maskWidth/2
                    top = eventTop - maskHeight/2
                    // left在[0, maskTopWidth-maskWidth]
                    if(left<0) {
                        left = 0
                    } else if(left>maskTopWidth-maskWidth) {
                        left = maskTopWidth-maskWidth
                    }
                    // top在[0, maskTopHeight-maskHeight]
                    if(top<0) {
                        top = 0
                    } else if(top>maskTopHeight-maskHeight) {
                        top = maskTopHeight-maskHeight
                    }
                    //给$mask重新定位
                    $mask.css({
                        left: left,
                        top: top
                    })

                    /!*2. 移动大图*!/
                    // 得到大图的坐标
                    left = -left *  largeWidth / maskTopWidth
                    top = -top * largeHeight / maskTopHeight
                    // 设置大图的坐标
                    $largeImg.css({
                        left: left,
                        top: top
                    })
                })
            })


        }, function () {
            $mask.hide()
            $largeImgContainer.hide()
            $largeImg.hide()
        })


    }*/

    function hover_Mini_Transform_Medium_Img() {
        $('#icon_list>li').hover(function () {
            //给小图加上红边框
            var $img = $(this).children();
            $img.addClass('hoveredThumb');
            //鼠标移动到小图，同步到中图中
            var replaceForMedium = $img.attr('src').replace('.jpg', '-m.jpg');
            $('#mediumImg').attr('src', replaceForMedium);

        }, function () {
            var $img = $(this).children();
            $img.removeClass('hoveredThumb');
        })

    }

    function move_miniImg() {
        //获取两个a标签
        var $preview_div = $('#preview>h1>a');
        var $backward = $preview_div.first();
        var $forward = $preview_div.last();

        //一行显示图数
        var SHOW_IMG = 5;
        //先获取ul
        var $iconList_ul = $('#icon_list');
        //图片总数量(所有的图片都放在Ul的下面，也就是Li的个数)
        var imgCount_li = $iconList_ul.children('li').length;
        //记录移动的次数
        var moveCount = 0;
        //当前一张图片占用的宽度，也就是Li的宽度
        var li = $iconList_ul.children(':first').width();

        //一行显示5张小图
        //如果想要能够向右移动，那么当前的小图就得大于5
        //初始化更新
        if (imgCount_li > SHOW_IMG) {
            $forward.attr('class', 'forward');
        }

        $forward.click(function () {
            //每次点击只能翻一张，那么总数（7）-显示量（5）=（2）===移动次数（2）（只能点两次），则不能在翻了
            if (moveCount === imgCount_li - SHOW_IMG) {
                return
            }
            moveCount++;
            $backward.attr('class', 'backward');
            if (moveCount === imgCount_li - SHOW_IMG) {
                $forward.attr('class', 'forward_disabled');
            }
            $iconList_ul.css({
                left: -moveCount * li
            })

        });

        $backward.click(function () {
            //这一步避免了直接更改HTML代码，然后还可以移动图片的Bug
            if (moveCount === 0) {
                return
            }
            moveCount--;
            $forward.attr('class', 'forward');
            if (moveCount === 0) {
                $backward.attr('class', 'backward_disabled');
            }
            $iconList_ul.css({
                left: -moveCount * li
            })

        });


    }


    function product_tabs() {
        var $productLi = $('#product_detail>ul>li');
        var $productDiv = $('#product_detail>div:gt(0)');
        $productLi.click(function () {
            //删除原来的current
            $productLi.removeClass('current');
            //给当前点击的this添加current
            $(this).addClass('current');
            //同时隐藏所有的div
            $productDiv.hide();
            //找到当前点击的下标值
            var index = $(this).index();
            //给当前点击的div显示
            $productDiv.eq(index).show();
        });

    }

    function mini_cart() {
        $('#minicart').hover(function () {
            $(this).addClass('minicart');
            $(this).children(':last').show();

        }, function () {
            $(this).removeClass('minicart');
            $(this).children(':last').hide();
        })

    }


    function address_tabs() {
        // $('#store_items').hide();
        //地区选择更换地址标签项
        $('#store_tabs>li').click(function () {
            $('#store_tabs>li').removeClass('hover');
            $(this).addClass('hover');
            // $('#store_items').show();
        });


    }

    function address() {
        /*
        * 1.鼠标移入显示地区选择，移出自动折叠
        * 2.鼠标移入之后显示关闭按钮，并可点击。点击之后折叠
        * */
        var $storeSelect = $('#store_select');
        $storeSelect
            //操作的都是$storeSelect的子元素
            .hover(function () {
                $(this).children(':gt(0)').show();
            }, function () {
                $(this).children(':gt(0)').hide();
            })
            .children(':last')
            .click(function () {
                //点击关闭按钮操作的是$storeSelect下面的元素，不是$storeSelect它本身
                $storeSelect.children(':gt(0)').hide();
            });

    }


    function share() {
        /*点击分享按钮展开，需要操作三个数据
        * 1.当前父元素的长度
        * 2.最后两个a标签的display属性
        * 3.当前的孩子元素添加一个class属性
        * */
        var $shareMore = $('#shareMore');
        var $shareMore_div = $shareMore.parent();
        var $shareMore_a = $shareMore.prevAll('a:lt(2)');
        var $shareMore_b = $shareMore.children('b');
        //展开与折叠的标识符
        var isOpen = true;
        $shareMore.click(function () {
            if (isOpen) {
                $shareMore_div.css('width', 200);
                $shareMore_a.show();
                $shareMore_b.addClass('backword');

            } else {
                $shareMore_div.css('width', 155);
                $shareMore_a.hide();
                $shareMore_b.removeClass('backword');
            }
            isOpen = !isOpen;

        });


    }

    function search() {
        $('#txtSearch').on('keyup focus', function () {
            //输入框有数据则触发查询(空格不算)
            var data = $(this).val().trim();
            if (data) {
                $('#search_helper').show();
            }

        })
            .blur(function () {
                $('#search_helper').hide();
            })


    }

    //二级菜单的展开与隐藏
    function showmeun() {
        $('#category_items>div').hover(function () {
            $(this).children(':last').show();

        }, function () {
            $(this).children(':last').hide();
        });
    }

    //商品项的展开与隐藏
    function showhide() {
        $('[name=show_hide]').hover(function () {
            //alert(this.id);
            /* var attr = $(this).prop("id");
             alert(attr)*/
            var id = this.id + "_items";
            $('#' + id).show();
        }, function () {
            var id = this.id + "_items";
            $('#' + id).hide();
        })
    }


})