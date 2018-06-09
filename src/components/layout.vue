<template>
    <div id="wrapper">
        <el-container>
            <el-header height="80px">
                <router-link :to="{path:'/'}"><img src="../assets/vi.png" id="logo"></router-link>
                <el-menu :default-active="path" mode="horizontal" @select="handleSelect" id="navbar">
                    <el-menu-item index="/" class="el-item-index">主页</el-menu-item>
                    <el-submenu index="team" popper-class="el-submenu1">
                        <template slot="title">团队</template>
                        <el-menu-item index="/team/manage/team">管理</el-menu-item>
                        <el-menu-item index="/team/work/manage">工作</el-menu-item>
                        <el-menu-item index="/team/lib/manage">知识库</el-menu-item>
                        <el-menu-item index="/team/info/manage">通知</el-menu-item>
                        <el-menu-item index="/team/chat/public">交流</el-menu-item>
                    </el-submenu>
                    <el-submenu index="user" v-if="hasLogin" popper-class="el-submenu2">
                        <template slot="title">{{ username }}</template>
                        <el-menu-item index="/user/info/view">个人</el-menu-item>
                        <el-menu-item index="/user/team/view">团队</el-menu-item>
                        <el-menu-item index="/user/work/view">工作</el-menu-item>
                        <el-menu-item index="/user/commit/view">贡献</el-menu-item>
                        <el-menu-item index="/user/chat/public">交流</el-menu-item>
                        <el-menu-item index="logout" id="logout">注销</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="login" v-if="!hasLogin">登录</el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <transition name="el-fade-in-linear" mode="out-in">
                    <keep-alive include="index">
                        <router-view @showDialog="showDialog=true"></router-view>
                    </keep-alive>
                </transition>
            </el-main>
        </el-container>
        <el-footer height="350px">
            <div id="footerRowWrapper">
                <el-row :gutter="20">
                    <el-col :span="3" :offset="1">
                        <h1 class="footer-title">链接</h1>
                        <template v-for="link in links">
                            <a :href="link.href" class="footer-link">
                                <p>{{ link.name }}</p>
                            </a>
                        </template>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        <h1 class="footer-title">社区</h1>
                        <template v-for="community in communities">
                            <a :href="community.href" class="footer-link">
                                <p>{{ community.name }}</p>
                            </a>
                        </template>
                    </el-col>
                    <el-col :span="5" :offset="9">
                        <h1 class="footer-title">Vi-Team</h1>
                        <template v-for="icon in icons">
                            <el-popover placement="bottom" trigger="hover">
                                <img :src="icon.code"/>
                                <span class="footer-link" slot="reference">
                                    <img :src="icon.src"/>
                                </span>
                            </el-popover>
                        </template>
                    </el-col>
                </el-row>
            </div>
        </el-footer>
        <el-button type="primary" icon="el-icon-arrow-up" circle id="top" @click.native="toTop"></el-button>
        <!--登录、注册、修改密码-->
        <el-dialog :title="dialogName[dialogIndex]" :visible.sync="showDialog" width="407px">
            <transition name="fade" mode="out-in">
                <login v-if="dialogIndex === 0" @switchDialog="switchDialog" @closeDialog="showDialog=false"></login>
                <register v-if="dialogIndex === 1" @switchDialog="switchDialog"></register>
                <change-password v-if="dialogIndex === 2" @switchDialog="switchDialog"></change-password>
            </transition>
        </el-dialog>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {mapState} from 'vuex'
    import Login from '@/components/login'
    import Register from '@/components/register'
    import ChangePassword from '@/components/changePassword'


    export default {
        data() {
            return {
                showDialog: false,
                dialogIndex: 0,
                dialogName: ["用户登录", "用户注册", "修改密码"],
                links: [{
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }],
                communities: [{
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }, {
                    name: "东华大学",
                    href: "http://www.dhu.edu.cn"
                }],
                icons: [{
                    src: require("../assets/icons/qq.png"),
                    code: require("../assets/codes/qq_code.jpg")
                }, {
                    src: require("../assets/icons/wechat.png"),
                    code: require("../assets/codes/wechat_code.jpg")
                }, {
                    src: require("../assets/icons/alipay.png"),
                    code: require("../assets/codes/alipay_code.jpg")
                }]
            }
        },
        computed: {
            ...mapState(['hasLogin', 'username', 'userId']),
            path() {
                return this.$route.path;
            }
        },
        components: {
            Login, Register, ChangePassword
        },
        methods: {
            toTop() {
                $("html,body").animate({scrollTop: 0}, 500);
            },
            handleSelect(key, keyPath) {
                if (key === 'login') {//登录选项
                    this.dialogIndex = 0;
                    this.showDialog = true;
                } else if (key === 'logout') {//注销选项
                    this.$api.userApi.userLogout(this);
                } else {
                    if (this.hasLogin == true) {
                        this.$router.push({path: key});
                    } else {
                        if (key != '/') {
                            this.showDialog = true;
                        }
                    }
                }
            },
            switchDialog(dialogIndex) {
                this.dialogIndex = dialogIndex;
            }
        },
        created() {
            let userId = this.$cookie.get('userId');
            let username = this.$cookie.get('username');
            let token = this.$cookie.get('token');
            if (userId && username && token) {
                this.$store.commit('setUserId', userId);
                this.$store.commit('setHasLogin', true);
                this.$store.commit('setUsername', username);
            }
        },
        mounted() {
            window.addEventListener("scroll", () => {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var top = document.getElementById("top");
                if (scrollTop >= 300) {
                    top.style.opacity = 1;
                } else {
                    top.style.opacity = 0;
                }
            })
        }
    }
