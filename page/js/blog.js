var searchBar = new Vue({
    el: '#searchBar',
    data: {
        msg: ''
    },
    methods: {
        search() {
            // console.log(this.msg)
            if(this.msg == ''){
                alert('请输入搜索内容')
                return;
            }
            let that =this;
            axios({
                method: 'get',
                url: '/queryBlogBySearch?Search=' + this.msg
            }).then(resp => {
                // console.log(0, resp.data.list)
                var count = resp.data.count[0].count
                pageList.total = count;
                pageList.nowPage=1
                pageList.refresh();
                // console.log(pageList.page_list)
                blogList.blog_list = resp.data.list.slice(0,3);
                pageList.changePage = function(newPage){
                    pageList.nowPage = newPage
                   var arr= resp.data.list.slice((newPage-1)*pageList.pageSize,(newPage)*pageList.pageSize)
                   blogList.blog_list =arr;
                }
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
    methods: {
        toEveryday() {
            location.href = '/everydayEdit.html'
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
        nowPage: 1,
        page_list: []
    },
    methods: {
        changePage(newPage) {
            this.nowPage = newPage;
            let that=this;
            axios({
                method: 'get',
                url: '/queryBlogByPage?page=' + (newPage-1) * pageList.pageSize + '&pageSize=' + pageList.pageSize
            }).then(function (resp) {
                // blogList.blog_list = [...resp.data]
                console.log('111',resp)
                // that.total = resp.data.length;
                that.refresh()
                blogList.blog_list = [...resp.data]

            })
        },
        refresh(){
                var totalPage = Math.floor((pageList.total + pageList.pageSize - 1) / pageList.pageSize);
                pageList.page_list = [];
                pageList.page_list.push({text: "首页", pageNum: 1});
                if (pageList.nowPage - 2 > 0) {
                    pageList.page_list.push({text: pageList.nowPage - 2, pageNum: pageList.nowPage - 2});
                }
                if (pageList.nowPage - 1 > 0) {
                    pageList.page_list.push({text: pageList.nowPage - 1, pageNum: pageList.nowPage - 1});
                }
                pageList.page_list.push({text: pageList.nowPage, pageNum: pageList.nowPage});
                if (pageList.nowPage + 1 <= totalPage) {
                    pageList.page_list.push({text: pageList.nowPage + 1, pageNum: pageList.nowPage + 1});
                }
                if (pageList.nowPage + 2 <= totalPage) {
                    pageList.page_list.push({text: pageList.nowPage + 2, pageNum: pageList.nowPage + 2});
                }
                pageList.page_list.push({text: "尾页", pageNum: totalPage});
        }
    },
    created() {
        let that =this;
        axios({
            method: 'get',
            url: '/queryBlogByCount'
        }).then(function (resp) {
            var count = resp.data[0].count;
            that.total = count;
            
            that.refresh();
            // pageList.page_list = Math.ceil(count / (pageList.pageSize));
        })
    }
})