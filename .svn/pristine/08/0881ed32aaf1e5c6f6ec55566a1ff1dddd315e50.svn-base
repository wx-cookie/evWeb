$(function () {
    var httpUrl = "http://www.wxlovezy.top:8080/spring"
    var isSale=1;
    var currentPage = 1;
    var pageSize = 10;
    var $pagenums;
    var totalPage = 0;
    var queryStr="";
    var $lis= $('#indexul li');
    var listLength;
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
            queryBrandsCount("");
            $('.currentPage').html(GetRequest().currentPage);
            queryBrandsList("",GetRequest().currentPage,pageSize);

    }else{
            queryBrandsCount(queryStr);
            queryBrandsList(queryStr,currentPage,pageSize);
    }

    function queryBrandsList(queryStr,currentPage,pageSize) {
        var url;
        if(queryStr==""){
            url = httpUrl+"/adminSales/list/"+currentPage+"/"+pageSize+"";
        }else{
            url = httpUrl+"/adminSales/queryList/"+queryStr+"/"+currentPage+"/"+pageSize+"";
        }
        var $brandlist = $('#brandLists');
        if($brandlist.children().length!=0){
            $brandlist.children().remove();
        }
        $.ajax({
            type:"GET",
            url:url,
            dataType:"json",
            async:false,
            success:function (res) {
                listLength = res.data.length;
                $.each(res.data,function(i,v){
                    $brandlist.append(
                        "<tr data-id="+v.id+"><td class='cs_22'>"+v.location+"</td>"+
                        "<td class='cs_33' title='"+v.salesName+"'>"+v.salesName+"</td>"+
                        "<td class='cs_11' title='"+v.province+"'>"+v.province+"</td>"+
                        "<td class='cs_11' title='"+v.city+"'>"+v.city+"</td>"+
                        "<td class='cs_11'><div class='btn'><a href='#' class='delete'>删除</a><a href='#' class='modify'>修改</a></div></td>"+
                        "</tr>"
                    );
                })
            }
        })
        var $trs = $brandlist.children();
        if($trs.length!=0){
            $.each($trs,function(i,v){
                var dataid = $(this).attr('data-id');
                var $options = $(this).find('a');
                $.each($options,function(){
                    $(this).click(function(){
                        if($(this).attr('class')=="delete"){
                            if(confirm("确定删除？")){
                                deleteBrand(dataid);
                            }
                        }else if($(this).attr('class')=="modify"){
                            var page= $('.currentPage').html();
                            window.location.href="salescenter.html?id="+dataid+"&currentPage="+page;
                            //把当前页面带过去
                        }
                    })
                })
            })
        }
    }

    function queryBrandsCount(queryStr) {
        var url;
        if(queryStr==""){
            url = httpUrl+"/adminSales/getNum";
        }else{
            url = httpUrl+"/adminSales/queryListNum/"+queryStr;
        }
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
            url:url,
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
                queryBrandsList(queryStr,currentPage,pageSize);
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
            queryBrandsList(queryStr,page,pageSize);
            $('.currentPage').html(page);
        }
    })
    $next.click(function(){
        var page = $('.currentPage').html();
        if(page == totalPage){
        }else {
            page++;
            queryBrandsList(queryStr,page,pageSize);
            $('.currentPage').html(page);
        }
    })
    $('#searchBtn').click(function(){
        queryStr = $('#search').val();
        queryBrandsCount(queryStr);
        queryBrandsList(queryStr,1,pageSize);
        if($pagenums.length!=0){
            $.each($pagenums,function(){
                $(this).click(function(){
                    currentPage = $(this).html();
                    queryBrandsList(queryStr,currentPage,pageSize);
                    $('.currentPage').html(currentPage);
                })
            })
        }
    });

    $('#search').keydown(function () {
        if(event.keyCode== "13"){
           var queryStr = $('#search').val();
            queryBrandsCount(queryStr);
            queryBrandsList(queryStr,1,pageSize);
            if($pagenums.length!=0){
                $.each($pagenums,function(){
                    $(this).click(function(){
                        currentPage = $(this).html();
                        queryBrandsList(queryStr,currentPage,pageSize);
                        $('.currentPage').html(currentPage);
                    })
                })
            }
        }
    })

    function deleteBrand(id) {
        var page = $('.currentPage').html();
        if(id=="" || id==null){
            return;
        }else{
            $.ajax({
                type:"GET",
                url:httpUrl+"/adminSales/delete/"+id+"",
                dataType:"json",
                success:function(data){
                    alert(data.mess);
                    //刷新页面
                    queryBrandsCount(queryStr);
                    if(listLength == 1){
                        queryBrandsList(queryStr,page-1,pageSize);
                    }else{
                        queryBrandsList(queryStr,page,pageSize);
                    }
                }
            });
        }
    }

    $('#publishNew').click(function () {
        var oldPage = $('.currentPage').text();
        location.href="salescenter.html?currentPage="+oldPage;
    });

});