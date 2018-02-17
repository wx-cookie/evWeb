$(function(){
    var httpUrl="http://www.wxlovezy.top:8080/spring";

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
    var dataid =GetRequest().id;
    var navid = GetRequest().navId;
    var subnavid = GetRequest().subNavId;
    var currentPage = GetRequest().currentPage;
    (function(){
        $.ajax({
            async:false,
            type:"GET",
            url:httpUrl+"/nav/nav/",
            success:function(data){
                $.each(data.data,function(i,v){
                    if(v.id!=1){
                        $('.navOne').append("<option value='"+v.id+"'>"+v.name+"</option>");
                    }
                });
                $(".navOne option[value='"+navid+"']").attr('selected','selected');
            }
        });
        querySubNav(navid);
    })();


    function querySubNav(id){
            $.ajax({
                type:"GET",
                async:false,
                url:httpUrl+"/nav/subNav/"+id+"",
                success:function(res){
                    //清除
                    $('.navTwo').children().remove();
                    if(res.data.length==0){
                        $('.navTwo').append("<option value='0' selected='selected'>无</option>");
                    }else{
                        $.each(res.data,function(i,v){
                            $('.navTwo').append("<option value='"+v.id+"'>"+v.name+"</option>");
                        });
                        if(subnavid!="" && subnavid!="undefined"){
                            $(".navTwo option[value='"+subnavid+"']").attr('selected','selected');
                        }
                    }
                }
            })
    }

    $('.navOne').change(function(){

        var navId = $(this).children('option:selected').val();
        querySubNav(navId);
    });
    if(typeof (dataid)!="undefined"){
        //取值
        $.ajax({
            type:"GET",
            url:httpUrl+"/admin/cont/"+dataid+"",
            dataType:"json",
            success:function (res) {
                //先清除
                $(".navOne option[value='"+res.data.navId+"']").attr("selected","selected");
                $(".navTwo option[value='"+res.data.subNavId+"']").attr("selected","selected");
                if(res.data.subNavId == 0){
                    $(".navTwo option").remove();
                    $('.navTwo').append("<option value='0'>无</option>");
                }
                $("input[name='newsTitle']").val(res.data.title);
                $("input[name='author']").val(res.data.author);
                $("textarea[name='summary']").text(res.data.summary);
                $("input[name='idx']").val(res.data.idx);
                $('#fileImage').next('img').attr('src',res.data.iconSrc);
                $(".isIndex input[value='"+res.data.isIndex+"']").attr("checked","checked");
                $("input[name='indexIdx']").val(res.data.indexIdx);
                $(".isShowImg input[value='"+res.data.isShowImage+"']").attr("checked","checked");
                $('#lbfileImage').next('img').attr('src',res.data.imageSrc);
                //ue.setContent(res.data.content);//报错因为ueditor没有初始化好
                ue.ready(function () {
                    ue.setContent(res.data.content);
                })
            }
        })
    }
    function addOrUpdate(id) {
        var url;
        var options;
        var content;
        ue.ready(function () {
            content = ue.getContent();
        })
        //取值
        if(typeof (dataid)!="undefined"){
            url = httpUrl+"/admin/updateNews/";
            options={
                id:id,
                navId: Number($(".navOne").find("option:selected").val()),
                subNavId : Number($('.navTwo').find("option:selected").val()),
                title : $("input[name='newsTitle']").val(),
                author : $("input[name='author']").val(),
                summary : $("textarea[name='summary']").text(),
                idx : Number($("input[name='idx']").val()),
                iconSrc : $('#fileImage').next('img').attr('src'),
                isIndex : Number($('.isIndex').find("input:checked").val()),
                indexIdx : Number($("input[name='indexIdx']").val()),
                isShowImage : Number($('.isShowImg').find("input:checked").val()),
                imageSrc : $('#lbfileImage').next('img').attr('src'),
                content: content
            }
        }else{
            url= httpUrl+"/admin/addNews/";
            options={
                navId: $(".navOne").find("option:selected").val(),
                subNavId : $('.navTwo').find("option:selected").val(),
                title : $("input[name='newsTitle']").val(),
                author : $("input[name='author']").val(),
                summary : $("textarea[name='summary']").val(),
                idx : $("input[name='idx']").val(),
                iconSrc : $('#fileImage').next('img').attr('src'),
                isIndex : $('.isIndex').find("input:checked").val(),
                indexIdx : $("input[name='indexIdx']").val(),
                isShowImage : $('.isShowImg').find("input:checked").val(),
                imageSrc : $('#lbfileImage').next('img').attr('src'),
                content: content
            }
        }
        //调用接口
        if(checkValue(options)){
            $.ajax({
                type:"POST",
                url:url,
                dataType:"json",
                data:options,
                success:function (res) {
                    alert(res.mess);
                },
                error:function (e) {
                    console.log(e);
                }
            })
        }
        //校验
    }
    function checkValue(options) {
        var flag = true;
        if(options.navId==null){
            flag = false;
        }
        if(options.subNavId==null){
            flag = false;
        }
        if(options.title == "" || options.title ==null){
            flag = false;
        }
        if(options.author == "" || options.author ==null){
            flag = false;
        }
        if(options.idx ==null){
            flag = false;
        }
        if(options.isIndex=="undefined" || options.isIndex==null){
            flag = false;
        }
        if(options.isShowImage ==null || options.isShowImage=="undefined" ){
            flag = false;
        }
        if(options.content == "" || options.content ==null){
            flag = false;
        }
        return flag;
    }
    $('#add').click(function () {
        addOrUpdate(dataid);
    })
    //点击是否在首页显示出现或隐藏首页排序编号
    $(".isIndex input[value='0']").click(function () {
        $('.isIndex').next('h5').attr('style','display:none');
        $('.isIndex').next('h5').next('div').attr('style','display:none');
    });
    $(".isIndex input[value='1']").click(function () {
        $('.isIndex').next('h5').attr('style','display:block');
        $('.isIndex').next('h5').next('div').attr('style','display:block');
    });
    //轮播图
    $(".isShowImg input[value='0']").click(function () {
        $('.isShowImg').next('h5').attr('style','display:none');
        $('.isShowImg').next('h5').next('div').attr('style','display:none');
    });
    $(".isShowImg input[value='1']").click(function () {
        $('.isShowImg').next('h5').attr('style','display:block');
        $('.isShowImg').next('h5').next('div').attr('style','display:block');
    });
    //返回
    $('.pub-btn a').click(function () {
        var href=getHref(navid);
        window.location.href=href+"?navId="+navid+"&subNavId="+subnavid+"&currentPage="+currentPage+"&isBack=true";
    })
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
    function getHref(navId) {
        var href;
        if(navId==1){
            href="wenzhang_shouye.html";
        }else if(navId==2){
            href="wenzhang_hangyedongtai.html";
        }else if(navId == 3){
            href="wenzhang_chongdian.html"
        }else if(navId== 4){
            href="wenzhang_gouchezhinan.html";
        }else if(navId==5){
            href="wenzhang_yongchezhinan.html";
        }else if(navId==6){
            href="wenzhang_kepuzhishi.html";
        }else if(navId==7){
            href="wenzhang_jishuziliao.html"
        }
        return href;
    }

});