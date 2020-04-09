var randomTags = new Vue({
    el: "#random_tag",
    data: {
        tag_list: ['zxc', 'erwrwer', 'dfsf', 'gdfg', 'cbbvvvvvvvvvv', 'aaaaaaaaaaaaa', 'dfsdfsdf', 'zxc', 'erwrwer', 'dfsf', 'gdfg', 'cbbvvvvvvvvvv', 'aaaaaaaaaaaaa', 'dfsdfsdf']
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
    }
})


var newHot = new Vue({
    el: "#new_hot",
    data: {
        hot_list: ['使用码云git的webhook实现生产环境代', '使用码云git的webhook实现生产环境代', '使用码云git的webhook实现生产环境代', '使用码云git的webhook实现生产环境代', '使用码云git的webhook实现生产环境代', '使用码云git的webhook实现生产环境代']
    }
})

var newComment = new Vue({
    el: "#new_comment",
    data: {
        comment_list: [{
                userName: 'hi',
                ctime: '2020-4-8',
                content: '你好呀，这是最近留言'
            },
            {
                userName: 'hi',
                ctime: '2020-4-8',
                content: '你好呀，这是最近留言'
            },
            {
                userName: 'hi',
                ctime: '2020-4-8',
                content: '你好呀，这是最近留言'
            },
            {
                userName: 'hi',
                ctime: '2020-4-8',
                content: '你好呀，这是最近留言'
            },
            {
                userName: 'hi',
                ctime: '2020-4-8',
                content: '你好呀，这是最近留言'
            },
            {
                userName: 'hi',
                ctime: '2020-4-8',
                content: '你好呀，这是最近留言'
            }
        ]
    }
})