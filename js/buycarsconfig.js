$(function () {
    var httpUrl = "http://www.wxlovezy.top:8080/spring"
    var $selectitem = $('.navLi a');
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
    var seriesid = GetRequest().seriesid;
    var idlist = GetRequest().idList;
    var length;
    //表格头
    function configHead(carid,seriesid,idlist) {
        var url;
        if(typeof (idlist)!="undefined"){
            url=httpUrl+"/carSeries/getConfigList/"+idlist;
        }else{
            url=httpUrl+"/carSeries/getConfigList/"+carid+"/"+seriesid;
        }
        $.ajax({
            type:"GET",
            dataType:"json",
            async:false,
            url:url,
            success:function (res) {
                if(res.success == false){
                    return;
                }else{
                    length=res.data.length;
                    $('.OdCarConfigTableHeader').attr('style',"width:"+(res.data.length+1)*200+"px;left: 180px;");
                    $('.OdCarConfigTable').attr('style',"width:"+(res.data.length+1)*200+"px;")
                    $.each(res.data,function (i,v) {
                        $('.OdCarConfigTableHeader tr').append(
                            "<th class=\"carxNameBox\">" +
                            "<span class=\"carxNameText\" data-id='"+v.carSeries.id+"' style=\"overflow: hidden\">"+v.carSeries.seriesName+"</span>" +
                            "<a href=\"javascript:\" data-id='"+v.carSeries.id+"' class=\"closeBtn\">×</a>" +
                            "<div class=\"operateBox\">" +
                            "<a href='javascript:' class=\"OdCarConfigAddCompareBtn add-pk-btn\">加入对比</a>" +
                            "</div>" +
                            "</th>"
                        )
                    })
                    $.each($('.itemsTitle'),function (i,v) {
                        $(this).attr('colspan',res.data.length+1);
                    })
                }
            }
        })
    }

    function configBody(carid,seriesid,idlist) {
        var url;
        if(typeof (idlist)!="undefined"){
            url=httpUrl+"/carSeries/getConfigList/"+idlist;
        }else{
            url=httpUrl+"/carSeries/getConfigList/"+carid+"/"+seriesid;
        }
        $.ajax({
            type:"GET",
            dataType:"json",
            async:false,
            url:url,
            success:function (res) {
                if(res.success == false){
                    return;
                }else{
                    for(var i =0;i<res.data.length;i++){
                        var id = res.data[i].carSeries.id;
                        var jo = JSON.parse(res.data[i].carConfig.basisConfig);
                        var length = 15;
                        for(var a = 1;a<=length;a++){
                            var name = "basicConf"+a;
                            if(jo[name]!=""){
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>"+jo[name]+"</td>"
                                )
                            }else{
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>无</td>"
                                )
                            }

                        }

                        var jo = JSON.parse(res.data[i].carConfig.carBodyConfig);
                        var length = 13;
                        for(var a = 1;a<=length;a++){
                            var name = "carBodyConf"+a;
                            if(jo[name]!=""){
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>"+jo[name]+"</td>"
                                )
                            }else{
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>无</td>"
                                )
                            }

                        }

                        var jo = JSON.parse(res.data[i].carConfig.motorConfig);
                        var length = 22;
                        for(var a = 1;a<=length;a++){
                            var name = "motorConf"+a;
                            if(jo[name]!=""){
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>"+jo[name]+"</td>"
                                )
                            }else{
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>无</td>"
                                )
                            }

                        }
                        var jo = JSON.parse(res.data[i].carConfig.gearBoxConfig);
                        var length = 3;
                        for(var a = 1;a<=length;a++){
                            var name = "gearbox"+a;
                            if(jo[name]!=""){
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>"+jo[name]+"</td>"
                                )
                            }else{
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>无</td>"
                                )
                            }

                        }

                        var jo = JSON.parse(res.data[i].carConfig.chassisConfig);
                        var length = 7;
                        for(var a = 1;a<=length;a++){
                            var name = "chassisConf"+a;
                            if(jo[name]!=""){
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>"+jo[name]+"</td>"
                                )
                            }else{
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>无</td>"
                                )
                            }

                        }
                        var jo = JSON.parse(res.data[i].carConfig.brakingConfig);
                        var length = 6;
                        for(var a = 1;a<=length;a++){
                            var name = "brakingConf"+a;
                            if(jo[name]!=""){
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>"+jo[name]+"</td>"
                                )
                            }else{
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>无</td>"
                                )
                            }
                        }

                        var jo = JSON.parse(res.data[i].carConfig.safetyConfig);
                        var length = 21;
                        for(var a = 1;a<=length;a++){
                            var name = "safetyConf"+a;
                            var value = jo[name] == 1?"有":"无";
                            if(name=="safetyConf2" || name=="safetyConf4" || name=="safetyConf6"){
                                var lsn = "safetyConf"+(a-1);
                                var $sn = $("td[item='"+lsn+"'][sign='"+i+"']");
                                $sn.append("<span>后:"+value+"</span>")
                            }else if(name=="safetyConf1" || name=="safetyConf3" || name=="safetyConf5"){
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"' item='"+name+"' sign='"+i+"'><span>前:"+value+"/</span></td>"
                                )
                            }else{
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>"+value+"</td>"
                                )
                            }
                        }

                        var jo = JSON.parse(res.data[i].carConfig.assistConfig);
                        var length = 20;
                        for(var a = 1;a<=length;a++){
                            var name = "assistConf"+a;
                            var value = jo[name] == 1?"有":"无";
                            if(name=="assistConf2"){
                                var lsn = "assistConf"+(a-1);
                                var $sn = $("td[item='"+lsn+"'][sign='"+i+"']");
                                $sn.append("<span>后:"+value+"</span>")
                            }else if(name=="assistConf1"){
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"' item='"+name+"' sign='"+i+"'><span>前:"+value+"/</span></td>"
                                )
                            }else{
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>"+value+"</td>"
                                )
                            }
                        }

                        var jo = JSON.parse(res.data[i].carConfig.antiTheftConfig);
                        var length = 16;
                        for(var a = 1;a<=length;a++){
                            var name = "antiTheftConf"+a;
                            var value = jo[name] == 1?"有":"无";
                            $("td[name='"+name+"']").parent().append(
                                "<td class='confs' data-id='"+id+"'>"+value+"</td>"
                            )
                        }

                        var jo = JSON.parse(res.data[i].carConfig.internalConfig);
                        var length = 12;
                        for(var a = 1;a<=length;a++){
                            var name = "internalConf"+a;
                            var value = jo[name] == 1?"有":"无";
                            $("td[name='"+name+"']").parent().append(
                                "<td class='confs' data-id='"+id+"'>"+value+"</td>"
                            )
                        }
                        var fxptjValue = jo['fxptj']==""?'无':jo['fxptj'];
                            $("td[name='fxptj']").parent().append(
                                "<td class='confs' data-id='"+id+"'>"+fxptjValue+"</td>"
                            )
