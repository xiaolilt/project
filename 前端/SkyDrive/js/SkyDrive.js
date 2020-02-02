new Vue({
    el: "#app",
    data: {
        show_imgs: [
            {imgUrl: 'img/img01.png',p: "组卷文件.JPG"},
            {imgUrl: 'img/img01.png',p: "组卷文件.JPG"},
            {imgUrl: 'img/img01.png',p: "组卷文件.JPG"},
            {imgUrl: 'img/img01.png',p: "组卷文件.JPG"},
            {imgUrl: 'img/img01.png',p: "组卷文件.JPG"},
            {imgUrl: 'img/img01.png',p: "组卷文件.JPG"},
            {imgUrl: 'img/img01.png',p: "组卷文件.JPG"},
            {imgUrl: 'img/img01.png',p: "组卷文件.JPG"},
        ]
    },
    methods: {
        return_top: function () {
            console.log(222)
        }
    }
})

//树形展开关闭
$(".tree-li-default").click(function () {
    var _parent = $(this).parent(".tree-li");
    var _find = $(_parent).siblings(".tree-li").find(".tree-li-default");
   
    $(".tree-li-default").removeClass("active");
    $(this).addClass("active");
    $(this).siblings(".tree-ul").slideToggle(300);
});

$(".right-top-btn button:first-child").click(function () {
    $(".files").show(300);
});

//上传文件
$(".right-top-btn button:last-child").click(function () {
    $(".upload").show(300);
});
$(".upload-close").click(function () {
    $(".upload").hide(300);
})

$(".show-tree").click(function () {
    if ($(this).text() == "收起") {
        $(this).text("展开");
        $(".tree-li-default").siblings().slideUp(300);
    } else {
        $(this).text("收起")
        $(".tree-li-default").siblings().slideDown(300);
    }
});


//展示切换
$(".tab-type .list").click(function () {
    $(this).addClass("active").siblings("div").removeClass("active");
    $(".tab-type-bg").css("left", "0");
    $(".table").fadeIn(300);
    $(".show-img-ul").fadeOut(0);
});

$(".tab-type .folder").click(function () {
    $(this).addClass("active").siblings("div").removeClass("active");
    $(".tab-type-bg").css("left", "50%");
    $(".table").fadeOut(0);
    $(".show-img-ul").fadeIn(300);
});

$(".del").click(function () {
    $(this).parents("tr").remove();
});

$(".check").click(function () {
    if ($(this).hasClass('null')) {
        $(this).removeClass("null");
        $(this).addClass("active");
    } else {
        $(this).removeClass('active')
        $(this).addClass("null");
    }
    var _check = $(".check");
    for (i = 0; i < $(_check).length; i++) {
        $(".last-check").removeClass("active").addClass("null");
    };
    if ($(_check).length == $('.check.active').length) {
        $(".last-check").removeClass("null").addClass("active");
    }
});
$(".last-check").click(function () {
    var fullchoose = $(this).parents("tr").siblings().children().find(".check");
    if ($(this).hasClass('null')) {
        $(this).removeClass("null");
        $(this).addClass("active");
        $(fullchoose).addClass("active");
        $(fullchoose).removeClass("null");
    } else {
        $(this).removeClass('active')
        $(this).addClass("null");
        $(fullchoose).removeClass("active");
        $(fullchoose).addClass("null");
    }
    console.log($(this))
});

$(".wrap-null").click(function () {
    $(".wrap").hide(300);
});
$(".wrap-inner-btn:first-child").click(function () {
    $(".wrap").hide(300);
});
$(".wrap-inner-btn:last-child").click(function () {
    $(".wrap").hide(300);
});
$(".upload-close").click(function () {
    $(".wrap").hide(300);
});
$(".upload-success button").click(function () {
    $(".wrap").hide(300);
});

$(".show-btn").click(function () {
    var _parents = $(this).parents(".box-left");
    $(this).toggleClass("active");
    $(_parents).toggleClass("active");
    $(_parents).siblings(".box-right").toggleClass("active");
})

//适应高度
$(document).ready(function () {
    $(".file-tree").css("height", $(window).height() - $(".shallskey").height());
    $(".box-right-inner").css("height", $(window).height() - $(".shallskey").height());
    $(".file-tree>.tree-ul").css("height", $(".file-tree").outerHeight() - $(".file-tree-btn").outerHeight() - 90);
    $(".show").css("height", $(".box-right-inner").outerHeight() - $(".page").outerHeight() - $(".box-right-nav").outerHeight() - 80);
    console.log($(".scroll").outerHeight())
});

//触发键盘enter
document.onkeydown = function (e) {
    e = e || event;
    if (e.keyCode == 13) {
        console.log("enter")
        return false;
    }
};

//删除
$(".delete").click(function(){
    $(this).parents(".ready-li").remove();
});

$(".ready-inner button").click(function(){
    $(this).remove().siblings("p");
    $(".ready-inner>p").remove();
    $(".ready-inner>h3").remove();
    $(".process-show").show();
    $(".process-all").show();
    $(".ready-li-inner>span").css("opacity","1");
    $(".upload-icon").remove();
    setTimeout(function(){
        $(".ready-inner").css("display","none");
        $(".upload-success").css("display","block");
    },2000);
});

$(".upload-icon").click(function(){
    var _parents=$(this).parents(".ready-li");
    var _siblings=$(this).siblings("span");
    $(_parents).addClass("active");
    $(this).remove();
    $(_siblings).css("opacity","1");
    $(_siblings).children().css("opacity","1");
    setTimeout(function(){
        $(".ready-li:first-child .ready-li-scroll").css("width","100%");
        $(".ready-li:first-child .success").css("opacity","1");
        $(".ready-li:first-child .ready-li-inner>span").css("color","#fff");
        $(".ready-li:first-child .ready-li-inner>span>b").css("opacity","0");
        $(".ready-li:first-child .delete").attr("src","img/icon35.png");
    },1000);
})
