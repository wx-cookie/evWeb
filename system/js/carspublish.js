$(function () {
    var httpUrl="http://www.wxlovezy.top:8080/spring";
    var isShow;
    //下拉框
    $.ajax({
        type:"GET",
        dataType:"json",
        async:false,
        url:httpUrl+"/carBrand/getList/",
        success:function (res) {
            $.each(res.data,function (i,v) {
                $('.brandSelect').append(
                    "<option value='"+v.id+"'>"+v.brandName+"</option>"
                )
            })
        }
    })
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
    var cid = GetRequest().id;
    var oldPage = GetRequest().currentPage;
    var isSale = GetRequest().isSale;



    if(cid!=null && typeof (cid)!="undefined"){
        $("input[name='minPrice']").attr('readonly','readOnly');
        $("input[name='maxPrice']").attr('readonly','readOnly');
        $('.min').attr('style','display:block');
        $('.max').attr('style','display:block');
        $.ajax({
            type:"GET",
            dataType:"json",
            url:httpUrl+"/adminCar/get/"+cid+"",
            success:function (res) {
                $(".brandSelect option[value='"+res.data.brandId+"']").attr("selected","selected");
                $("input[name='carName']").val(res.data.carName);
                $("input[name='minPrice']").val(res.data.minPrice);
                $("input[name='maxPrice']").val(res.data.maxPrice);
                $("input[name='idx']").val(res.data.idx);
                if(res.data.leval>10 && res.data.leval<20){
                    $(".littleCar option[value='"+res.data.leval+"']").attr("selected","selected");
                }else if(res.data.leval>20 && res.data.leval<30){
                    $(".SUV option[value='"+res.data.leval+"']").attr("selected","selected");
                }else if(res.data.leval>70 && res.data.leval<80){
                    $(".trunk option[value='"+res.data.leval+"']").attr("selected","selected");
                }else{
                    $(".level input[value='"+res.data.leval+"']").attr("checked","checked");
                }
                $(".struct input[value='"+res.data.struct+"']").attr("checked","checked");
                $(".country input[value='"+res.data.country+"']").attr("checked","checked");
                $(".gearBox input[value='"+res.data.gearBox+"']").attr("checked","checked");
                $(".seatNum input[value='"+res.data.seatNum+"']").attr("checked","checked");
                $(".productor input[value='"+res.data.productor+"']").attr("checked","checked");
                $(".driver input[value='"+res.data.driver+"']").attr("checked","checked");
                $('#cariconImage').next('img').attr('src',res.data.iconSrc);
            }
        })

    }else{
        /*$("input[name='minPrice']").attr('style','display:none');
        $("input[name='maxPrice']").attr('style','display:none');*/
        $('.min').attr('style','display:none');
        $('.max').attr('style','display:none');
    }
    //级别选择
    var $sels = $('.level').children('select');
    var $ra = $("input[name='level']");
    $.each($sels,function (i,v) {
        $(this).change(function () {
            var $extra =$sels.not($(this));
            $.each($extra,function (i,v) {
                var st = $(v).attr('id');
                $('#'+st+" option[value='none']").prop("selected","false");
            });
            $.each($ra,function () {
                $(this).removeAttr('checked');
            })
        })
    });
    $.each($ra,function () {
        $(this).click(function () {
            $.each($sels,function (i,v) {
                $('#'+$(this).attr('id')+" option[value='none']").prop("selected","selected");
            })
        })
    })

    function addOrUpdate(id) {
        var url;
        var option;
        if(typeof (id)=="undefined"){
            //添加
            url=httpUrl+"/adminCar/add/";
            var level;
            if($('.level').find("input:checked").length!=0){
                level=$('.level').find("input:checked").val();
            }else{
                var $sels = $('.level').children('select');
                $.each($sels,function (i,v) {
                    if($(this).find("option:selected").val()!="none"){
                        level = $(this).find("option:selected").val();
                    }
                });
            }
            option={
                brandId:$(".brandSelect").find("option:selected").val(),
                carName:$("input[name='carName']").val(),
                minPrice:$("input[name='minPrice']").val(),
                maxPrice:$("input[name='maxPrice']").val(),
                idx:$("input[name='idx']").val(),
                isSale:GetRequest().isSale,
                leval:level,
                struct:$(".struct").find("input:checked").val(),
                country:$(".country").find("input:checked").val(),
                seatNum:$(".seatNum").find("input:checked").val(),
                gearBox:$(".gearBox").find("input:checked").val(),
                productor:$(".productor").find("input:checked").val(),
                driver:$(".driver").find("input:checked").val(),
                iconSrc:$('#cariconImage').next('img').attr('src')
            }
            if(checkValue(option)){
                $.ajax({
                    type:"POST",
                    url:url,
                    dataType:"json",
                    data:option,
                    success:function (res) {
                        alert(res.mess)
                    },
                    error:function (res) {
                        alert(res.mess)
                    }
                })
            }
        }else{
            //修改
            url=httpUrl+"/adminCar/update/";
            var level;
            if($('.level').find("input:checked").length!=0){
                level=$('.level').find("input:checked").val();
            }else{
                var $sels = $('.level').children('select');
                $.each($sels,function (i,v) {
                    if($(this).find("option:selected").val()!="none"){
                        level = $(this).find("option:selected").val();
                    }
                });
            }
            option={
                id:id,
                brandId:$(".brandSelect").find("option:selected").val(),
                carName:$("input[name='carName']").val(),
                minPrice:$("input[name='minPrice']").val(),
                maxPrice:$("input[name='maxPrice']").val(),
                idx:$("input[name='idx']").val(),
                isSale:GetRequest().isSale,
                leval:level,
                struct:$(".struct").find("input:checked").val(),
                country:$(".country").find("input:checked").val(),
                seatNum:$(".seatNum").find("input:checked").val(),
                gearBox:$(".gearBox").find("input:checked").val(),
                productor:$(".productor").find("input:checked").val(),
                driver:$(".driver").find("input:checked").val(),
                iconSrc:$('#cariconImage').next('img').attr('src')
            }
            console.log(option);
            if(checkValue(option)){
                $.ajax({
                    type:"POST",
                    url:url,
                    dataType:"json",
                    data:option,
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

    function checkValue(options) {
        var flag = true;
        if(options.brandId==null){
            flag = false;
            alert("请选择品牌")
        }
        if(options.carName == "" || options.carName ==null){
            flag = false;
            alert("请填写车系名称")
        }
        if(options.minPrice == "" || options.minPrice ==null){
            flag = false;
            alert("请填写最低价")
        }
        if(options.maxPrice == "" || options.maxPrice ==null){
            flag = false;
            alert("请填写最高价")
        }
        if(options.idx == "" || options.idx ==null){
            flag = false;
            alert("请填写排序")
        }
        if(options.leval=="undefined" || options.leval==null){
            flag = false;
            alert("请选择级别")
        }
        if(options.struct ==null || options.struct=="undefined" ){
            flag = false;
            alert("请选择车身结构")
        }
        if(options.country == "" || options.country ==null){
            flag = false;
            alert("请选择国家")
        }
        if(options.seatNum == "" || options.seatNum ==null){
            flag = false;
            alert("请选择座位数")
        }
        if(options.gearBox == "" || options.gearBox ==null){
            flag = false;
            alert("请选择变速箱")
        }
        if(options.productor == "" || options.productor ==null){
            flag = false;
            alert("请选择生产厂商")
        }
        if(options.driver == "" || options.driver ==null){
            flag = false;
            alert("请选择驱动方式")
        }
        return flag;
    }

    $('#add').click(function () {
        addOrUpdate(cid)
    })
    $('.pub-btn a').click(function () {
        window.location.href=getHref(isSale)+"?currentPage="+oldPage+"&isBack=true";
    })

    function getHref(isSale) {
        var href;
        if(isSale==1){
            href="carsale.html";
        }else if(isSale==2){
            href="carnotsale.html";
        }else if(isSale == 3) {
            href = "carstopsale.html"
        }
        return href;
    }

    //上传
    var $upInput = $("input[type='file']");
    $.each($upInput,function (i,v) {
        var id=$(this).attr('id');
        document.getElementById(id).onchange = function(){
            var img = event.target.files[0];
            // 判断是否图片
            if(!img){
                return ;
            }
            // 判断图片格式
            if(!(img.type.indexOf('image')==0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name)) ){
                alert('图片只能是jpg,gif,png');
                return ;
            }

            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = function(e){
                // ajax 上传图片
                $.ajax({
                    type:"POST",
                    url:"http://www.wxlovezy.top:8080/spring/file/fileUpload/",
                    dataType:"json",
                    success:function(data){
                        $('#'+id).next('img').attr('src',"../images/"+img.name+"");
                    },
                    error:function(data){
                        console.log("e")
                    }
                })
            }
        }
    })
})