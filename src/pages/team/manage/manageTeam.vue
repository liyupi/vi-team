<template>
    <div id="manageTeam">
        <el-container>
            <el-header class="header-title">团队管理</el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="我创建的团队" name="teamCreate">
                        <el-row :gutter="20">
                            <el-col v-for="(team,index) in createTeamDetail" :key="index" class="teamCard">
                                <el-card :body-style="{ padding: '0px'}">
                                    <el-popover
                                        placement="top"
                                        title="简介"
                                        width="200"
                                        trigger="hover"
                                        :content="team.profile">
                                        <img :src="team.headPic" class="image pointer" @click="showUpdate(index)"
                                             slot="reference"/>
                                    </el-popover>
                                    <div class="teamInfo">
                                        <p>
                                            <span class="teamName">{{team.teamName}}</span>
                                            <el-tag size="mini" class="right teamType">{{team.type}}</el-tag>
                                        </p>
                                        <p class="bottom">
                                            <span class="nowDate">{{team.createDate}}</span>
                                            <span class="right">
                                    <span class="iconfont icon-people"></span>
                                    <span class="workerNum">1</span>
                                </span>
                                        </p>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-pagination
                            @current-change="changePage"
                            :current-page="currPage"
                            :page-size="6"
                            layout="total, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane name="create">
                        <span slot="label"><i class="el-icon-circle-plus-outline"></i> 创建团队</span>
                        <el-card :body-style="{ padding: '0px'}" id="createTeamRules">
                            <div>
                                <h1>创建团队须知</h1>
                                <p>（1）六六六六六六六六六六六六六六六</p>
                                <p>（2）六六六六六六六六六六六六六六六</p>
                                <p>（3）六六六六六六六六六六六六六六六</p>
                                <p>（4）六六六六六六六六六六六六六六六</p>
                                <p>（5）六六六六六六六六六六六六六六六</p>
                                <p>（6）六六六六六六六六六六六六六六六</p>
                            </div>
                            <el-checkbox v-model="agreeRules">我已阅读上述规则，并同意</el-checkbox>
                            <el-button @click="goCreate">创建团队</el-button>
                        </el-card>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
        <el-dialog title="创建团队" :visible.sync="createDialog" width="420px" @close="resetForm">
            <create-team @closeDialog="createDialog=false" ref="createDialog"></create-team>
        </el-dialog>
        <el-dialog title="修改团队信息" :visible.sync="updateDialog" width="420px" @close="resetStep">
            <update-team @closeDialog="updateDialog=false" :form="createTeamDetail[updateIndex]"
                         ref="updateDialog"></update-team>
        </el-dialog>
    </div>
</template>

<script>
    import CreateTeam from '@/components/team/createTeam'
    import UpdateTeam from '@/components/team/updateTeam'
    import {mapState} from 'vuex'

    export default {
        name: "manageTeam",
        data() {
            return {
                activeName: 'teamCreate',
                createDialog: false,
                updateDialog: false,
                currPage: 1,
                agreeRules: false,
                updateIndex: 0
            }
        },
        components: {CreateTeam, UpdateTeam},
        methods: {
            handleClick() {
                if (this.activeName === 'teamCreate') {
                    this.currPage = 1;
                    this.$store.dispatch("getCreateTeamDetail", this);
                }
            },
            changePage(page) {
                this.currPage = page;
                this.$store.dispatch("getCreateTeamDetail", this);
            },
            goCreate() {
                if (this.agreeRules == true) {
                    this.createDialog = true;
                } else {
                    this.$message("请先同意创建团队规则");
                }
            },
            showUpdate(index) {
                this.updateIndex = index;
                this.updateDialog = true;
            },
            resetForm() {
                this.$refs.createDialog.step = 1;
                this.$refs.createDialog.resetForm('form');
            },
            resetStep() {
                this.$refs.updateDialog.step = 1;
            }
        },
        computed: {
            ...mapState({
                createTeamDetail: state => state.teams.createTeamDetail,
                total: state => state.teams.total
            })
        },
        activated() {
            this.currPage = 1;
            this.activeName = "teamCreate";
            this.$store.dispatch("getCreateTeamDetail", this);
        }
    }
</script>

<style>
    .el-tabs__item:hover, .el-tabs__item.is-active {
        color: green;
    }

    .el-tabs__active-bar {
        background-color: green;
    }

    #createTeamRules {
        width: 320px;
        margin: 0 auto;
        margin-top: 30px;
        padding: 25px;
        text-align: center;
    }

    #createTeamRules h1 {
        font-size: 20px;
        margin-bottom: 20px;
    }

    #createTeamRules p {
        line-height: 2;
    }

    #createTeamRules .el-checkbox {
        padding-top: 25px;
        padding-bottom: 15px;
    }

    #createTeamRules .el-button {
        width: 200px;
        margin-top: 10px;
    }
</style>
