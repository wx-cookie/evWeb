$(function () {
    var httpUrl="http://www.wxlovezy.top:8080/spring";
    var isShow;
    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    var cid = GetRequest().id;
    var oldPage = GetRequest().currentPage;
    if(cid!=null || cid!='undefined'){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:httpUrl+"/adminQuestion/get/"+cid+"",
            success:function (res) {
                $("input[name='userName']").val(res.data.userName);
                $("textarea[name='comment']").text(res.data.content);
                $("textarea[name='replay']").text(res.data.replay);
                isShow = res.data.isShow;
            }
        })

    }
    //点击回复
    $('#replay').click(function () {
        var options={
            id:cid,
            replay : $("textarea[name='replay']").val()
        }
        $.ajax({
            type:"POST",
            dataType:"json",
            url:httpUrl+"/adminQuestion/replay",
            data:options,
            success:function (res) {
                alert(res.mess);
            },
            error:function (res) {
                alert(res.mess);
            }
        })
    })
    //显示评论
    $('#showComment').click(function () {
        if(isShow == 1){
            alert("该资讯已经显示");
            return;
        }
        $.ajax({
            type:"GET",
            dataType:"json",
            url:httpUrl+"/adminQuestion/setShow/"+cid+"",
            success:function (res) {
                alert(res.mess);
            },
            error:function (res) {
                alert(res.mess);
            }
        })
    })
    //点击返回
    $('.pub-btn a').click(function () {
        window.location.href="commentLists.html?currentPage="+oldPage+"&isBack=true";
    })
})