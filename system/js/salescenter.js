$(function () {
    // 百度地图API功能
    var map = new BMap.Map("container");
    var point = new BMap.Point(116.331398, 39.897445);
    var geoc = new BMap.Geocoder();
    map.centerAndZoom(point, 14);
    map.enableScrollWheelZoom(true);
    //var marker = new BMap.Marker(point);
    var marker;
    function myFun(result) {
        var cityName = result.name;
        map.setCenter(cityName);
        //alert("当前定位城市:"+cityName);
    }
    
    function showInfo(e) {
        //alert(e.point.lng + ", " + e.point.lat);
        $(".lng").val(e.point.lng);
        $(".lat").val(e.point.lat);
        var pt = e.point;
        geoc.getLocation(pt, function(rs){
            var addComp = rs.addressComponents;
            $("#province").val(addComp.province);
            $("#city").val(addComp.city);
            $("#location").val(addComp.province+addComp.city+addComp.district+addComp.street+addComp.streetNumber);
        });
        map.addOverlay();
    }

    map.addEventListener("click", showInfo);
    var httpUrl="http://www.wxlovezy.top:8080/spring";
    var isShow;
    getCarList();
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

    if(cid!=null || typeof (cid)!="undefined"){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:httpUrl+"/adminSales/get/"+cid+"",
            success:function (res) {
                $(".lng").val(res.data.longitude);
                $(".lat").val(res.data.latitude);
                $("#location").val(res.data.location);
                $("#province").val(res.data.province),
                $("#city").val(res.data.city),
                $("#repariname").val(res.data.salesName),
                $("#tel").val(res.data.tel),
                point = new BMap.Point(res.data.longitude, res.data.latitude)
                marker = new BMap.Marker(point)
                map.addOverlay(marker);
                map.centerAndZoom(point, 14);
                var opts = {
                      width : 300,     // 信息窗口宽度
                      height: 100,     // 信息窗口高度
                      title : "销售商名称："+res.data.salesName , // 信息窗口标题
                      enableMessage:true,//设置允许信息窗发送短息
                      message:""
                    }
                var infoWindow = new BMap.InfoWindow("详细地址："+res.data.location, opts);  // 创建信息窗口对象 
                map.openInfoWindow(infoWindow,point);
                marker.addEventListener("click", function(){          
                    map.openInfoWindow(infoWindow,point); //开启信息窗口
                });
                point = new BMap.Point(res.data.longitude, res.data.latitude);
                map.centerAndZoom(point, 14);
                initCarsId(res.data.carsId);
                $("#add").attr("value", "更新");
            }
        })
    }else{
        var myCity = new BMap.LocalCity();
        myCity.get(myFun);
        map.setZoom(14);
        map.enableScrollWheelZoom(true);
    }

    //获取汽车列表
    function getCarList(){
        url = httpUrl+"/adminCar/getList";
        $.ajax({
            type:"GET",
            dataType:"json",
            url:url,
            success:function (res) {
                $.each(res.data,function(i,v){
                    $("#salescars").append('<span><input type="checkbox" name="carId" id="-'+ v.id +'" value="-'+ v.id  +'"/>'+v.carName+'</span>');
                });
            }
        });
    }

    //点击添加
    function addOrUpdate(id) {
        var url;
        var option;
        
        var chks=$("input:checked");
        var carsid = "";
        for(var i=0; i<chks.length; i++){ 
            if(chks[i].checked) {
                carsid+=chks[i].value; //如果选中，将value添加到变量s中
            } 
        }
        if (chks.length > 0) {
            carsid +='-';
        }
        if(typeof (id)!="undefined"){
            url=httpUrl+"/adminSales/update";
            option={
                id:id,
                longitude:$(".lng").val(),
                latitude:$(".lat").val(),
                location:$("#location").val(),
                province:$("#province").val(),
                city:$("#city").val(),
                salesName:$("#repariname").val(),
                tel:$("#tel").val(),
                carsId:carsid
            }
        }else{
            url=httpUrl+"/adminSales/add";
            option={
                longitude:$(".lng").val(),
                latitude:$(".lat").val(),
                location:$("#location").val(),
                province:$("#province").val(),
                city:$("#city").val(),
                salesName:$("#repariname").val(),
                tel:$("#tel").val(),
                carsId:carsid
            }
        }
        if(checkValue(option)){
            $.ajax({
                type:"POST",
                dataType:"json",
                data:option,
                url:url,
                success:function (res) {
                    alert(res.mess)
                },
                error:function (res) {
                    alert(res.mess)
                }
            })
        }
    }
    function checkValue(option) {
        var flag = true;
        if(option.longitude == ""|| option.latitude == ""){
            alert("经纬度不能为空")
            flag = false;
        }else if (option.location == "") {
            alert("详细地址不能为空");
            flag = false;
        }else if (option.salesName == "") {
            alert("销售商名称不能为空");
            flag = false;
        }else if (option.tel == "") {
            alert("电话号码不能为空");
            flag = false;
        }
        return flag;
    }

    function initCarsId(carsidStr){
        if (carsidStr != "") {
            var ids = carsidStr.split('-');
            for (var i = 1; i < ids.length-1; i++) {
                $("#-"+ids[i]).attr("checked",true);
            }
        }
    }
    //点击添加
    $('#add').click(function () {
        addOrUpdate(cid);
    })
    //点击返回
    $('.pub-btn a').click(function () {
        window.location.href="salescenterList.html?currentPage="+oldPage+"&isBack=true";
    })
})