<template>
    <div id="team">
        <el-container>
            <el-aside>
                <el-menu :default-active="path" :router="true" id="teamMenu">
                    <el-menu-item-group>
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span> 管理</span>
                        </template>
                        <el-menu-item index="/team/manage/team">团队管理</el-menu-item>
                        <el-menu-item index="/team/manage/person">人员管理</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span> 工作</span>
                        </template>
                        <el-menu-item index="/team/work/manage">工作管理</el-menu-item>
                        <el-menu-item index="/team/work/assign">工作分配</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">
                            <i class="el-icon-edit"></i>
                            <span> 知识库</span>
                        </template>
                        <el-menu-item index="/team/lib/manage">知识库管理</el-menu-item>
                        <el-menu-item index="/team/lib/commit">贡献</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">
                            <i class="el-icon-message"></i>
                            <span> 通知</span>
                        </template>
                        <el-menu-item index="/team/info/manage">通知管理</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">
                            <i class="el-icon-phone-outline"></i>
                            <span> 交流</span>
                        </template>
                        <el-menu-item index="/team/chat/public">大厅</el-menu-item>
                        <el-menu-item index="/team/chat/private">私语</el-menu-item>
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
        name: "team",
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
    #teamMenu {
        width: 200px;
        min-height: 650px;
    }

    #teamMenu .el-menu-item-group {
        margin-bottom: 15px;
    }

    #teamMenu .el-menu-item-group__title {
        font-size: 16px !important;
        margin-bottom: 5px;
    }

    #teamMenu .el-menu-item {
        font-size: 14px;
        padding-left: 41px !important;
        height: 36px;
        line-height: 36px;
    }

    #teamMenu .el-menu-item:focus, #teamMenu .el-menu-item:hover {
        background-color: transparent;
        color: green;
    }

</style>
