$(function () {
    var httpUrl = "http://www.wxlovezy.top:8080/spring";
    var year;
    var firstDataid;
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
    var carid = GetRequest().carid;
    (function () {
        $.ajax({
            type:"GET",
            dataType:"json",
            async:false,
            url:httpUrl+"/carSeries/getYearList/"+carid,
            success:function (res) {
                $.each(res.data,function (i,v) {
                    $('.year-list').append(
                        "<li><a href=\"#\" year='"+v.yearType+"' name='yearLists'>"+v.yearType+"款</a></li>"
                    )
                })
            }
        })

    })();

    //导航栏固定
    $(function(){
        var nav=$(".middle_top div"); //得到导航对象
        var win=$(window); //得到窗口对象
        var sc=$(document);//得到document文档对象。
        win.scroll(function(){
            if(sc.scrollTop()>=100){
                nav.addClass("fixedTop");
                /*nav.attr('style','width:238px;top:10px')*/
                $(".navTmp").fadeIn();
            }else{
                nav.removeClass("fixedTop");
                /*nav.removeAttr('style');*/
                $(".navTmp").fadeOut();
            }
        })
    })
    year = $('.year-list').children("li:first-child").find('a').attr('year');
    queryCarSeries(carid,year);
    //查询
    function queryCarSeries(carid,year) {
        var $items = $('.carx-item');
        if($items.length!=0){
            $items.remove();
        }
        $.ajax({
            type:"GET",
            dataType:"json",
            async:false,
            url:httpUrl+"/carSeries/getList/"+carid+"/"+year,
            success:function (res) {
                if(res.data.length==0){
                    return;
                }
                $.each(res.data,function (i,v) {
                    $('#by-being-sale').append(
                        "<div class=\"carx-item\">"+
                        "<div class=\"carx-item-table\">" +
                        "<span>"+v.seriesName+"</span>" +
                        "<span style=\"color:#d61522;width:90px;text-align:center\">"+v.price+"</span>" +
                        "<span style=\"width:262px;text-align:right;\" data-id='"+v.id+"' name='optionspan'>" +
                        "<a href=\"javascript:\"  class=\"carx-operate-btn\" name='config'>配置</a>" +
                        "<a href=\"javascript:\"  class=\"carx-operate-btn\" name='photo'>图片</a>" +
                        "<a href=\"javascript:\" class=\"carx-operate-btn\" name='compare' isPK='false'>对比</a>" +
                        "</span>" +
                        "</div>" +
                        "</div>"
                    )
                })

            }
        })
        firstDataid = $('#by-being-sale').find($("span[name='optionspan']").eq(0)).attr('data-id');
        var $links = $('#by-being-sale').find('a');
        $.each($links,function (i,v) {
            var seriesid = $(this).parent().attr('data-id');
            $(this).click(function () {
                if($(this).attr('name') == "config"){
                    window.open("buycarsconfig.html?carid="+carid+"&seriesid="+seriesid);
                }else if($(this).attr('name') == "photo"){

                }else if($(this).attr('name') == "compare"){
                    if($(this).attr('isPK')=="false"){
                        compareCars(carid,seriesid);
                        $(this).attr('isPk','true');
                        $(this).html('已对比');
                    }else if($(this).attr('isPK')=="true"){
                        return;
                    }
                }
            })
        })

    }

    //点击对比(小按钮)
    function compareCars(carid,id) {
        $.ajax({
            type:"GET",
            dataType:"json",
            async:false,
            url:httpUrl+"/carSeries/getConfigList/"+carid+"/"+id,
            success:function (res) {
                if(res.data.length==0){
                    return;
                }
                $('.pk-cars-list').append(
                    "<li data-csid='"+res.data[0].carSeries.id+"'>" +
                    "<span>"+res.data[0].carSeries.seriesName+"</span>"+
                    "<a href='#' data-id='"+res.data[0].carSeries.id+"' class='remove'>×</a>"+
                    "</li>"
                )
            }
        })
        var $removes = $('.remove');
        $.each($removes,function (i,v) {
            $(this).click(function () {
                var removeid = $(this).attr('data-id');
                $.each($("span[name='optionspan']"),function (i,v) {
                    if(removeid == $(this).attr('data-id')){
                        $(this).find($("a[name='compare']")).html('对比');
                        $(this).find($("a[name='compare']")).attr('isPK','false');
                    }
                })
                $(this).parent('li').remove();
            })
        })
    }

    //点 开始对比
    $('.PK').click(function () {
        var idlist = "";
        var $pklist=$('.pk-cars-list').find('li');
        if($pklist.length==0){
            return;
        }

        $.each($pklist,function (i,v) {
            if(i==$pklist.length-1){
                idlist+=$(this).attr('data-csid');
            }else{
                idlist+=$(this).attr('data-csid')+",";
            }
        })
        window.open("buycarsconfig.html?idList="+idlist);
    })

    var yearlinks = $('.year-list').find('a');
    $.each(yearlinks,function (i,v) {
        $(this).click(function () {
            queryCarSeries(carid,$(this).attr('year'));
            $('.year-val').html($(this).attr('year')+'款');
        })
    })

    //年代
    $('.year-btn').mouseover(function () {
        $('.year-btn div').attr('style','display:block')
    })
    $('.year-btn').mouseout(function () {
        $('.year-btn div').attr('style','display:none')
    })

    //车系首页
    $("a[name='cxindex']").click(function () {
        window.location.href="buycarsindex.html?carid="+carid;
    })
    $("a[name='cspz']").click(function () {
        window.open("buycarsconfig.html?carid="+carid+"&seriesid="+firstDataid);
    })


})