var detail = new Vue({
    el: "#detail",
    data: {
        views: '123',
        title: '',
        ctime: '2020',
        content: '',
        bid: null
    },
    created() {
        if (location.search.indexOf('?') >= 0) {
            var arr = location.search.split('?')[1];
            if (arr.split('=')[0] == 'id') {
                var id = arr.split('=')[1];
                this.bid = id;
                axios({
                    method: 'get',
                    url: '/queryBlogById?id=' + id
                }).then(function (resp) {
                    // console.log(resp);
                    detail.content = resp.data[0].content;
                    detail.title = resp.data[0].title;
                    detail.views = resp.data[0].views;
                    detail.ctime = resp.data[0].ctime;
                    //    detail.content=resp.data[0].content;
                })
            }
        }
    }
})

var guest = new Vue({
    el: "#guestbook",
    data: {
        total:121,
        guestbook_list: []
    },
    created() {
        axios({
            url: '/queryCommentByBid?bid=' + detail.bid,
            method: 'get'
        }).then(function (resp) {
            // console.log(resp)
            guest.guestbook_list=[...resp.data];
            for(var i = 0 ; i < guest.guestbook_list.length ; i++){
                if(guest.guestbook_list[i].parent > 0){
                    guest.guestbook_list[i].options ="回复@"+ guest.guestbook_list[i].parent_name;
                }
            }
        }),
        axios({
            url:'queryCommentByCount',
            method:'get',
        }).then(function(resp){
            guest.total = resp.data[0].count;
            
        })
    },
    methods:{
        huiFu(commentId,commentName){       
             document.getElementById('reply_name').value = commentName;
                   document.getElementById('reply').value = commentId;
                   location.href="#send_comment";
                }
    }
})


var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vCode: null,
        flag: ''
    },
    methods: {
        submit() {
            var comment = document.getElementById('comment').value;
            var setName = document.getElementById('setName').value;

            if (sendComment.flag != setName) {
                alert('验证码错误');
                sendComment.getCode();
                return;
            }
            var user_name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var parentName = document.getElementById('reply_name').value;
            var parent = document.getElementById('reply').value;
            var mbid = detail.bid
            axios({
                url: '/insertComment?name=' + user_name + '&email=' + email + '&comment=' + comment + '&setName=' + setName + "&bid=" + mbid + "&parent=" + parent + "&parentName=" +parentName,
                method: 'get'
            }).then(function (resp) {
                alert('ok');
            })
        },
        getCode() {
            axios({
                url: '/queryRandomCode',
                method: 'get'
            }).then(function (resp) {
                sendComment.vCode = resp.data.data;
                sendComment.flag = resp.data.text;

            })
        },

    },
    created() {
        this.getCode();
    },
})