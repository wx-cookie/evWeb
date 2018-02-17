$(function () {
    var httpUrl="http://www.wxlovezy.top:8080/spring";
    var currentPage = 1;
    var pageSize = 5;
    var $ulLists = $('.articlelist');
    var counts;
    //获取点赞列表
    function queryScLists() {
        if($ulLists.children().length!=0){
            $ulLists.children().remove();
        }
        $.ajax({
            type:"GET",
            timeout:10000,
            dataType:"json",
            async:false,
            url:httpUrl+"/user/agreeNews/"+currentPage+"/"+pageSize+"",
            success:function (res) {
                $.each(res.data,function (i,v) {
                    $ulLists.append(
                        "<li>" +
                        "<a href='#'  data-id='"+v.id+"'>"+v.title+"</a>" +
                        "</li>"
                    )
                })
            }
        });
    }
    queryScLists();
    //获取收藏数量
    $.ajax({
        type:"GET",
        timeout:10000,
        dataType:"json",
        async:false,
        url:httpUrl+"/user/collectionsCount/",
        success:function (res) {
            $("a[name='sc']").html(res.data);

        }
    });
    //获取点赞数量
    $.ajax({
        type:"GET",
        timeout:10000,
        dataType:"json",
        async:false,
        url:httpUrl+"/user/agreeNewsCount/",
        success:function (res) {
            $("a[name='dz']").html(res.data);
            counts = res.data;
        }
    });
    //获取评论数量
    $.ajax({
        type:"GET",
        timeout:10000,
        dataType:"json",
        async:false,
        url:httpUrl+"/user/commentsCount/",
        success:function (res) {
            $("a[name='pl']").html(res.data);
        }
    });

    reachDataid();

    function reachDataid() {
        var $titles = $('[data-id]');
        $.each($titles,function (i,v) {
            $(this).click(function () {
                var newid =$(this).attr('data-id');
                window.open("detail.html?"+newid);
            })
        })
    }
    //加载更多
    var pageNum = Math.ceil(counts/pageSize);
    $('#loadmore input').click(function () {
        currentPage++;
        if(currentPage<=pageNum){
            $.ajax({
                type:"GET",
                timeout:10000,
                dataType:"json",
                async:false,
                url:httpUrl+"/user/agreeNews/"+currentPage+"/"+pageSize+"",
                success:function (res) {
                    $.each(res.data,function (i,v) {
                        $ulLists.append(
                            "<li>" +
                            "<a href='#'  data-id='"+v.id+"'>"+v.title+"</a>" +
                            "</li>"
                        )
                    })
                }
            });
            reachDataid();
        }else{
            $('#loadmore input').val('已全部显示');
        }
    });
});