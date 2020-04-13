

var getEveryDay = new Vue({
    el:"#day",
    data:{
        msg:"我爱你，时间没什么了不起                   -----菜篮",
                      
    },
    computed:{
        getDay(){
            return this.msg;
        }
    },
    created(){
        axios({
            url:'/selectEveryday',
            method:'get'
        }).then(function(resp){
            getEveryDay.msg = resp.data.data[0].content;
        })
    }
    
})

var blogList = new Vue({
    el:"#blogList",
    data:{
        blog_list:[]
    },
    methods:{
        toDetail(id){
            location.href = "/blogDetail.html?id="+ id;
        }
    },
    created(){
        // axios({
        //     method:'get',
        //     url:'/queryBlogByPage?page=0&pageSize=3'
        // }).then(function(resp){
        //     blogList.blog_list = [...resp.data];
        // })
        if (location.search.indexOf('?') >= 0) {
            var arr = location.search.split('?')[1];
            if (arr.split('=')[0] == 'tag') {
                var tag = arr.split('=')[1];
                axios({
                    method: 'get',
                    url: '/queryBlogByTag?tag=' + tag
                }).then(function (resp){
                   var list =[];
                   for(var i = 0 ;i <resp.data.length;i++){
                    list[i]=resp.data[i][0]
                   }
                   blogList.blog_list = list;
                })
            }
        }else{
            axios({
                method:'get',
                url:'/queryBlogByPage?page=0&pageSize=3'
            }).then(function(resp){
                blogList.blog_list = [...resp.data];
            })
        }
    }
    
})

var pageList = new Vue({
    el:"#pageList",
    data:{
        total:100,
        pageSize:3,
        page_list:null
    },
    methods:{
        changePage(newPage){
            axios({
                method:'get',
                url:'/queryBlogByPage?page=' + newPage*pageList.pageSize +'&pageSize='+ pageList.pageSize
            }).then(function(resp){
                blogList.blog_list = [...resp.data]
            })
        }
    },
    created(){
        axios({
            method:'get',
            url:'/queryBlogByCount'
        }).then(function(resp){
            var count = resp.data[0].count
            pageList.page_list= Math.ceil(count/(pageList.pageSize));
        })
    }
})