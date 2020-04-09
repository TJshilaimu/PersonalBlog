var getEveryDay = new Vue({
    el:"#day",
    data:{
        msg:`我爱你，时间没什么了不起

                           -----菜篮`,
                      
    },

    created(){
console.log('vue is running')
    }
    
})

var blogList = new Vue({
    el:"#blogList",
    data:{
        blog_list:[
            {
                title:'Laravel5.4安装passport时遇到的一些问题',
                content:'co安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...n',
                ctime:'4-8',
                views:112,
                tags:'zc,xc,zxc'
            },
            {
                title:'Laravel5.4安装passport时遇到的一些问题',
                content:'co安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...n',
                ctime:'4-8',
                views:112,
                tags:'zc,xc,zxc'
            },
            {
                title:'Laravel5.4安装passport时遇到的一些问题',
                content:'co安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...n',
                ctime:'4-8',
                views:112,
                tags:'zc,xc,zxc'
            },
            {
                title:'Laravel5.4安装passport时遇到的一些问题',
                content:'co安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...n',
                ctime:'4-8',
                views:112,
                tags:'zc,xc,zxc'
            },
            {
                title:'Laravel5.4安装passport时遇到的一些问题',
                content:'co安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...n',
                ctime:'4-8',
                views:112,
                tags:'zc,xc,zxc'
            },
            
        ]
    }
})