//座椅配置
                        var jo = JSON.parse(res.data[i].carConfig.seatConfig);
                        var length = 23;
                        for(var a = 1;a<=length;a++){
                            var name = "seatConf"+a;
                            var value = jo[name] == 1?"有":"无";
                            if(name=="seatConf6" || name=="seatConf13" || name=="seatConf15" || name=="seatConf17" || name=="seatConf21"){
                                var lsn = "seatConf"+(a-1);
                                var $sn = $("td[item='"+lsn+"'][sign='"+i+"']");
                                $sn.append("<span>前:"+value+"</span>")
                            }else if(name=="seatConf5" || name=="seatConf12" || name=="seatConf14" || name=="seatConf16" || name=="seatConf20"){
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"' item='"+name+"' sign='"+i+"'><span>后:"+value+"/</span></td>"
                                )
                            }else{
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>"+value+"</td>"
                                )
                            }
                        }
                        var zyczValue = jo['zycz']==""?'无':jo['zycz'];
                        var fdfsValue = jo['fdfs']==""?'无':jo['fdfs'];
                        $("td[name='zycz']").parent().append(
                            "<td class='confs' data-id='"+id+"'>"+zyczValue+"</td>"
                        )
                        $("td[name='fdfs']").parent().append(
                            "<td class='confs' data-id='"+id+"'>"+fdfsValue+"</td>"
                        )

                        //多媒体配置
                        var jo = JSON.parse(res.data[i].carConfig.multimediaConfig);
                        var length = 10;
                        for(var a = 1;a<=length;a++){
                            var name = "multimediaConf"+a;
                            var value = jo[name] == 1?"有":"无";
                            $("td[name='"+name+"']").parent().append(
                                "<td class='confs' data-id='"+id+"'>"+value+"</td>"
                            )
                        }
                        var zkdpValue = jo['zkdp']==""?'无':jo['zkdp'];
                        var wjyjkValue = jo['wjyjk']==""?'无':jo['wjyjk'];
                        var CDValue = jo['CD']==""?'无':jo['CD'];
                        var ysqbrandValue = jo['ysqbrand']==""?'无':jo['ysqbrand'];
                        var ysqnumValue = jo['ysqnum']==""?'无':jo['ysqnum'];
                        $("td[name='zkdp']").parent().append(
                            "<td class='confs' data-id='"+id+"'>"+zkdpValue+"</td>"
                        )
                        $("td[name='wjyjk']").parent().append(
                            "<td class='confs' data-id='"+id+"'>"+wjyjkValue+"</td>"
                        )
                        $("td[name='CD']").parent().append(
                            "<td class='confs' data-id='"+id+"'>"+CDValue+"</td>"
                        )
                        $("td[name='ysqbrand']").parent().append(
                            "<td class='confs' data-id='"+id+"'>"+ysqbrandValue+"</td>"
                        )
                        $("td[name='ysqnum']").parent().append(
                            "<td class='confs' data-id='"+id+"'>"+ysqnumValue+"</td>"
                        )
                        //灯光配置
                        var jo = JSON.parse(res.data[i].carConfig.lightingConfig);
                        var length =9;
                        for(var a = 1;a<=length;a++){
                            var name = "lightingConf"+a;
                            var value = jo[name] == 1?"有":"无";
                            $("td[name='"+name+"']").parent().append(
                                "<td class='confs' data-id='"+id+"'>"+value+"</td>"
                            )
                        }
                        var jgdValue = jo['jgd']==""?'无':jo['jgd'];
                        var ygdValue = jo['ygd']==""?'无':jo['ygd'];
                        $("td[name='jgd']").parent().append(
                            "<td class='confs' data-id='"+id+"'>"+jgdValue+"</td>"
                        )
                        $("td[name='ygd']").parent().append(
                            "<td class='confs' data-id='"+id+"'>"+ygdValue+"</td>"
                        )
                        //玻璃/后视镜
                        var jo = JSON.parse(res.data[i].carConfig.glassConfig);
                        var length = 17;
                        for(var a = 1;a<=length;a++){
                            var name = "glassConf"+a;
                            var value = jo[name] == 1?"有":"无";
                            if(name=="glassConf2"){
                                var lsn = "glassConf"+(a-1);
                                var $sn = $("td[item='"+lsn+"'][sign='"+i+"']");
                                $sn.append("<span>后:"+value+"</span>")
                            }else if(name=="glassConf1"){
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"' item='"+name+"' sign='"+i+"'><span>前:"+value+"/</span></td>"
                                )
                            }else if(name=="glassConf7"){
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"' item='"+name+"' sign='"+i+"'><span>内:"+value+"/</span></td>"
                                )
                            }else if(name=="glassConf8"){
                                var lsn = "glassConf"+(a-1);
                                var $sn = $("td[item='"+lsn+"'][sign='"+i+"']");
                                $sn.append("<span>外:"+value+"</span>")
                            }else{
                                $("td[name='"+name+"']").parent().append(
                                    "<td class='confs' data-id='"+id+"'>"+value+"</td>"
                                )
                            }
                        }
                        var sjValue = jo['glassUpOrDown']==""?'无':jo['glassUpOrDown'];
                        $("td[name='glassUpOrDown']").parent().append(
                            "<td class='confs' data-id='"+id+"'>"+sjValue+"</td>"
                        )
                        //空调 电冰箱
                        var jo = JSON.parse(res.data[i].carConfig.airConditionerConfig);
                        var length =6;
                        for(var a = 1;a<=length;a++){
                            var name = "AirConditionerConf"+a;
                            var value = jo[name] == 1?"有":"无";
                            $("td[name='"+name+"']").parent().append(
                                "<td class='confs' data-id='"+id+"'>"+value+"</td>"
                            )
                        }
                        var ktkzfsValue = jo['ktkzfs']==""?'无':jo['ktkzfs'];
                        $("td[name='ktkzfs']").parent().append(
                            "<td class='confs' data-id='"+id+"'>"+ktkzfsValue+"</td>"
                        )
                    }
                }
            }
        })
    }

    configHead(carid,seriesid,idlist);
    configBody(carid,seriesid,idlist);

    //导航栏固定
    $(function(){
        var tophead=$(".OdCarConfigTableHeader"); //得到导航对象
        var win=$(window); //得到窗口对象
        var sc=$(document);//得到document文档对象。
        var sty = tophead.attr('style');
        win.scroll(function(){
            if(sc.scrollTop()>=100){
                tophead.attr('style',sty+"position:fixed;z-index:1;");
                $(".navTmp").fadeIn();
            }else{
                tophead.attr('style',sty)
                $(".navTmp").fadeOut();
            }
        })
    })
    var $removeBtn = $('.closeBtn');
    $.each($removeBtn,function (i,v) {
        $(this).click(function () {
            var id  = $(this).attr('data-id');
            $("td[data-id='"+id+"']").remove();
            $(this).parent('th').remove();
            $('.OdCarConfigTableHeader').attr('style',"width:"+length*200+"px;left: 180px;");
        })
    })
    //左右对应
    var $navlinks=$('.OdCarConfigNav').find('a');
    $.each($navlinks,function (i,v) {
        $(this).click(function () {
            var lid = $(this).parent().attr('data-itemid');
            var $a = $(".OdCarConfigNav li a[style]").attr('style','');
            $(this).attr('style','background: #e9e9e9;')
            var $right = $("#"+lid);
            $('html, body').animate({scrollTop: $right.offset().top-200}, 500)
        })
    })
    //左侧导航栏固定
    $(function(){
        var sidenav=$(".OdCarConfigNav"); //得到导航对象
        var win=$(window); //得到窗口对象
        var sc=$(document);//得到document文档对象。
        win.scroll(function(){
            if(sc.scrollTop()>=100){
                sidenav.attr('style','top: 102px; left: 10px; position: fixed;')
                $(".navTmp").fadeIn();
            }else{
                sidenav.attr('style','top: 102px; left: -170px; position: absolute;')
                $(".navTmp").fadeOut();
            }
        })
    })
    $("a[name='cxindex']").click(function () {
        window.open("buycarsindex.html?carid="+carid);
    })
    $("a[name='cspz']").click(function () {
        window.location.href="buycarsconfig.html?carid="+carid+"&seriesid="+seriesid;
    })
})