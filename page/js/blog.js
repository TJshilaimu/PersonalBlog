var searchBar = new Vue({
    el:'#searchBar',
    data:{
        msg:''
    },
    methods:{
        search(){
            console.log(this.msg)
            axios({
                method:'get',
                url:'/queryBlogBySearch?Search=' + this.msg
            }).then( resp => {
                console.log(0,resp.data.list)
                var count = resp.data.count[0].count
            pageList.page_list = Math.ceil(count / (pageList.pageSize));
            blogList.blog_list=resp.data.list
            })
        }
    }
})

var getEveryDay = new Vue({
    el: "#day",
    data: {
        msg: "我爱你，时间没什么了不起                   -----菜篮",

    },
    computed: {
        getDay() {
            return this.msg;
        }
    },
    created() {
        axios({
            url: '/selectEveryday',
            method: 'get'
        }).then(function (resp) {
            getEveryDay.msg = resp.data.data[0].content;
        })
    },
    methods:{
        toEveryday(){
            location.href='/everydayEdit.html'
        }
    }

})

var blogList = new Vue({
    el: "#blogList",
    data: {
        blog_list: []
    },
    methods: {
        toDetail(id) {
            location.href = "/blogDetail.html?id=" + id;
        }
    },
    created() {
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
                }).then(function (resp) {
                    var list = [];
                    for (var i = 0; i < resp.data.length; i++) {
                        list[i] = resp.data[i][0]
                    }
                    blogList.blog_list = list;
                    pageList.page_list = Math.ceil(blogList.blog_list.length / (pageList.pageSize));
                    // axios({
                    //     method: 'get',
                    //     url: '/queryBlogByCount'
                    // }).then(function (resp) {
                    //     console.log(resp)
                    //     var count = resp.data[0].count
                    //     pageList.page_list = Math.ceil(count / (pageList.pageSize));
                    // })
                })
            }
        } else {
            axios({
                method: 'get',
                url: '/queryBlogByPage?page=0&pageSize=3'
            }).then(function (resp) {
                console.log(resp);
                blogList.blog_list = [...resp.data];
                // yemian
                // axios({
                //     method:'get',
                //     url:'/queryBlogByCount'
                // }).then(function(resp){
                //     console.log(resp)
                //     var count = resp.data[0].count
                //     pageList.page_list= Math.ceil(count/(pageList.pageSize));
                // })
            })
        }
    }

})

var pageList = new Vue({
    el: "#pageList",
    data: {
        total: 100,
        pageSize: 3,
        page_list: null,
        
    },
    methods: {
        changePage(newPage) {
            axios({
                method: 'get',
                url: '/queryBlogByPage?page=' + newPage * pageList.pageSize + '&pageSize=' + pageList.pageSize
            }).then(function (resp) {
                blogList.blog_list = [...resp.data]
            })
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/queryBlogByCount'
        }).then(function (resp) {
            var count = resp.data[0].count
            pageList.page_list = Math.ceil(count / (pageList.pageSize));
        })
    }
})