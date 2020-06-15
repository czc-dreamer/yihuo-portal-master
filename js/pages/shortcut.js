const shortcut = {
    template: "\
    <div class='py-container'> \
        <div class='shortcut'> \
            <ul class='fl'> \
               <li class='f-item'>欢迎您！</li> \
               <li class='f-item' v-if='user && user.username'>\
               <span style='color: red;'>{{user.username}}</span>\
               </li>\
               <li v-else class='f-item'> \
                   请<a href='javascript:void(0)' @click='gotoLogin'>登录</a>　 \
                   <span><a href='javascript:void(0)' @click='gotoRegister' target='_blank'>免费注册</a></span> \
               </li> \
           </ul> \
           <ul class='fr'> \
               <li class='f-item'>我的订单</li> \
               <li class='f-item space'></li> \
               <li class='f-item'><a href='javascript:void(0)' @click='gotoHome' target='_blank'>我的易货</a></li> \
               <li class='f-item space'></li> \
               <li class='f-item'>关注易货</li> \
           </ul> \
       </div> \
    </div>\
    ",
    name: "shortcut",
    data() {
        return {
            user: null
        }
    },
    created() {
        yh.http("/auth/verify").then(resp => {
                this.user = resp.data;
            })
    },
    methods: {
        gotoLogin() {
            window.location = "http://www.yihuo.com/login.html?returnUrl=" + window.location;
        },
        gotoRegister(){
            window.location = "http://www.yihuo.com/register.html";
        },
        gotoHome(){
            window.location = "http://www.yihuo.com/home.html";
        }
    }
}
export default shortcut;