$(function () {
    var httpUrl="http://www.wxlovezy.top:8080/spring"
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
    var brandId = GetRequest().brandId;
    var carId = GetRequest().carId;
    var currentPage = GetRequest().currentPage;
    var id = GetRequest().id;
    //单选框默认为否

    if(typeof (id)=="undefined") {
        $("input[type='radio'][value='0']").attr("checked", "checked");
        $("input[name='sale'][value='1']").attr("checked", "checked");
    }
    (function(){
        $.ajax({
            async:false,
            type:"GET",
            url:httpUrl+"/carBrand/getList/",
            success:function(data){
                $.each(data.data,function(i,v){
                    $('.brandSelect').append("<option value='"+v.id+"'>"+v.brandName+"</option>");
                });
                if(brandId!=0){
                    $(".brandSelect option[value='"+brandId+"']").attr('selected','selected');
                }
            }
        });
        /*queryCarNav($(".brandSelect").find("option:selected").val());
        $(".carSelect option[value='"+carId+"']").attr('selected','selected');*/
    })();
    function queryCarNav(brandId) {
        $('.carSelect').children().remove();
        $.ajax({
            type:"GET",
            dataType:"json",
            url:httpUrl+"/adminCar/getCarListByBrandId/"+brandId,
            success:function (res) {
                $.each(res.data,function(i,v){
                    $('.carSelect').append("<option value='"+v.id+"'>"+v.carName+"</option>");
                });
            }
        })
    }
    (function () {
        var dateTime = new Date();
        var date = dateTime.getFullYear();
        $('.yearType').append(
            "<option value='"+(date+1)+"'>"+(date+1)+"</option>"
        )
        for(var i =0;i<9;i++){
            $('.yearType').append(
                "<option value='"+(date-i)+"'>"+(date-i)+"</option>"
            )
        }

    })()

    $('.brandSelect').change(function(){
        brandId= $('.brandSelect').find('option:selected').val();
        queryCarNav(brandId);
    });

    if(id!=null && typeof (id)!="undefined"){
        $.ajax({
            type:'GET',
            dataType:"json",
            url:httpUrl+"/adminCarSeries/getDetail/"+id,
            success:function (res) {
                $(".brandSelect option[value='"+res.data.carSeries.brandId+"']").attr('selected','selected');
                queryCarNav(res.data.carSeries.brandId);
                $(".carSelect option[value='"+res.data.carSeries.carId+"']").attr('selected','selected');
                $("input[name='seriesName']").val(res.data.carSeries.seriesName);
                $("input[name='price']").val(res.data.carSeries.price);
                $(".saleornot[value='"+res.data.carSeries.isSale+"']").attr("checked","checked");
                $("input[name='idx']").val(res.data.carSeries.idx);
                $(".yearType option[value='"+res.data.carSeries.yearType+"']").attr('selected','selected');
                var jo = JSON.parse(res.data.carConfig.basisConfig);
                $.each($('.basicConf').find('input'),function () {
                    $(this).val(jo[$(this).attr('name')]);
                })

                var jo = JSON.parse(res.data.carConfig.carBodyConfig);
                $.each($('.carBodyConf').find('input'),function () {
                    $(this).val(jo[$(this).attr('name')]);
                })

                var jo = JSON.parse(res.data.carConfig.motorConfig);
                $.each($('.motorConf').find('input'),function () {
                    $(this).val(jo[$(this).attr('name')]);
                })

                var jo = JSON.parse(res.data.carConfig.gearBoxConfig);
                $.each($('.gearbox').find('input'),function () {
                    $(this).val(jo[$(this).attr('name')]);
                })

                var jo = JSON.parse(res.data.carConfig.chassisConfig);
                $.each($('.chassisConf').find('input'),function () {
                    $(this).val(jo[$(this).attr('name')]);
                })

                var jo = JSON.parse(res.data.carConfig.brakingConfig);
                $.each($('.brakingConf').find('input'),function () {
                    $(this).val(jo[$(this).attr('name')]);
                })

                var jo = JSON.parse(res.data.carConfig.safetyConfig);
                for(var i =1;i<=21;i++){
                    var name = "safetyConf"+i;
                    $("input[name='"+name+"'][value='"+jo[name]+"']").attr('checked','checked');
                }

                var jo = JSON.parse(res.data.carConfig.assistConfig);
                for(var i =1;i<=20;i++){
                    var name = "assistConf"+i;
                    $("input[name='"+name+"'][value='"+jo[name]+"']").attr('checked','checked');
                }

                var jo = JSON.parse(res.data.carConfig.antiTheftConfig);
                for(var i =1;i<=16;i++){
                    var name = "antiTheftConf"+i;
                    $("input[name='"+name+"'][value='"+jo[name]+"']").attr('checked','checked');
                }

                var jo = JSON.parse(res.data.carConfig.internalConfig);
                $("input[name='fxptj']").val(jo['fxptj']);
                for(var i =1;i<=12;i++){
                    var name = "internalConf"+i;
                    $("input[name='"+name+"'][value='"+jo[name]+"']").attr('checked','checked');
                }

                var jo = JSON.parse(res.data.carConfig.seatConfig);
                $("input[name='zycz']").val(jo['zycz']);
                for(var i =1;i<=23;i++){
                    var name = "seatConf"+i;
                    $("input[name='"+name+"'][value='"+jo[name]+"']").attr('checked','checked');
                }

                var jo = JSON.parse(res.data.carConfig.multimediaConfig);
                $("input[name='zkdp']").val(jo['zkdp']);
                $("input[name='CD']").val(jo['CD']);
                $("input[name='wjyjk']").val(jo['wjyjk']);
                $("input[name='ysqbrand']").val(jo['ysqbrand']);
                $("input[name='ysqnum']").val(jo['ysqnum']);
                for(var i =1;i<=10;i++){
                    var name = "multimediaConf"+i;
                    $("input[name='"+name+"'][value='"+jo[name]+"']").attr('checked','checked');
                }

                var jo = JSON.parse(res.data.carConfig.lightingConfig);
                $("input[name='jgd']").val(jo['jgd']);
                $("input[name='ygd']").val(jo['ygd']);
                for(var i =1;i<=9;i++){
                    var name = "lightingConf"+i;
                    $("input[name='"+name+"'][value='"+jo[name]+"']").attr('checked','checked');
                }

                var jo = JSON.parse(res.data.carConfig.glassConfig);
                $("input[name='glassUpOrDown']").val(jo['glassUpOrDown']);
                for(var i =1;i<=17;i++){
                    var name = "glassConf"+i;
                    $("input[name='"+name+"'][value='"+jo[name]+"']").attr('checked','checked');
                }

                var jo = JSON.parse(res.data.carConfig.airConditionerConfig);
                $("input[name='ktkzfs']").val(jo['ktkzfs']);
                for(var i =1;i<=6;i++){
                    var name = "AirConditionerConf"+i;
                    $("input[name='"+name+"'][value='"+jo[name]+"']").attr('checked','checked');
                }

            }
        })
    }else{
        queryCarNav($(".brandSelect").find("option:selected").val());
        $(".carSelect option[value='"+carId+"']").attr('selected','selected');
    }
    //添加或修改
    function addOrUpdate(id) {
        var url;
        var options={
            basisConfig:{},
            carBodyConfig:{},
            motorConfig:{},
            electromotorConfig:{},
            gearBoxConfig:{},
            chassisConfig:{},
            brakingConfig:{},
            safetyConfig:{},
            assistConfig:{},
            antiTheftConfig:{},
            internalConfig:{},
            seatConfig:{},
            multimediaConfig:{},
            lightingConfig:{},
            glassConfig:{},
            AirConditionerConfig:{}

        }
        options.brandId = $('.brandSelect').find('option:selected').val();
        options.carId = $('.carSelect').find('option:selected').val();
        options.seriesName = $("input[name='seriesName']").val();
        options.price = $("input[name='price']").val();
        options.yearType = $('.yearType').find('option:selected').val();
        options.isSale = $('.sale').find("input:checked").val();
        options.idx = $("input[name='idx']").val();

        $.each($('.basicConf').find('input'),function () {
            options.basisConfig[$(this).attr('name')] = $(this).val();
        })
        options.basisConfig = JSON.stringify(options.basisConfig);
        $.each($('.carBodyConf').find('input'),function () {
            options.carBodyConfig[$(this).attr('name')] = $(this).val();
        })
        options.carBodyConfig = JSON.stringify(options.carBodyConfig);
        $.each($('.motorConf').find('input'),function () {
            options.motorConfig[$(this).attr('name')] = $(this).val();
        })
        options.motorConfig = JSON.stringify(options.motorConfig);
        $.each($('.gearbox').find('input'),function () {
            options.gearBoxConfig[$(this).attr('name')] = $(this).val();
        })
        options.gearBoxConfig = JSON.stringify(options.gearBoxConfig);
        $.each($('.chassisConf').find('input'),function () {
            options.chassisConfig[$(this).attr('name')] = $(this).val();
        })
        options.chassisConfig = JSON.stringify(options.chassisConfig);
        $.each($('.brakingConf').find('input'),function () {
            options.brakingConfig[$(this).attr('name')] = $(this).val();
        })
        options.brakingConfig = JSON.stringify(options.brakingConfig);
        for(var i =1;i<=21;i++){
            var name = "safetyConf"+i;
            options.safetyConfig[name] = $("input:radio[name='"+name+"']:checked").val();
        }
        options.safetyConfig = JSON.stringify(options.safetyConfig);
        for(var i =1;i<=20;i++){
            var name = "assistConf"+i;
            options.assistConfig[name] = $("input:radio[name='"+name+"']:checked").val();
        }
        options.assistConfig = JSON.stringify(options.assistConfig);

        for(var i =1;i<=16;i++){
            var name = "antiTheftConf"+i;
            options.antiTheftConfig[name] = $("input:radio[name='"+name+"']:checked").val();
        }
        options.antiTheftConfig = JSON.stringify(options.antiTheftConfig);

        for(var i =1;i<=12;i++){
            var name = "internalConf"+i;
            options.internalConfig[name] = $("input:radio[name='"+name+"']:checked").val();
        }
        options.internalConfig['fxptj'] = $("input[name='fxptj']").val();
        options.internalConfig = JSON.stringify(options.internalConfig);

        for(var i =1;i<=23;i++){
            var name = "seatConf"+i;
            options.seatConfig[name] = $("input:radio[name='"+name+"']:checked").val();
        }
        options.seatConfig['zycz'] = $("input[name='zycz']").val();
        options.seatConfig['fdfs'] = $("input[name='fdfs']").val();
        options.seatConfig = JSON.stringify(options.seatConfig);

        for(var i =1;i<=10;i++){
            var name = "multimediaConf"+i;
            options.multimediaConfig[name] = $("input:radio[name='"+name+"']:checked").val();
        }
        options.multimediaConfig['zkdp'] = $("input[name='zkdp']").val();
        options.multimediaConfig['wjyjk'] = $("input[name='wjyjk']").val();
        options.multimediaConfig['CD'] = $("input[name='CD']").val();
        options.multimediaConfig['ysqbrand'] = $("input[name='ysqbrand']").val();
        options.multimediaConfig['ysqnum'] = $("input[name='ysqnum']").val();
        options.multimediaConfig = JSON.stringify(options.multimediaConfig);
        //
        for(var i =1;i<=9;i++){
            var name = "lightingConf"+i;
            options.lightingConfig[name] = $("input:radio[name='"+name+"']:checked").val();
        }
        options.lightingConfig['jgd'] = $("input[name='jgd']").val();
        options.lightingConfig['ygd'] = $("input[name='ygd']").val();
        options.lightingConfig = JSON.stringify(options.lightingConfig);
        //
        for(var i =1;i<=17;i++){
            var name = "glassConf"+i;
            options.glassConfig[name] = $("input:radio[name='"+name+"']:checked").val();
        }
        options.glassConfig['glassUpOrDown'] = $("input[name='glassUpOrDown']").val();
        options.glassConfig = JSON.stringify(options.glassConfig);
        //
        for(var i =1;i<=6;i++){
            var name = "AirConditionerConf"+i;
            options.AirConditionerConfig[name] = $("input:radio[name='"+name+"']:checked").val();
        }
        options.AirConditionerConfig['ktkzfs'] = $("input[name='ktkzfs']").val();
        options.AirConditionerConfig = JSON.stringify(options.AirConditionerConfig);
        //
        if(typeof (id)=="undefined"){
            url = httpUrl+"/adminCarSeries/add/"
            if(checkValue(options)){
                $.ajax({
                    type:"POST",
                    dataType:"json",
                    url:url,
                    data:options,
                    success:function (res) {
                        alert(res.mess)
                    },
                    error:function (res) {
                        alert(res.mess)
                    }
                })
            }
        }else{
            url = httpUrl+"/adminCarSeries/update/"
            options.id=id;
            if(checkValue(options)){
                $.ajax({
                    type:"POST",
                    dataType:"json",
                    url:url,
                    data:options,
                    success:function (res) {
                        alert(res.mess)
                    },
                    error:function (res) {
                        alert(res.mess)
                    }
                })
            }
        }

    }

    function checkValue(option) {
        var flag = true;
        var zreg = /^\d{1,9}$|^\d{1,9}[.]\d{1,9}$/;
        var idxreg = /^[+-]?\d+(\.\d+)?$/;
        if(zreg.test(option.price)==false){
            if($("input[name='price']").next().length!=0){
                $("input[name='price']").next().remove();
            }
            $("input[name='price']").after("<span style='color: red;margin-left: 30px'>建议售价只能是数字</span>");
            flag = false;
        }else{
            if($("input[name='price']").next().length!=0){
                $("input[name='price']").next().remove();
            }
            flag = true;
        }
        if(idxreg.test(option.idx)==false){
            if($("input[name='idx']").next().length!=0){
                $("input[name='idx']").next().remove();
            }
            $("input[name='idx']").after("<span style='color: red;margin-left: 30px'>显示顺序只能是数字</span>");
            flag = false;
        }else{
            if($("input[name='idx']").next().length!=0){
                $("input[name='idx']").next().remove();
            }
            flag = true;
        }
        if(option.seriesName==""){
            if($("input[name='seriesName']").next().length!=0){
                $("input[name='seriesName']").next().remove();
            }
            $("input[name='seriesName']").after("<span style='color: red;margin-left: 30px'>车辆名称不能为空</span>");
            flag = false;
        }else{
            if($("input[name='seriesName']").next().length!=0){
                $("input[name='seriesName']").next().remove();
            }
            flag = true;
        }
        return flag;

    }

    $('#add').click(function () {
       addOrUpdate(id);
    })
    $('.pub-btn a').click(function () {
        window.location.href="carserieslist.html?brandId="+brandId+"&carId="+carId+"&currentPage="+currentPage+"&isBack=true";
    })

})