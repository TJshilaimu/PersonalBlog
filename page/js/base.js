var randomTags = new Vue({
    el: "#random_tag",
    data: {
        tag_list: [],
    },
    methods:{
        // tickTag(tagId){
        //     axios({
        //         url:'queryBlogByTagId?tagId=' + tagId,
        //         method:'get',
        //     }).then(function(resp){
        //         resp.data
        //     })
        // }
    },


    computed: {
        colorRandom: function () {
            return function () {
                var r = 50 + Math.floor(Math.random() * 200);
                var g = 50 + Math.floor(Math.random() * 200);
                var b = 50 + Math.floor(Math.random() * 200);
                return "rgb( " + r + ", " + g + ", " + b + ")";
            }
        },
        sizeRandom: function () {
            return function () {
                return Math.random() * 18 + 8 + "px";
            }
        }
    },
    created(){
        axios({
            method:'get',
            url:'/queryAllTags'
        }).then(function(resp){
       
          randomTags.tag_list = resp.data;
          for(var i = 0;i<randomTags.tag_list.length;i++){
            randomTags.tag_list[i].link ="/?tag="+ randomTags.tag_list[i].tag;
           }
        
        })
    }
})


var newHot = new Vue({
    el: "#new_hot",
    data: {
        hot_list: []
    },
    created(){
        axios({
            url:'queryBlogByViews',
            method:'get'
        }).then(function(resp){
            newHot.hot_list = resp.data;
            for(let i= 0;i<newHot.hot_list.length;i++){
                newHot.hot_list[i].link ="/blogDetail.html?id="+ newHot.hot_list[i].id
            }
        })
    }
})

var newComment = new Vue({
    el: "#new_comment",
    data: {
        comment_list: []
    },
    created(){
        axios({
            url:'/queryCommentByCtime',
            method:'get'
        }).then(function(resp){
            newComment.comment_list=resp.data;
        })

    }
})