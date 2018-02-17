$(function () {
    var httpUrl="http://www.wxlovezy.top:8080/spring";
    var type=1;
    var $brandContent=$('.salesBox');

    getCars(type);
    $('.stopsale').click(function () {
        type=$(this).attr('isSale');
        getCars(type)
    })
    $('.notsale').click(function () {
        type=$(this).attr('isSale');
        getCars(type)
    })

    function getCars(type) {
        $.ajax({
            type:"GET",
            dataType:"json",
            async:false,
            url:httpUrl+"/car/getList/"+type,
            success:function (res) {
                $.each(res.data,function (i,v) {
                    $brandContent.append(
                        "<div class=\"cars-box\">" +
                        "<div class=\"img\"><a href=\"buycarsindex.html\" target=\"_blank\"><img src='"+v.iconSrc+"'/></a></div>" +
                        "<h5 class=\"name\"><a href=\"buycarsindex.html\" target=\"_blank\">"+v.carName+"</a></h5>" +
                        /*"<h5 class=\"price\"><a href=\"buycarsindex.html\" target=\"_blank\">指导价:<span>"+v.minPrice+"+"-"+"+v.maxPrice+"</span></a></h5>" +*/
                        "</div>"
                    )
                })
            }
        })
    }

})