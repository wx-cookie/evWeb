$(function () {
    var httpUrl = "http://www.wxlovezy.top:8080/spring"
    var currentPage = 1;
    var pageSize = 5;
    var $pagenums;
    var totalPage = 0;
    //var $commentlists;
    Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
    };
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

    if(GetRequest().isBack=="true"){
        queryQuestionCount();
        $('.currentPage').html(GetRequest().currentPage);
        queryQuestionsList(GetRequest().currentPage,pageSize);
    }else{
        queryQuestionCount();
        queryQuestionsList(currentPage,pageSize);
    }

    //获取资讯列表
    function queryQuestionsList(currentPage,pageSize) {
        var $commentlist = $('#commentLists');
        if($commentlist.children().length!=0){
            $commentlist.children().remove();
        }
        $.ajax({
            type:"GET",
            url:httpUrl+"/adminQuestion/getQuestionList/"+currentPage+"/"+pageSize+"",
            dataType:"json",
            async:false,
            success:function (res) {
                $.each(res.data,function(i,v){
                    var time;
                    if(v.addTime==null){time=""}else{var timestamp = new Date(v.addTime.time);time=timestamp.toLocaleString();}
                    var isShow = v.isShow==0?"否":"是";
                    var isshowtd = v.isShow == 0?"<td class='q_3' style='color: green'>"+isShow+"</td>":"<td class='q_3' style='color:red'>"+isShow+"</td>"
                    $commentlist.append(
                            "<tr data-id="+v.id+">"+
                            "<td class='q_2' title='"+v.userName+"'>"+v.userName+"</td>"+
                            "<td class='q_4' title='"+v.content+"' >"+v.content+"</td>"+
                            "<td class='q_5' title='"+v.replay+"'>"+v.replay+"</td>"+
                            "<td class='q_6'>"+time+"</td>"+isshowtd+
                            "<td class='q_8'><div class='btn'><a href='#' class='delete'>删除</a><a href='#' class='manage'>管理</a></div></td>"+
                            "</tr>"
                        );
                })
            }
        })
        var $trs = $commentlist.children();
        if($trs.length!=0){
            $.each($trs,function(i,v){
                var dataid = $(this).attr('data-id');
                var $options = $(this).find('a');
                $.each($options,function(){
                    $(this).click(function(){
                        if($(this).attr('class')=="delete"){
                            if(confirm("确定删除？")){
                                deleteQuestion(dataid);
                            }
                        }else if($(this).attr('class')=="manage"){
                                    var page= $('.currentPage').html();
                                    window.location.href="questionPublish.html?id="+dataid+"&currentPage="+page;
                            //把当前页面带过去
                        }
                    })
                })
            })
        }
    }
    //查询数量
    function queryQuestionCount() {
        //上一次的页码 如果存在就清除掉
        var $oldpagenum = $('.pagenumb');
        if($oldpagenum.length!=0){
            $oldpagenum.remove();
        }
        $.ajax({
            type:"GET",
            dataType:"json",
            timeout:10000,
            async:false,
            url:httpUrl+"/adminQuestion/getQuestionCount",
            success:function(res){
                //页码
                $('.totalNews').html(res.data);
            }
        });
        var totalNews = $('.totalNews').text();
        $('.pageSize').html(pageSize);
        totalPage = Math.ceil(totalNews/pageSize);
        $('.totalPages').text(totalPage);

        for(var i = 1;i<=totalPage;i++) {
            $('.pagenext').before("<a href='#' class='pagenumb'>" + i + "</a>");
        }
        $pagenums = $('.pagenumb');
    }
    //点击页码进行查询
    if($pagenums.length!=0){
        $.each($pagenums,function(){
            $(this).click(function(){
                currentPage = $(this).html();
                queryQuestionsList(currentPage,pageSize);
                $('.currentPage').html(currentPage);
            })
        })
    }
    //点击前后进行查询
    var $pre = $('.pagePre');
    var $next = $('.pagenext');

    $pre.click(function(){
        var page = $('.currentPage').html();
        if(page == 1){
        }else {
            page--;
            queryQuestionsList(page,pageSize);
            $('.currentPage').html(page);
        }
    })
    $next.click(function(){
        var page = $('.currentPage').html();
        if(page == totalPage){
        }else {
            page++;
            queryQuestionsList(page,pageSize);
            $('.currentPage').html(page);
        }
    })


    //删除资讯
    function deleteQuestion(id) {
        var page = $('.currentPage').html();
        if(id=="" || id==null){
            return;
        }else{
            $.ajax({
                type:"GET",
                url:httpUrl+"/adminQuestion/delete/"+id+"",
                dataType:"json",
                success:function(data){
                    alert(data.mess);
                    //刷新页面
                    queryQuestionCount();
                    queryQuestionsList(page,pageSize);
                }
            });
        }
    }

});