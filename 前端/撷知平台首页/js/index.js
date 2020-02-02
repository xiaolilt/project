var app = new Vue({
    el: "#app",
    data: {
        countdown:0,
        countdownInterval:''
    },
    methods: {
         list_menu:function(){
            $(".drop-menu-list").slideToggle()
        },
        //密码安全
        password_safety: function () {
            var node = event.currentTarget;
            if ($(node).attr('src') == "img/index-icon17.png") {
                $(node).attr("src", "img/index-icon16.png");
                $(node).siblings("input").attr("type", "text")
            } else {
                $(node).attr("src", "img/index-icon17.png");
                $(node).siblings("input").attr("type", "password")
            }
        },
        //自动登录
        auto_lgin: function () {
            var node = event.currentTarget;
            if ($(node).children("img").attr('src') == "img/index-icon13.png") {
                $(node).children("img").attr("src", "img/index-icon12.png");
            } else {
                $(node).children("img").attr("src", "img/index-icon13.png");
            }
        },
        //登录按钮
        login: function () {
            var _phone = $('.login .login-input input[type="text"]');
            var _password = $('.login .login-input input[type="password"]');

            if ($(_phone).val().length == 0) {
                $(".toast").fadeIn().delay(1000).fadeOut()
            } else if ($(_phone).val().length > 11 || $(_phone).val().length < 11) {
                $(".toast").fadeIn().delay(1000).fadeOut().html("手机号输入有误")
            } else if ($(_password).val().length == 0) {
                $(".toast").fadeIn().delay(1000).fadeOut().html("密码不能为空")
            } else {
                $(".wrap").fadeOut();
            }
        },
        //忘记密码
        forget: function () {
            $(".login").slideUp();
            $(".forget").slideDown();
        },
        //忘记密码下一步按钮
        forget_next: function () {
            var forget_phone = $('.forget .login-input input[type="text"]');
            var forget_password = $('.forget .login-yzm input[type="password"]');

            if ($(forget_phone).val().length == 0) {
                $(".toast").fadeIn().delay(1000).fadeOut()
            } else if ($(forget_phone).val().length > 11 || $(forget_phone).val().length < 11) {
                $(".toast").fadeIn().delay(1000).fadeOut().html("手机号输入有误")
            } else if ($(forget_password).val().length == 0) {
                $(".toast").fadeIn().delay(1000).fadeOut().html("验证码不能为空")
            } else {
                $(".forget").slideUp();
                $(".set-forget").slideDown();
            }
        },
        //获取验证码
        get_yzm: function () {
            var that = this;
            if (that.countdown == 0) {
                that.countdown = 60;
                that.countdownInterval = setInterval(function () {
                    if(that.countdown <= 0){
                        clearInterval(that.countdownInterval);
                        that.countdown = 0;
                    }else{
                        that.countdown -= 1;
                    }
                }, 1000);
            }

        },
        //重置密码
        set_forget: function () {
            var forget_phone = $('.set-forget .login-input input[type="text"]');
            var forget_password = $('.set-forget .login-input input[type="password"]');

            if ($(forget_phone).val().length == 0) {
                $(".toast").fadeIn().delay(1000).fadeOut()
            } else if ($(forget_phone).val().length > 11 || $(forget_phone).val().length < 11) {
                $(".toast").fadeIn().delay(1000).fadeOut().html("手机号输入有误")
            } else if ($(forget_password).val().length == 0) {
                $(".toast").fadeIn().delay(1000).fadeOut().html("验证码不能为空")
            } else {
                $(".set-forget").slideUp();
                $(".resrt-success").slideDown();
                $(".wrap").delay(1000).fadeOut();
            }
        },
        // 登录
        login_index: function () {
            $(".wrap").slideDown();
        },
        // 微信登录
        wechat_login: function () {
            $(".login").slideUp();
            $(".wechat").slideDown();
        },
        //账号登录
        user_login: function () {
            $(".wechat").slideUp();
            $(".login").slideDown();
        },
        //去绑定
        go_binding: function () {
            $(".binding-tip").slideUp();
            $(".binding").slideDown();
        },
        // 微信绑定手机号
        binding_btn: function () {
            var binding_phone = $('.binding .login-input input[type="text"]');
            var binding_password = $('.binding .login-input input[type="password"]');

            if ($(binding_phone).val().length == 0) {
                $(".toast").fadeIn().delay(1000).fadeOut()
            } else if ($(binding_phone).val().length > 11 || $(binding_phone).val().length < 11) {
                $(".toast").fadeIn().delay(1000).fadeOut().html("手机号输入有误")
            } else if ($(binding_password).val().length == 0) {
                $(".toast").fadeIn().delay(1000).fadeOut().html("验证码不能为空")
            } else {
                $(".binding").slideUp();
                $(".binding-success").slideDown();
                $(".wrap").delay(1000).fadeOut();
            }
        },
       

    }
})
$(".login-input").click(function () {
    $(this).addClass("active").siblings(".login-input").removeClass("active")
});
$(".index-close").click(function () {
    $(".wrap").slideUp();
});
