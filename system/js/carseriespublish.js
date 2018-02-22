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
    var id = GetRequest().id;
    //单选框默认为否
    if(typeof (id)=="undefined"){
        $("input[type='radio'][value='0']").attr("checked","checked");
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
        queryCarNav($(".brandSelect").find("option:selected").val());
        $(".carSelect option[value='"+carId+"']").attr('selected','selected');
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
            "<option value='"+(date-1)+"'>"+(date-1)+"</option>"
        )
        for(var i =0;i<9;i++){
            $('.yearType').append(
                "<option value='"+(date+i)+"'>"+(date+i)+"</option>"
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
            }
        })
    }
    //添加或修改
    function addOrUpdate(id) {
        var url;
        var options={
            carSeries:{},
            carConfig:{
                basisConfig:{},
                carBodyConfig:{},
                motorConfig:{},
                /*electromotorConfig:{},*/
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
            },
        }
        if(typeof (id)=="undefined"){
            url = httpUrl+"/adminCarSeries/add/"
            options.carSeries.brandId = $('.brandSelect').find('option:selected').val();
            options.carSeries.carId = $('.carSelect').find('option:selected').val();
            options.carSeries.seriesName = $("input[name='seriesName']").val();
            options.carSeries.price = $("input[name='price']").val();
            options.carSeries.yearType = $('.yearType').find('option:selected').val();
            options.carSeries.isSale = $('.sale').find("input:checked").val();
            options.carSeries.idx = $("input[name='idx']").val();
            /*options.carConfig.carSeriesId = id;*/
            options.carConfig.price = $("input[name='price']").val();
            options.carConfig.carId = $('.carSelect').find('option:selected').val();
            $.each($('.basicConf').find('input'),function () {
                options.carConfig.basisConfig[$(this).attr('name')] = $(this).val();
            })
            $.each($('.carBodyConf').find('input'),function () {
                options.carConfig.carBodyConfig[$(this).attr('name')] = $(this).val();
            })
            $.each($('.motorConf').find('input'),function () {
                options.carConfig.motorConfig[$(this).attr('name')] = $(this).val();
            })
            $.each($('.gearbox').find('input'),function () {
                options.carConfig.gearBoxConfig[$(this).attr('name')] = $(this).val();
            })
            $.each($('.chassisConf').find('input'),function () {
                options.carConfig.chassisConfig[$(this).attr('name')] = $(this).val();
            })
            $.each($('.brakingConf').find('input'),function () {
                options.carConfig.brakingConfig[$(this).attr('name')] = $(this).val();
            })
            for(var i =1;i<=21;i++){
                var name = "safetyConf"+i;
                options.carConfig.safetyConfig[name] = $("input:radio[name='"+name+"']:checked").val();
            }
            for(var i =1;i<=20;i++){
                var name = "assistConf"+i;
                options.carConfig.assistConfig[name] = $("input:radio[name='"+name+"']:checked").val();
            }
            for(var i =1;i<=16;i++){
                var name = "antiTheftConf"+i;
                options.carConfig.antiTheftConfig[name] = $("input:radio[name='"+name+"']:checked").val();
            }
            for(var i =1;i<=12;i++){
                var name = "internalConf"+i;
                options.carConfig.internalConfig[name] = $("input:radio[name='"+name+"']:checked").val();
            }
            options.carConfig.internalConfig['fxptj'] = $("input[name='fxptj']").val();

            for(var i =1;i<=23;i++){
                var name = "seatConf"+i;
                options.carConfig.seatConfig[name] = $("input:radio[name='"+name+"']:checked").val();
            }
            options.carConfig.seatConfig['zycz'] = $("input[name='zycz']").val();

            for(var i =1;i<=10;i++){
                var name = "multimediaConf"+i;
                options.carConfig.multimediaConfig[name] = $("input:radio[name='"+name+"']:checked").val();
            }
            options.carConfig.multimediaConfig['zkdp'] = $("input[name='zkdp']").val();
            options.carConfig.multimediaConfig['wjyjk'] = $("input[name='wjyjk']").val();
            options.carConfig.multimediaConfig['CD'] = $("input[name='CD']").val();
            options.carConfig.multimediaConfig['ysqbrand'] = $("input[name='ysqbrand']").val();
            options.carConfig.multimediaConfig['ysqnum'] = $("input[name='ysqnum']").val();
            //
            for(var i =1;i<=9;i++){
                var name = "lightingConf"+i;
                options.carConfig.lightingConfig[name] = $("input:radio[name='"+name+"']:checked").val();
            }
            options.carConfig.lightingConfig['jgd'] = $("input[name='jgd']").val();
            options.carConfig.lightingConfig['ygd'] = $("input[name='ygd']").val();
            //
            for(var i =1;i<=17;i++){
                var name = "glassConf"+i;
                options.carConfig.glassConfig[name] = $("input:radio[name='"+name+"']:checked").val();
            }
            options.carConfig.glassConfig['glassUpOrDown'] = $("input[name='glassUpOrDown']").val();
           //
            for(var i =1;i<=6;i++){
                var name = "AirConditionerConf"+i;
                options.carConfig.AirConditionerConfig[name] = $("input:radio[name='"+name+"']:checked").val();
            }
            options.carConfig.AirConditionerConfig['ktkzfs'] = $("input[name='ktkzfs']").val();
            console.log(options);
            $.ajax({
                type:"POST",
                dataType:"json",
                data:options,
                url:url,
                success:function (res) {
                    alert(res.mess)
                },
                error:function (res) {
                    alert(res.mess)
                }
            })
        }else{

        }

    }
    $('#add').click(function () {
       addOrUpdate(id);
    })

})