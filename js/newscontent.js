$(function () {
    var httpUrl = "http://www.wxlovezy.top:8080/spring";
    var $articleHead = $('.articleHead');
    var $articleContent = $('.articlephases');
    var perimeters =  window.location.search;
    var newId = perimeters.substr(1);
    var commentTotal;
    var currentPage = 1;
    var pageSize = 1;
    Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
    };

    if(newId!=null){
        //文章内容
        $.ajax({
            type:"GET",
            url:httpUrl+"/news/cont/"+newId+"",
            dataType:"json",
            async:false,
            success:function (res) {
                    var time;
                    if(res.data.publishTime==null){time=""}else{var timestamp = new Date(res.data.publishTime.time);time=timestamp.toLocaleString();}
                    $articleHead.append(
                        "<h1>"+res.data.title+"</h1><div><span>"+time+"</span><span>作者: "+res.data.author+"</span></div>"
                    );
                    $articleContent.append(
                        res.data.content
                    );
            }
        })
    }
    //评论个数
     $.ajax({
            type:"GET",
            url:httpUrl+"/news/commentCount/"+newId+"",
            dataType:'json',
            async:false,
            success:function (res) {
                $("span[name='pinglun']").html(res.data);
                commentTotal=res.data;
            }
        })
    //获取评论
    queryComment(newId,currentPage,pageSize,"");
    function queryComment(newId,currentPage,pageSize,ismore) {
        if(ismore==""){
            var $comment = $('.user d');
            if($comment.length!=0){
                $comment.remove();
            }
        }
        $.ajax({
            type:"GET",
            url:httpUrl+"/news/comment/"+newId+"/"+currentPage+"/"+pageSize+"",
            dataType:"json",
            async:false,
            success:function (res) {
                if(res.success ==false){
                    return;
                }
                $.each(res.data,function (i,v) {
                        if (v.replay != null) {
                            $('.comment-list').append(
                                "<div class='user d'>" +
                                "<div class=\"userlogo\">" +
                                "<a href=\"#\">" +
                                "<img src=\"../images/userlogo2.jpg\"/>" +
                                "</a>" +
                                "</div>" +
                                "<div class=\"usercont\">" +
                                "<div class=\"user-header\">" +
                                "<a class=\"username\">" + v.userName + "</a>" +
                                "</div>" +
                                "<div class=\"user-footer\">" +
                                "<span>" + v.content + "</span>" +
                                "</div>" +
                                "</div>" +
                                "<div class=\"cont-reply\">" +
                                "<div class=\"reply-list\">" +
                                "<div class=\"reply-item\">" +
                                "<div class=\"content\">" +
                                "<div class=\"cont-footer clearfix\">管理员回复</div>" +
                                "<div class=\"cont-sub\">" + v.replay + "</div>" +
                                "<div class=\"comment-inputbox\"></div>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>"
                            )
                        }else{
                            $('.comment-list').append(
                                "<div class=\"user d\">" +
                                "<div class=\"userlogo\">\n" +
                                "<a href=\"#\">" +
                                "<img src=\"../images/userlogo.jpg\"/>" +
                                "</a>" +
                                "</div>" +
                                "<div class=\"usercont\">" +
                                "<div class=\"user-header\">" +
                                "<a class=\"username\">"+v.userName+"</a>" +
                                "</div>" +
                                "<div class=\"user-footer\">" +
                                "<span>"+v.content+"</span>" +
                                "</div>" +
                                "</div>" +
                                "</div>"
                            )
                        }
                })
            }
        })
    }
//点击加载更多
    var pageNum = Math.ceil(commentTotal/pageSize);
    $('#commentloadmore').click(function () {
        currentPage++;
        if(currentPage<=pageNum){
            queryComment(newId,currentPage,pageSize,null);
        }else{
            $('#commentloadmore input').val('已全部显示');
        }
    })

    //评论发布
    $('.pubCommonBtn').click(function () {
        if($('.common-input-area textarea').val()==""){
            alert("回复内容不为空");
            return;
        }
        var option={
            newsId:newId,
            userId:1,
            userName:"黄焖鸡米饭",
            newsTitle:$('.articleHead h1').html(),
            content:$('.common-input-area textarea').val()
        }
        $.ajax({
            type:"POST",
            dataType:"json",
            url:httpUrl+"/user/addComment/",
            data:option,
            success:function (res) {
                alert(res.mess);
               window.location.href="detail.html?"+newId+"";
            },
            error:function () {
                alert(res.mess);
               window.location.href="detail.html?"+newId+"";
            }
        })
    })
    //判断用户是否收藏该新闻
    $.ajax({
        type:"GET",
        dataType:"json",
        url:httpUrl+"/user/isCollect/"+newId+"",
        success:function(res){
            if(res.data==false){
                //没有收藏
                $('.article_action .articlesc img').attr('src','../images/icon_sc.png');
                $('.article_action .articlesc img').attr('issc','false');
            }else{
                $('.article_action .articlesc img').attr('src','../images/icon_scxz.png');
                $('.article_action .articlesc img').attr('issc','true');
            }
        }
    });
    //判断用户是否点赞该新闻
    $.ajax({
        type:"GET",
        dataType:"json",
        url:httpUrl+"/user/isAgree/"+newId+"",
        success:function(res){
            if(res.data==false){
                //没有点赞
                $('.article_action .articledz img').attr('src','../images/icon_dz.png');
                $('.article_action .articledz img').attr('isThumbe','false');
            }else{
                $('.article_action .articledz img').attr('src','../images/icon_dzxz.png');
                $('.article_action .articledz img').attr('isThumbe','true');
            }
        }
    });

    //用户收藏新闻
    $('.article_action .articlesc').click(function () {
        if($('.article_action .articlesc img').attr('issc') == "false"){
            $.ajax({
                type:"GET",
                dataType:"json",
                url:httpUrl+"/user/collect/"+newId+"",
                success:function (res) {
                    $('.article_action .articlesc img').attr('src','../images/icon_scxz.png');
                    $('.article_action .articlesc img').attr('issc','true');
                },
                error:function (res) {
                    if(res.success == false){
                        alert(res.mess);
                    }
                }
            })
        }else if($('.article_action .articlesc img').attr('issc') == "true"){
            $.ajax({
                type:"GET",
                dataType:"json",
                url:httpUrl+"/user/cancelCollect/"+newId+"",
                success:function (res) {
                    $('.article_action .articlesc img').attr('src','../images/icon_sc.png');
                    $('.article_action .articlesc img').attr('issc','false');
                },
                error:function (res) {
                    if(res.success == false){
                        alert(res.mess);
                    }
                }
            })
        }

    })

    //用户点赞新闻
    $('.article_action .articledz').click(function () {
        if($('.article_action .articledz img').attr('isThumbe') == "false"){
            $.ajax({
                type:"GET",
                dataType:"json",
                url:httpUrl+"/user/agree/"+newId+"",
                success:function (res) {
                    $('.article_action .articledz img').attr('src','../images/icon_dzxz.png');
                    $('.article_action .articledz img').attr('isThumbe','true');
                },
                error:function (res) {
                    if(res.success == false){
                        alert(res.mess);
                    }
                }
            })
        }
    })
    
});