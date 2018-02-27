$(function () {
    var httpUrl="http://www.wxlovezy.top:8080/spring";
    var queryStr="";
    var type=1;
    var $ulbrandlist = $("ul[name='brandsName']");
    var $brandbyletter = $('.brand-list-by-letter');
    var queryOpt={
        issale:type,
        price:0,
        level:0,
        struct:0,
        country:0,
        gearBox:0,
        seatNum:0,
        productor:0,
        driver:0
    }
    queryCarsByStr(queryOpt);
    queryCarsCont(type);
//各种查询
    function queryCarsByStr(queryOpt) {
        if($brandbyletter.children().length!=0){
            $brandbyletter.children().remove();
        }
        if($ulbrandlist.children().length!=0){}
        $ulbrandlist.children().remove();
        $.ajax({
            type:"GET",
            dataType:"json",
            async:false,
            url:httpUrl+"/car/getListStr/"+queryOpt.issale+"-"+queryOpt.price+"-"+queryOpt.level+"-"+queryOpt.struct+"-"+queryOpt.country+"-"+queryOpt.gearBox+"-"+queryOpt.seatNum+"-"+queryOpt.productor+"-"+queryOpt.driver,
            success:function (res) {
                if(res.success==false){
                    return;
                }
                $.each(res.data,function (i,v) {
                    $ulbrandlist.append(
                        "<li class=\"brand-nav-item-li\">" +
                        "<h4 class=\"factory-title\">" +
                        "<a href=\"javascript:\" data-brandid='"+v.brand.id+"'>"+v.brand.brandName+"</a>\n" +
                        "</h4>" +
                        "</li>"
                    );
                    $brandbyletter.append(
                        "<div class=\"brand-list-by-brand\" id='"+v.brand.id+"'>" +
                        "<div class=\"brand-logo\">" +
                        "<div class=\"logo-box\">" +
                        "<div class=\"logo\"><img src='"+v.brand.iconSrc+"'/></div>" +
                        "</div>" +
                        "<h4 style='margin-top: 10px'>"+v.brand.brandName+"</h4>" +
                        "</div>" +
                        "<div class=\"brand-content\">"+
                        "<h4 class=\"factory-title\">"+v.brand.brandName+"</h4>"+
                        "<div class=\"factory-cars\">"+
                        "<div class=\"salesBox\" index='"+i+"'>"+
                        "</div>"+
                        "</div>"+
                        "</div>"+
                        "</div>"
                    )

                    var $saleboxes = $(".salesBox[index='"+i+"']");
                    for(var i =0;i<v.cars.length;i++){
                        $saleboxes.append(
                            "<div class=\"cars-box\">" +
                            "<div class=\"img\"><a href=\"javascript:\"  carId='"+v.cars[i].id+"'> <img src='"+v.cars[i].iconSrc+"'/></a></div>" +
                            "<h5 class=\"name\"><a href=\"javascript:\"  carId='"+v.cars[i].id+"'>"+v.cars[i].carName+"</a></h5>" +
                            "<h5 class=\"price\"><a href=\"javascript:\"  carId='"+v.cars[i].id+"'>指导价:<span>"+v.cars[i].minPrice+"万"+"-"+v.cars[i].maxPrice+"万"+"</span></a></h5>" +
                            "</div>"
                        )
                    }
                    $('.carsNum').html("共有"+res.data.length+"款车系");
                })
            },
            error:function (mess) {
                alert(mess.mess);
            }
        })
        var $carlinks = $('.cars-box').find('a');
        $.each($carlinks,function () {
            $(this).click(function () {
                var carid = $(this).attr('carid');
                window.open("buycarsindex.html?carid="+carid);
            })
        });
        //左右对应
        var $navlinks=$('.brand-nav-box').find('a');
        $.each($navlinks,function (i,v) {
            $(this).click(function () {
                var lid = $(this).attr('data-brandid');
                var $right = $("#"+lid);
                $('html, body').animate({scrollTop: $right.offset().top}, 500)
            })
        })
    }
    function queryCarsCont(type) {
        $.ajax({
            type:"GET",
            dataType:"json",
            url:httpUrl+"/adminCar/getListNum/"+type,
            success:function (res) {
                $('.carsNum').html("共有"+res.data+"款车系");
            }
        })
    }

    //取价格
    $.each($("dl[sort='price']").find('a').not($('#submitPriceBtn')),function (i,v) {
        $(this).click(function () {
            queryOpt.price = $(this).attr('data-code');
            creLable("price",$(this).attr('data-code'),$(this).find('span').html());
            queryCarsByStr(queryOpt)
            deleLableQuery()
        })
    })

    $('#submitPriceBtn').click(function () {
        var min = $('#minInput').val()==""?0:$('#minInput').val();
        var max = $('#maxInput').val()==""?0:$('#maxInput').val();
        if(min>max){
            alert('最低价不能大于最高价');
            return;
        }
        queryOpt.price = min+"_"+max;
        creLable("price",min+"_"+max,min+"-"+max);
        queryCarsByStr(queryOpt)
        deleLableQuery()
    })

    //取级别
    $.each($("dl[sort='level']").find('li'),function (i,v) {
        $(this).click(function () {
            event.stopPropagation();//阻止事件冒泡
            queryOpt.level = $(this).find('span').attr('data-code');
            creLable("level",$(this).find('span').attr('data-code'),$(this).find('span').html());
            queryCarsByStr(queryOpt)
            deleLableQuery()
        })
    })
    $.each($("dl[sort='level']").find('a'),function (i,v) {
        $(this).click(function () {
            queryOpt.level = $(this).attr('data-code');
            creLable("level",$(this).attr('data-code'),$(this).find('span').html());
            queryCarsByStr(queryOpt)
            deleLableQuery()
        })
    })
    //取车身结构
    $.each($("dl[sort='struct']").find('a'),function (i,v) {
        $(this).click(function () {
            queryOpt.struct = $(this).attr('data-code');
            creLable("struct",$(this).attr('data-code'),$(this).find('span').html());
            queryCarsByStr(queryOpt);
            deleLableQuery();
        })
    })
    //取国别
    $.each($("dl[sort='country']").find('a'),function (i,v) {
        $(this).click(function () {
            queryOpt.country = $(this).attr('data-code');
            creLable("country",$(this).attr('data-code'),$(this).find('span').html());
            queryCarsByStr(queryOpt)
            deleLableQuery()
        })
    })
    //取变速箱
    $.each($("dl[sort='gearBox']").find('a'),function (i,v) {
        $(this).click(function () {
            queryOpt.gearBox = $(this).attr('data-code');
            creLable("gearBox",$(this).attr('data-code'),$(this).find('span').html());
            queryCarsByStr(queryOpt)
            deleLableQuery();
        })
    })
    //取座位数
    $.each($("dl[sort='seatNum']").find('a'),function (i,v) {
        $(this).click(function () {
            queryOpt.seatNum = $(this).attr('data-code');
            creLable("seatNum",$(this).attr('data-code'),$(this).find('span').html());
            queryCarsByStr(queryOpt)
            deleLableQuery();
        })
    })
    //取生产厂商
    $.each($("dl[sort='productor']").find('a'),function (i,v) {
        $(this).click(function () {
            queryOpt.productor = $(this).attr('data-code');
            creLable("productor",$(this).attr('data-code'),$(this).find('span').html());
            queryCarsByStr(queryOpt)
            deleLableQuery();
        })
    })
    //取驱动方式
    $.each($("dl[sort='driver']").find('a'),function (i,v) {
        $(this).click(function () {
            queryOpt.driver = $(this).attr('data-code');
            creLable("driver",$(this).attr('data-code'),$(this).find('span').html());
            queryCarsByStr(queryOpt);
            deleLableQuery();
        })
    })

    $("a[name='removeAll']").click(function () {

        location.href="carBrands.html"
    });



    function creLable(str,id,value) {
        if($("a[lablesort='"+str+"']").length!=0){
            $("a[lablesort='"+str+"']").remove();

            $("div[name='lableDiv']").append(
                "<a href='#' class=\"conditionLabel\" lablesort='"+str+"' lableId="+id+">"+value+"<i>x</i></a>"
            )
        }else{
            $("div[name='lableDiv']").append(
                "<a href='#' class=\"conditionLabel\" lablesort='"+str+"' lableId="+id+">"+value+"<i>x</i></a>"
            )
        }
    }
    function deleLableQuery() {
        var $i = $('.conditionLabel');
        $.each($i,function (i,v) {
            $(this).click(function () {
                event.stopPropagation();
                var lable = $(this).attr('lablesort');
                queryOpt[lable]=0;
                queryCarsByStr(queryOpt);
                $(this).remove();
            })
        })
    }


    var $muls = $('.multi');
    $.each($muls,function () {
        $(this).mouseover(function () {
            $(this).find('div').attr('style','display:block;color:#666');
        })
        $(this).mouseout(function () {
            $(this).find('div').attr('style','display:none;color:#666');
        })
        $(this).click(function () {
          $(this).attr('class','btn multi active');
            $.each($muls.not($(this)),function () {
                $(this).attr('class','btn multi')
            })
        })
    })

    $('.sale').click(function () {
        type=$(this).attr('isSale');
        queryOpt.issale=$(this).attr('isSale');

        queryCarsByStr(queryOpt);
        queryCarsCont(type);
    })
    $('.stopsale').click(function () {
        type=$(this).attr('isSale');
        queryOpt.issale=$(this).attr('isSale');

        queryCarsByStr(queryOpt);
        queryCarsCont(type);
    })
    $('.notsale').click(function () {
       type=$(this).attr('isSale');
        queryOpt.issale=$(this).attr('isSale');
        queryCarsByStr(queryOpt);
        queryCarsCont(type);
    })


    $("a[name='folder']").click(function () {
        if($('.OdCarConditionContainer').attr('isfolde') == "false"){
            $('.OdCarConditionContainer').attr('style','display:none');
            $('.OdCarConditionContainer').attr('isfolde','true');
            $("a[name='folder']").find('em').html("展开筛选条件")
        }else if($('.OdCarConditionContainer').attr('isfolde')=="true"){
            $('.OdCarConditionContainer').attr('style','display: block');
            $('.OdCarConditionContainer').attr('isfolde','false');
            $("a[name='folder']").find('em').html("收起筛选条件")
        }
    });

    var $links = $('.OdCarCondition dd a').not($('.multi'));
    $.each($links,function (i,v) {
        $(this).click(function () {
            $(this).parent().parent().find('a').attr('class','btn');
            $(this).attr('class','btn active');
        })
    })
    //导航栏固定
    $(function(){
        var nav=$(".brand-nav-box"); //得到导航对象
        var win=$(window); //得到窗口对象
        var sc=$(document);//得到document文档对象。
        win.scroll(function(){
            if(sc.scrollTop()>=100){
                nav.addClass("fixednav");
                /*nav.attr('style','width:238px;top:10px')*/
                $(".navTmp").fadeIn();
            }else{
                nav.removeClass("fixednav");
                /*nav.removeAttr('style');*/
                $(".navTmp").fadeOut();
            }
        })
    })


})