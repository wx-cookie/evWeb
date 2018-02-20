$(function () {
    var httpUrl="http://www.wxlovezy.top:8080/spring";
    var currentPage = 1;
    var queryStr="";
    var pageSize = 5;
    var brandId;
    var carId;
    var $pagenums;
    var totalPage = 0;
    (function(){
        $.ajax({
            async:false,
            type:"GET",
            url:httpUrl+"/carBrand/getList/",
            success:function(data){
                $('.carbrands select').append("<option value='0'>全部</option>");
                $.each(data.data,function(i,v){
                    $('.carbrands select').append("<option value='"+v.id+"'>"+v.brandName+"</option>");
                });
                /*$(".navOne option[value='"+navid+"']").attr('selected','selected');*/
            }
        });
    })();
    brandId= $('.carbrands select').find('option:selected').val();
    carId= $('.cars select').find('option:selected').val();
    queryBriefCount(queryStr,brandId,carId);
    getBriefList(queryStr,brandId,carId,currentPage,pageSize);
    function getBriefList(queryStr,brandId,carId,currentPage,pageSize) {
        var url;
        if(queryStr==""){
            url = httpUrl+"/adminCarSeries/getBriefList/"+brandId+"/"+carId+"/"+currentPage+"/"+pageSize;
        }else{
            url = httpUrl+"/adminCarSeries/queryBriefList/"+queryStr+"/"+currentPage+"/"+pageSize+"";
        }

        var $carsseries = $('#carsSerirsLists');
        if($carsseries.children().length!=0){
            $carsseries.children().remove();
        }
        $.ajax({
            type:"GET",
            url:url,
            dataType:"json",
            async:false,
            success:function (res) {
                $.each(res.data,function(i,v){
                    var issale = v.isSale==1?"在售":v.isSale==2?"未售":"停售"
                    $carsseries.append(
                        "<tr data-id="+v.id+">"+
                        "<td class='cs_1' title='"+v.seriesName+"'>"+v.seriesName+"</td>"+
                        "<td class='cs_2' title='"+v.price+"'>"+v.price+"</td>"+
                        "<td class='cs_3' title='"+issale+"'>"+issale+"</td>"+
                        "<td class='cs_4' title='"+v.yearType+"'>"+v.yearType+"</td>"+
                        "<td class='cs_5'><div class='btn'><a href='#' class='delete'>删除</a><a href='#' class='detail'>详情</a><a href='#' class='photo'>图片</a></div></td>"+
                        "</tr>"
                    );
                })
            }
        })
        var $trs = $carsseries.children();
        if($trs.length!=0){
            $.each($trs,function(i,v){
                var dataid = $(this).attr('data-id');
                var $options = $(this).find('a');
                $.each($options,function(){
                    $(this).click(function(){
                        if($(this).attr('class')=="delete"){
                            if(confirm("确定删除？")){
                                //deleteBrand(dataid);
                            }
                        }else if($(this).attr('class')=="detail"){
                            //var page= $('.currentPage').html();
                            //window.location.href="carbrandspublish.html?id="+dataid+"&currentPage="+page;
                            //把当前页面带过去
                        }
                    })
                })
            })
        }
    }
    function queryBriefCount(queryStr,brandId,carId) {
        var url;
        if(queryStr==""){
            url = httpUrl+"/adminCarSeries/getBriefNum/"+brandId+"/"+carId;
        }else{
            url = httpUrl+"/adminCarSeries/queryBriefNum/"+queryStr;
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

    $('#dosearch').click(function () {
        brandId= $('.carbrands select').find('option:selected').val();
        carId= $('.cars select').find('option:selected').val();
        queryBriefCount(queryStr,brandId,carId);
        getBriefList(queryStr,brandId,carId,currentPage,pageSize);
        $.each($pagenums,function(){
            $(this).click(function(){
                currentPage = $(this).html();
                getBriefList(queryStr,brandId,carId,currentPage,pageSize);
                $('.currentPage').html(currentPage);
            })
        })
    })

    //点击页码进行查询
        $.each($pagenums,function(){
            $(this).click(function(){
                currentPage = $(this).html();
                getBriefList(queryStr,brandId,carId,currentPage,pageSize);
                $('.currentPage').html(currentPage);
            })
        })
    //点击前后进行查询
    var $pre = $('.pagePre');
    var $next = $('.pagenext');

    $pre.click(function(){
        var page = $('.currentPage').html();
        if(page == 1){
        }else {
            page--;
            getBriefList(queryStr,brandId,carId,page,pageSize);
            $('.currentPage').html(page);
        }
    })
    $next.click(function(){
        var page = $('.currentPage').html();
        if(page == totalPage){
        }else {
            page++;
            getBriefList(queryStr,brandId,carId,page,pageSize);
            $('.currentPage').html(page);
        }
    })
    $('#searchBtn').click(function(){
        queryStr = $('#search').val();
        queryBriefCount(queryStr,brandId,carId);
        getBriefList(queryStr,brandId,carId,currentPage,pageSize);
        $.each($pagenums,function(){
            $(this).click(function(){
                currentPage = $(this).html();
                getBriefList(queryStr,brandId,carId,currentPage,pageSize);
                $('.currentPage').html(currentPage);
            })
        })
    });

    $('#search').keydown(function () {
        if(event.keyCode== "13"){
            var queryStr = $('#search').val();
            queryBriefCount(queryStr,brandId,carId);
            getBriefList(queryStr,brandId,carId,currentPage,pageSize);
            $.each($pagenums,function(){
                $(this).click(function(){
                    currentPage = $(this).html();
                    getBriefList(queryStr,brandId,carId,currentPage,pageSize);
                    $('.currentPage').html(currentPage);
                })
            })
        }
    })
    
    $('#publishNew').click(function () {
        window.location.href="carseriespublish.html"
    })
})