<template>
    <div>
        <el-container>
            <el-header class="header-title">我的团队</el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="我加入的团队" name="teamJoin">
                        <el-row :gutter="20">
                            <el-col v-for="(team,index) in joinTeam" :key="team.teamId"
                                    v-if="index>=(currPage-1)*6&&index<currPage*6" class="teamCard">
                                <el-card :body-style="{ padding: '0px'}">
                                    <el-popover
                                        placement="top"
                                        title="简介"
                                        width="200"
                                        trigger="hover"
                                        :content="team.profile">
                                        <img :src="team.headPic" class="image" slot="reference"/>
                                    </el-popover>
                                    <div class="teamInfo">
                                        <p>
                                            <span class="teamName">{{team.teamName}}</span>
                                            <el-tag size="mini" class="right teamType">{{team.type}}</el-tag>
                                        </p>
                                        <p class="bottom">
                                            <span class="nowDate">{{team.joinDate}}</span>
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
                    <el-tab-pane label="收到的邀请" name="myInvitation">
                        <el-table
                            :data="teamInvitation"
                            style="width: 100%">
                            <el-table-column
                                label="团队名"
                                prop="teamName">
                            </el-table-column>
                            <el-table-column
                                label="类别"
                                prop="type">
                            </el-table-column>
                            <el-table-column
                                label="邀请日期"
                                prop="inviteDate">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        @click="accept(scope.$index, teamInvitation)">接受
                                    </el-button>
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="reject(scope.$index, teamInvitation)">拒绝
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            @size-change="changeSize"
                            @current-change="changePage"
                            :current-page="currPage"
                            :page-sizes="[10, 20, 30]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="已申请" name="hasApply">
                        该功能暂未开放
                    </el-tab-pane>
                    <el-tab-pane name="applyJoin">
                        <span slot="label"><i class="el-icon-circle-plus-outline"></i> 加入团队</span>
                        该功能暂未开放
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "teamView",
        data() {
            return {
                activeName: 'teamJoin',
                currPage: 1,
                pageSize: 10
            };
        },
        methods: {
            handleClick(tab, event) {
                this.currPage = 1;
                this.pageSize = 10;
                if (this.activeName === 'teamJoin') {
                    this.currPage = 1;
                    this.$store.dispatch("getJoinTeam", this);
                } else if (this.activeName === 'myInvitation') {
                    this.$store.dispatch("getTeamInvitation", this);
                }
            },
            changePage(page) {
                this.currPage = page;
                this.$store.dispatch("getJoinTeam", this);
            },
            accept(index, rows) {
                this.$api.teamMemberApi.dealInvitation(this, index, rows, 1);
            },
            reject(index, rows) {
                this.$api.teamMemberApi.dealInvitation(this, index, rows, 2);
            },
            changePage(val) {
                this.currPage = val;
                if (this.activeName === 'teamJoin') {
                    this.$store.dispatch("getJoinTeam", this);
                } else if (this.activeName === 'myInvitation') {
                    this.$store.dispatch("getTeamInvitation", this);
                }
            },
            changeSize(val) {
                this.pageSize = val;
                if (this.activeName === 'teamJoin') {
                    this.$store.dispatch("getJoinTeam", this);
                } else if (this.activeName === 'myInvitation') {
                    this.$store.dispatch("getTeamInvitation", this);
                }
            }
        },
        computed: {
            ...mapState({
                joinTeam: state => state.teams.joinTeam,
                total: state => state.teams.total,
                teamInvitation: state => state.teams.teamInvitation
            })
        },
        activated() {
            this.currPage = 1;
            this.activeName = "teamJoin";
            this.$store.dispatch("getJoinTeam", this);
        }
    }
</script>

<style>

</style>