</script>

<style>
    #wrapper {
        margin-top: 20px;
    }

    .el-container {
        max-width: 1140px;
        margin: 0 auto;
    }

    /*所有子页面header标题*/
    .header-title {
        font-size: 20px;
    }

    #logo {
        width: 250px;
        height: 60px;
    }

    #navbar {
        float: right;
    }

    /* 导航栏样式 */
    .el-menu--horizontal {
        border: none;
    }

    .el-submenu__title, .el-menu-item {
        font-size: 20px;
    }

    .el-submenu__icon-arrow {
        font-size: 18px;
    }

    .el-menu--popup .el-menu-item {
        font-size: 16px;
    }

    /*底边框*/
    .el-menu--horizontal > .is-active, .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
        color: green;
        border-color: green !important;
    }

    .el-item-index {
        padding: 0 32px;
    }

    .el-submenu1 > ul, .el-submenu2 > ul {
        min-width: 80px !important;
        text-align: center;
    }

    .el-submenu2 > ul {
        margin-left: 15px;
    }

    /*悬浮、激活样式*/
    .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
        color: green;
    }

    .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu__title.is-active {
        color: green !important;
    }

    #logout {
        color: brown;
    }

    #logout:hover {
        color: red;
    }

    /*底部样式*/
    .el-footer {
        padding-top: 40px;
        padding-bottom: 10px;
        background: #f7fbfd;
    }

    #footerRowWrapper {
        max-width: 1140px;
        height: 100%;
        margin: 0 auto;
    }

    .footer-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #333;
    }

    .footer-link:hover > p {
        color: #000;
    }

    .footer-link > p {
        line-height: 2;
        font-size: 14px;
        color: #666;
    }

    .footer-link > img {
        width: 36px;
        height: 36px;
        margin-top: 5px;
        margin-right: 15px;
        cursor: pointer;
    }

    /*top按钮*/
    #top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        transition: opacity 0.5s ease-in-out;
        opacity: 0;
    }

    /*弹出框动画*/
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s ease-in-out;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0;
    }

    /*卡片样式*/
    .teamCard {
        width: 240px;
        margin: 0 auto;
        margin-top: 30px;
    }

    .teamCard .image {
        width: 100%;
        height: 218px;
        display: block;
    }

    .teamCard .pointer {
        cursor: pointer;
    }

    .teamCard .teamInfo {
        padding: 10px;
    }

    .teamCard .teamName {
        font-size: 16px;
    }

    .teamCard .teamType {
        line-height: 18px;
    }

    .teamCard .right {
        float: right;
        margin-top: -1px;
    }

    .teamCard .icon-people {
        vertical-align: text-bottom;
    }

    .teamCard .workerNum {
        font-size: 14px;
    }

    .teamCard .bottom {
        margin-top: 10px;
        color: grey;
    }

    .teamCard .nowDate {
        font-size: 12px;
    }

    .el-pagination {
        text-align: center;
        margin-top: 40px;
    }

    /*表格扩展样式*/
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 100px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

</style>
