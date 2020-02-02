function getHost(){
    var s=location.href;
    var i=s.indexOf('/',10);
    if(i!=-1){
        s=s.substring(0,i);
    }
    return s;
}

var Web={
    host: getHost(),
//    host:"http://test.shellskey.com",
//     host:"http://127.0.0.1:8080",
    getData:function(){
        var data=this.getValue("data");
        // console.log("data", typeof(data), data);
        return data;
    },

    getUser: function () {
        var user = this.getValue("user");
        return user;
    },

    saveUser: function (user) {
        this.setValue("user", user);
        console.log("*** user2",user);
    },

    getToken:function(){
        var user = this.getValue("user");
        return user && user.token;
    },
    
    get:function(url,data,success){
        var data2="";
        if(data){
            for(var key in data){
                data2+="&"+key+"="+encodeURIComponent(data[key]);
            }
        }
        jQuery.ajax({
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            url:url,
            data:data2,
            dataType: "json",
            success: success
        });
    },

    post:function(url,data,success){
        jQuery.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url:url,
            data:JSON.stringify(data),
            dataType: "json",
            success: success
        });
    },

    post1:function(url,data,success,error){
        jQuery.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            async: false,
            dataType: 'json',
            cache: false,
            success: success,
            error: error
        });
    },

    getSrc:function(s){
        if(s && s.indexOf("http")==-1){
            if(s.indexOf("/f/")!=0){
                s="/f/"+s;
            }
            s=this.host+s;
        }
        return s;
    },

    setValue:function(key, value){
        store.set(key, value);
    },

    getValue:function (key) {
        return store.get(key);
    },

    getParam: function (url, name, defaultValue) {
        if (typeof (url) == 'undefined' || !url) {
            url = window.location.search.substr(1);
        }
        var i = url.indexOf('#');
        if (i != -1) {
            url = url.substring(0, i);
        }
        i = url.indexOf('?');
        if (i != -1) {
            url = url.substring(i + 1);
        }
        url = '&' + url + '&';
        var key = '&' + name + '=';
        var i = url.indexOf(key);
        if (i != -1) {
            var j = url.indexOf('&', i + key.length);
            if (j != -1) {
                return url.substring(i + key.length, j);
            }
        }
        return defaultValue;
    },

    showMessage: function(msg, duration) {
        duration = isNaN(duration) ? 3000 : duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText = "width:50%; min-width:9.4rem; background:#000; opacity:0.5; height:2.5rem; color:#fff; line-height:2.5rem; text-align:center; border-radius:5px; position:fixed; top:40%; left:25%; z-index:999999; font-weight:bold;";
        document.body.appendChild(m);
        setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(m)
            }, d * 1000);
        }, duration);
    },

    reload:function(){
        var s=location.href;
        var i=s.lastIndexOf("#");
        if(i!=-1){
            s=s.substring(0,i);
        }
        i=s.lastIndexOf("&_=");
        if(i!=-1){
            s=s.substring(0,i)+"&_="+Math.random();
        }else{
            var j=s.indexOf("?");
            if(j!=-1){
                s=s+"&_="+Math.random();
            }else{
                s=s+"?&_="+Math.random();
            }
        }
        location.href=s;
    },

    goBack:function(){
        window.history.go(-1);
    },

    go:function (url) {
        location.href=url;
    },
    
    login: function (username, password, callback) {
		Web.post(Web.host + "/api/web/login.do", {username:username,password:password}, function (res) {
            if(callback) callback(res);
			if (res.status && res.data) {
            	res.data.photo=Web.getSrc(res.data.photo);
                Web.saveUser(res.data);
                Web.go('prepare-management.html');
                // var go=Web.getParam(location.href,'go','index.html');
                // location.href=go;
            }else{
			    $(".errorMessage").show();
                //alert("登录失败！");
            }
        });
    },
    
    logout:function(){
    	var user=Web.getUser();
        if(user && user.token){
        	Web.post(Web.host + "/api/web/logout.do", {token:user.token}, function (res) {
        		Web.saveUser(null);
            	location.href="index.html";
        	});
        }else{
        	Web.saveUser(null);
        	location.href="index.html";
        }
    }

};
Web.Ajax = {
    post: function(o){
        $.ajax({
            url: o.url,
            type: 'POST',
            data: o.data,
            dataType: o.dataType,
            timeout: 5000,
            error: o.error,
            success: o.success
        });
    },
    get: function(o){
        $.ajax({
            url: o.url,
            type: 'GET',
            data: o.data,
            dataType: o.dataType,
            timeout: 5000,
            error: o.error,
            success: o.success
        });
    }
};
