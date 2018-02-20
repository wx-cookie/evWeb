
$(function(){
    var httpUrl="http://www.wxlovezy.top:8080/spring";
    var navId=1;
    var subNavId=0;
    var pageSize = 5;
    var currentPage = 1;
    var totalPage = 0;
    var $pagenums;
    var $table;
    var queryStr="";
    var oldPage;
    var $lis = $('#indexul li');

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
    /**/
    $.each($lis,function(i,v){
        if($(this).hasClass('cur')){
            navId = $(this).children('a').attr('idx');
            if(navId == 2 || navId == 4){
                querySubNav(navId);
            }
            if(GetRequest().isBack=="true"){
                var oldNav = GetRequest().navId;
                var oldSub = GetRequest().subNavId;
                var oldPage = GetRequest().currentPage;
                queryStr = $('#search').val();
                //新闻数量
                queryNews(queryStr,oldNav,oldSub);
                //显示列表(首页)
                queryNewsList(queryStr,oldNav,oldSub,oldPage,pageSize);
                currentPage = oldPage;
                $('.currentPage').html(currentPage);
            }else{
                //新闻数量
                queryNews(queryStr,navId,0);
                //显示列表(首页)
                queryNewsList(queryStr,navId,0,1,pageSize);

            }

        }
    });
    var $lable = $('#lablecontent').children('a');
    if($lable.length!=0){
        $.each($lable,function(i,v){
            $(this).click(function () {
                $lable.removeAttr('style');
                $(this).attr('style','background:#99FF33;')
                subNavId = $(this).attr('value');
                //新闻数量
                queryNews(queryStr,navId,subNavId);
                //显示列表(首页)
                queryNewsList(queryStr,navId,subNavId,1,pageSize);
                currentPage = 1;
                $('.currentPage').html(1);
            });
        })
    }
    //点其他页码进行查询
    if($pagenums!=null){
        $.each($pagenums,function(){
            $(this).click(function(){
                currentPage = $(this).html();
                queryNewsList(queryStr,navId,subNavId,currentPage,pageSize);
                $('.currentPage').html(currentPage);
            })
        })
    }
    //获取二级菜单
    function querySubNav(id) {

        if(id==null || id==""){
            return;
        }else{
            $.ajax({
                type:"GET",
                timeout:10000,
                url:httpUrl+"/nav/subNav/"+id+"",
                async:false,
                dataType:"json",
                success:function(res){
                    if(res.data.length!=0){
                        $.each(res.data,function(i,v){
                            $('#lablecontent').append("<a href='#' value='"+v.id+"'>"+v.name+"<em style=\"display: none;\"></em></a>");
                        })
                    }
                }
            });
        }
    }
    //console.log(navId+" "+subNavId);
    //获取文章条数
    function queryNews(queryStr,navId,subNavId) {

        //上一次的页码 如果存在就清除掉
        var $oldpagenum = $('.pagenumb');
        if($oldpagenum.length!=0){
            $oldpagenum.remove();
        }
        var url;
        if(queryStr == ""){
            url = httpUrl+"/admin/count/"+navId+"/"+subNavId+"";
        }else{
            url = httpUrl+"/admin/count/"+queryStr+"/"+navId+"/"+subNavId+"";
        }
        $.ajax({
            type:"GET",
            dataType:"json",
            timeout:10000,
            async:false,
            url:url,
            success:function(res){
                //页码
                $('.totalNews').html(res.data);
            }
        });
        var totalNews = $('.totalNews').text();
        totalPage = Math.ceil(totalNews/pageSize);
        $('.totalPages').text(totalPage);

        for(var i = 1;i<=totalPage;i++) {
            $('.pagenext').before("<a href='#' class='pagenumb'>" + i + "</a>");
        }
        $pagenums = $('.pagenumb');
    }


    $('.pageSize').html(pageSize);

    function queryNewsList(queryStr,navId,subNavId,currentPage,pageSize) {
        var url;
        if(queryStr == ""){
            url = httpUrl+"/admin/list/"+navId+"/"+subNavId+"/"+currentPage+"/"+pageSize+"";
        }else{
            url = httpUrl+"/admin/list/"+queryStr+"/"+navId+"/"+subNavId+"/"+currentPage+"/"+pageSize+"";
        }
        var $oldtable = $('#newsLists');
        //每次清除上一次的 记录
        if($oldtable.children().length!=0){
            $oldtable.children().remove();
        }
        $.ajax({
            type:"GET",
            timeout:10000,
            dataType:"json",
            async:false,
            url:url,
            success:function(res){
                $.each(res.data,function(i,v){
                    var time;
                    if(v.publishTime==null){time=""}else{var timestamp = new Date(v.publishTime.time);time=timestamp.toLocaleString();}
                    var isIndex = v.isIndex==0?"否":"是";
                    var indextd = v.isIndex == 0?"<td class='t_3' style='color: green'>"+isIndex+"</td>":"<td class='t_3' style='color:red'>"+isIndex+"</td>"
                    var image = v.isShowImage == 0?"否":"是";
                    var imagetd = v.isShowImage == 0?"<td class='t_4' style='color: green'>"+image+"</td>":"<td class='t_4' style='color:red'>"+image+"</td>"
                    var publish = v.isPublish == 0 ? "未发布" : "已发布";
                    var publishtd = v.isPublish == 0?"<td class='t_5' style='color: green'>"+publish+"</td>":"<td class='t_5' style='color:red'>"+publish+"</td>"
                    if(v.isPublish === 0){
                        $oldtable.append(
                            "<tr data-id="+v.id+"><td class='t_1'>"+v.id+"</td>"+
                            "<td class='t_2'>"+v.title+"</td>"+
                             indextd+
                             imagetd+
                             publishtd+
                            "<td class='t_6'>"+time+"</td>"+
                            "<td class='t_7'><div class='btn'><a href='#' class='modify'>修改</a><a href='#' class='delete'>删除</a><a href='#' class='published'>发布</a></div></td>"+
                            "</tr>"
                        );
                    }else{
                        $oldtable.append(
                            "<tr data-id="+v.id+"><td class='t_1'>"+v.id+"</td>"+
                            "<td class='t_2'>"+v.title+"</td>"+
                            indextd+
                            imagetd+
                            publishtd+
                            "<td class='t_6'>"+time+"</td>"+
                            "<td class='t_7'><div class='btn'><a href='#' class='modify'>修改</a><a href='#' class='delete'>删除</a><a href='#' class='published isPublished'>暂停</a></div></td>"+
                            "</tr>"
                        );
                    }

                })
                $table = $('#newsLists');
            }
        })
        //操作部分
        options();
    }


function options() {
    var $trs = $('#newsLists').children();
    if($trs.length!=0){
        $.each($trs,function(i,v){
            var dataid = $(this).attr('data-id');
            var $options = $(this).find('a');
            $.each($options,function(){
                $(this).click(function(){
                    if($(this).attr('class')=="modify"){
                        oldPage = $('.currentPage').text();
                        location.href="http://www.wxlovezy.top:8080/spring/admin/addNew?id="+dataid+"&navId="+navId+"&subNavId="+subNavId+"&currentPage="+oldPage;
                    }else if($(this).attr('class')=="delete"){
                        if(confirm("确定删除？")){
                            deleteNew(dataid);
                        }
                    }else if($(this).attr('class')=="published"){
                        publishAStop(dataid,$(this).attr('class'));
                        //更新页面
                        $(this).addClass('isPublish');
                    }else if($(this).attr('class')=="published isPublished"){
                        publishAStop(dataid,$(this).attr('class'));
                        $(this).removeClass('isPublish');
                    }

                })
            })
        })
    }
}

    //前后页
        var $pre = $('.pagePre');
        var $next = $('.pagenext');

        $pre.click(function(){
            var page = $('.currentPage').html();
            if(page == 1){
            }else {
                page--;
                queryNewsList(queryStr,navId,subNavId,page,pageSize);
                $('.currentPage').html(page);
            }
        })
        $next.click(function(){
            var page = $('.currentPage').html();
            if(page == totalPage){
            }else {
                page++;
                queryNewsList(queryStr,navId,subNavId,page,pageSize);
                $('.currentPage').html(page);
            }
        })

    //搜索获取新闻列表

    $('#searchBtn').click(function(){
        queryStr = $('#search').val();
        queryNews(queryStr,navId,navId);
        queryNewsList(queryStr,navId,subNavId,currentPage,pageSize);
        if($pagenums!=null){
            $.each($pagenums,function(){
                $(this).click(function(){
                    currentPage = $(this).html();
                    queryNewsList(queryStr,navId,subNavId,currentPage,pageSize);
                    $('.currentPage').html(currentPage);
                })
            })
        }
    });

    $('#search').keydown(function () {
        if(event.keyCode== "13"){
            queryStr = $('#search').val();
            queryNews(queryStr,navId,subNavId);
            queryNewsList(queryStr,navId,subNavId,currentPage,pageSize);
            if($pagenums!=null){
                $.each($pagenums,function(){
                    $(this).click(function(){
                        currentPage = $(this).html();
                        queryNewsList(queryStr,navId,subNavId,currentPage,pageSize);
                        $('.currentPage').html(currentPage);
                    })
                })
            }
        }
    })

    function deleteNew(id){
        var page = $('.currentPage').html();
        if(id=="" || id==null){
            return;
        }else{
            $.ajax({
                type:"GET",
                url:httpUrl+"/admin/delete/"+id+"",
                dataType:"json",
                success:function(data){
                    alert(data.mess);
                    //刷新页面
                    queryNews(queryStr,navId,subNavId);
                    queryNewsList(queryStr,navId,subNavId,page,pageSize);
                }
            });
        }
    }

    function publishAStop(id,className){

        if(id=="" || id==null){
            return;
        }else if(className=="published"){
            $.ajax({
                type:"GET",
                url:httpUrl+"/admin/publish/"+id+"",
                dataType:"json",
                success:function(data){
                    alert(data.mess);
                    //刷新页面
                    queryNewsList(queryStr,navId,subNavId,currentPage,pageSize);
                }
            });
        }else if(className=="published isPublished"){
            $.ajax({
                type:"GET",
                url:httpUrl+"/admin/stop/"+id+"",
                dataType:"json",
                success:function(data){
                    alert(data.mess);
                    //刷新页面
                    queryNewsList(queryStr,navId,subNavId,currentPage,pageSize);
                }
            });
        }
    }

    $('#publishNew').click(function () {
        oldPage = $('.currentPage').text();
        location.href="http://www.wxlovezy.top:8080/spring/admin/addNew?navId="+navId+"&subNavId="+subNavId+"&currentPage="+oldPage;
    });


});