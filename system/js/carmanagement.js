$(function () {
    var httpUrl = "http://www.wxlovezy.top:8080/spring"
    var currentPage = 1;
    var pageSize = 10;
    var $pagenums;
    var totalPage = 0;
    var queryStr="";
    var type=1;
    var $lis = $('#indexul li');
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
    $.each($lis,function (i,v) {
        if($(this).hasClass('cur')){
            type = $(this).children('a').attr('isSale');
            querycarsCount(queryStr,type)
            querycarsList(queryStr,type,currentPage,pageSize)
        }
    })

    if(GetRequest().isBack=="true"){
        querycarsCount(queryStr,type);
        $('.currentPage').html(GetRequest().currentPage);
        querycarsList(queryStr,type,GetRequest().currentPage,pageSize);

    }else{
        querycarsCount(queryStr,type);
        querycarsList(queryStr,type,currentPage,pageSize);
    }



    function querycarsList(queryStr,type,currentPage,pageSize) {
        var url;
        if(queryStr==""){
            url = httpUrl+"/adminCar/getList/"+type+"/"+currentPage+"/"+pageSize+"";
        }else{
            url = httpUrl+"/adminCar/queryList/"+queryStr+"/"+currentPage+"/"+pageSize+"";
        }
        var $carslist = $('#carsLists');
        if($carslist.children().length!=0){
            $carslist.children().remove();
        }
        $.ajax({
            type:"GET",
            url:url,
            dataType:"json",
            async:false,
            success:function (res) {
                listLength = res.data.length;
                $.each(res.data,function(i,v){
                    var country;
                    var struct;
                    var seat;
                    var gearBox = v.gearBox == 1?"手动":"自动";
                    var productor;
                    var driver;
                    if(v.country==1){country="中国"}else if(v.country==2){country="德国"}else if(v.country==3){country="日本"}else if(v.country==4){country="美国"}else if(v.country==5){country="韩国"}else if(v.country==6){country="法国"}else if(v.country==7){country="英国"}else if(v.country==8){country="其他"}
                    if(v.struct==1){struct="两厢"}else if(v.struct==2){struct="三厢"}else if(v.struct==3){struct="掀背"}else if(v.struct==4){struct="旅行车"}else if(v.struct==5){struct="硬顶敞篷"}else if(v.struct==6){struct="软顶敞篷"}else if(v.struct==7){struct="硬顶跑车"}
                    if(v.seatNum==1){seat="2座"}else if(v.seatNum==2){seat="4座"}else if(v.seatNum==3){seat="5座"}else if(v.seatNum==4){seat="6座"}else if(v.seatNum==5){seat="7座"}else if(v.seatNum==6){seat="7座以上"}
                    if(v.productor==1){productor="自主"}else if(v.productor==2){productor="合资"}else if(v.productor==3){productor="进口"}
                    if(v.driver==1){driver="前驱"}else if(v.driver==2){driver="后驱"}else if(v.driver==3){driver="四驱"}
                    $carslist.append(
                        "<tr data-id="+v.id+"><td class='car_1' title='"+v.carName+"'>"+v.carName+"</td>"+
                        "<td class='car_2'>"+v.minPrice+"-"+v.maxPrice+"</td>"+
                        "<td class='car_3'>"+getLevel(v.leval)+"</td>"+
                        "<td class='car_4'>"+struct+"</td>"+
                        "<td class='car_5'>"+country+"</td>"+
                        "<td class='car_6'>"+seat+"</td>"+
                        "<td class='car_7'>"+gearBox+"</td>"+
                        "<td class='car_8'>"+productor+"</td>"+
                        "<td class='car_9'>"+driver+"</td>"+
                        "<td class='car_10'><div class='btn'><a href='#' class='delete'>删除</a><a href='#' class='modify'>修改</a></div></td>"+
                        "</tr>"
                    );
                })
            }
        })
        var $trs = $carslist.children();
        if($trs.length!=0){
            $.each($trs,function(i,v){
                var dataid = $(this).attr('data-id');
                var $options = $(this).find('a');
                $.each($options,function(){
                    $(this).click(function(){
                        if($(this).attr('class')=="delete"){
                            if(confirm("确定删除？")){
                               deleteCar(dataid);
                            }
                        }else if($(this).attr('class')=="modify"){
                            var page= $('.currentPage').html();
                            window.location.href="carspublish.html?id="+dataid+"&currentPage="+page+"&isSale="+type;
                            //把当前页面带过去
                        }
                    })
                })
            })
        }
    }

    function querycarsCount(queryStr,type) {
        var url;
        if(queryStr==""){
            url = httpUrl+"/adminCar/getListNum/"+type;
        }else{
            url = httpUrl+"/adminCar/queryListNum/"+queryStr;
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
    if($pagenums!=null){
        $.each($pagenums,function(){
            $(this).click(function(){
                currentPage = $(this).html();
                querycarsList(queryStr,type,currentPage,pageSize);
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
            querycarsList(queryStr,type,page,pageSize);
            $('.currentPage').html(page);
        }
    })
    $next.click(function(){
        var page = $('.currentPage').html();
        if(page == totalPage){
        }else {
            page++;
            querycarsList(queryStr,type,page,pageSize);
            $('.currentPage').html(page);
        }
    })
    $('#searchBtn').click(function(){
        queryStr = $('#search').val();
        querycarsCount(queryStr,type);
        querycarsList(queryStr,type,1,pageSize);
        if($pagenums!=null){
            $.each($pagenums,function(){
                $(this).click(function(){
                    currentPage = $(this).html();
                    querycarsList(queryStr,type,currentPage,pageSize);
                    $('.currentPage').html(currentPage);
                })
            })
        }
    });

    $('#search').keydown(function () {
        if(event.keyCode== "13"){
            var queryStr = $('#search').val();
            querycarsCount(queryStr,type);
            querycarsList(queryStr,type,1,pageSize);
            if($pagenums!=null){
                $.each($pagenums,function(){
                    $(this).click(function(){
                        currentPage = $(this).html();
                        querycarsList(queryStr,type,currentPage,pageSize);
                        $('.currentPage').html(currentPage);
                    })
                })
            }
        }
    })

    function deleteCar(id) {
        var page = $('.currentPage').html();
        if(id=="" || id==null){
            return;
        }else{
            $.ajax({
                type:"GET",
                url:httpUrl+"/adminCar/delete/"+id+"",
                dataType:"json",
                success:function(data){
                    alert(data.mess);
                    //刷新页面
                    querycarsCount(queryStr,type);
                    if(listLength == 1){
                        querycarsList(queryStr,type,currentPage-1,pageSize);
                    }else{
                        querycarsList(queryStr,type,currentPage,pageSize);
                    }
                }
            });
        }
    }
    $('#publishNew').click(function () {
        var oldPage = $('.currentPage').text();
        window.location.href="carspublish.html?currentPage="+oldPage+"&isSale="+type;
    });

    function getLevel(level) {
        var le;
        if(level==11){
            le="微型车"
        }else if(level==12){
            le="小型车"
        }else if(level==13){
            le="紧凑型车"
        }else if(level==14){
            le="中型车"
        }else if(level==15){
            le="中大型车"
        }else if(level==16){
            le="大型车"
        }else if(level==21){
            le="小型SUV"
        }else if(level==22){
            le="紧凑型SUV"
        }else if(level==23){
            le="中型SUV"
        }else if(level==24){
            le="中大型SUV"
        }else if(level==25){
            le="大型SUV"
        }else if(level==71){
            le="微卡"
        }else if(level==72){
            le="皮卡"
        }else if(level==3){
            le="MPV"
        }else if(level==4){
            le="跑车"
        }else if(level==5){
            le="微面"
        }else if(level==6){
            le="轻客"
        }
        return le;
    }

});