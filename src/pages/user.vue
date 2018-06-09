<template>
    <div id="user">
        <el-container>
            <el-aside>
                <el-menu :default-active="path" :router="true" id="userMenu">
                    <el-menu-item-group>
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span> 个人</span>
                        </template>
                        <el-menu-item index="/user/info/view">信息查看</el-menu-item>
                        <el-menu-item index="/user/info/edit">信息修改</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">
                            <i class="el-icon-news"></i>
                            <span> 团队</span>
                        </template>
                        <el-menu-item index="/user/team/view">我的团队</el-menu-item>
                        <el-menu-item index="/user/team/info">团队通知</el-menu-item>
                        <el-menu-item index="/user/team/lib">知识库阅览</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span> 工作</span>
                        </template>
                        <el-menu-item index="/user/work/view">我的工作</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">
                            <i class="el-icon-edit"></i>
                            <span> 贡献</span>
                        </template>
                        <el-menu-item index="/user/commit/view">我的贡献</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">
                            <i class="el-icon-phone-outline"></i>
                            <span> 交流</span>
                        </template>
                        <el-menu-item index="/user/chat/public">历史发言</el-menu-item>
                        <el-menu-item index="/user/chat/private">查看私语</el-menu-item>
                    </el-menu-item-group>
                </el-menu>
            </el-aside>
            <el-main>
                <transition name="el-fade-in" mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "user",
        data() {
            return {}
        },
        computed: {
            path() {
                return this.$route.path;
            }
        }
    }
</script>

<style>
    /*导航栏样式*/
    #userMenu {
        width: 200px;
        min-height: 650px;
    }

    #userMenu .el-menu-item-group {
        margin-bottom: 15px;
    }

    #userMenu .el-menu-item-group__title {
        font-size: 16px !important;
        margin-bottom: 5px;
    }

    #userMenu .el-menu-item {
        font-size: 14px;
        padding-left: 41px !important;
        height: 36px;
        line-height: 36px;
    }

    #userMenu .el-menu-item:focus, #userMenu .el-menu-item:hover {
        background-color: transparent;
        color: green;
    }

</style>
