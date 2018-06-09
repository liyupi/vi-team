<template>
    <div>
        <el-container id="teamLib">
            <el-header class="header-title">知识库阅览</el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="查看知识" name="status0">
                        <el-table
                            @row-click="showContent"
                            :data="libCommits"
                            style="width: 100%">
                            <el-table-column
                                label="标题"
                                prop="title">
                            </el-table-column>
                            <el-table-column
                                label="贡献者"
                                prop="username">
                            </el-table-column>
                            <el-table-column
                                label="贡献时间"
                                prop="commitTime">
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            @size-change="changeSize"
                            @current-change="changePage"
                            :current-page="currPage0"
                            :page-sizes="[10, 20, 30]"
                            :page-size="pageSize0"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="知识库信息" name="libInfo">
                        <el-card class="box-card" v-if="libInfo">
                            <div slot="header" class="clearfix">
                                <span><i class="iconfont icon-book" style="vertical-align: middle;"></i> {{libInfo.libName}}</span>
                                <span style="float: right;font-size: 14px;">创建时间：{{libInfo.createDate}}</span>
                            </div>
                            <div>
                                <span style="font-size: 15px;">简介</span>
                                <p style="font-size: 14px;line-height: 1.5;margin-top: 10px;">{{libInfo.libProfile}}</p>
                            </div>
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane name="selectTeam">
                        <span slot="label">
                            <el-select v-model="activeTeamId" filterable placeholder="请选择团队" size="small"
                                       @change="selectTeam">
                                <el-option
                                    v-for="team in joinTeam"
                                    :key="team.teamId"
                                    :label="team.teamName"
                                    :value="team.teamId">
                                </el-option>
                            </el-select>
                        </span>
                    </el-tab-pane>
                    <el-tab-pane name="selectLib">
                        <span slot="label">
                            <el-select v-model="activeLibId" filterable placeholder="请选择知识库" size="small"
                                       @change="selectLib">
                                <el-option
                                    v-for="lib in libStatus0"
                                    :key="lib.libId"
                                    :label="lib.libName"
                                    :value="lib.libId">
                                </el-option>
                            </el-select>
                        </span>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
        <el-dialog :title="showCommit.title" :visible.sync="showContentDialog" :fullscreen="true">
            <div class="ql-container ql-snow">
                <div class="ql-editor" v-html="showCommit.content"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "teamLib",
        data() {
            return {
                activeName: 'status0',
                currPage0: 1,
                pageSize0: 10,
                libInfo: '',
                showContentDialog: false,
                showCommit: {}
            };
        },
        computed: {
            ...mapState({
                joinTeam: state => state.teams.joinTeam,
                libStatus0: state => state.libs.libStatus0,
                libCommits: state => state.commits.libCommits,
                total: state => state.commits.total
            }),
            activeTeamId: {
                get() {
                    return this.$store.state.teams.activeJoinId;
                },
                set() {
                }
            },
            activeLibId: {
                get() {
                    return this.$store.state.libs.activeLibId;
                },
                set() {

                }
            }
        },
        methods: {
            handleClick(tab, event) {
                this.currPage0 = 1;
                this.pageSize0 = 10;
                if (this.activeName === 'status0') {
                    this.$store.commit("setLibCommits", null);
                    if (this.activeLibId) {
                        this.$store.dispatch("getLibCommits", this);
                    }
                } else if (this.activeName === 'libInfo') {
                    if (this.activeLibId) {
                        this.$api.libApi.getLibByLibId(this);
                    }
                }
            },
            showContent(row, event, column) {
                this.showCommit = {};
                this.$api.commitApi.getCommitById(this, row);
            },
            selectTeam(val) {
                this.$store.commit("setActiveJoinId", val);
                this.$store.dispatch("getLibStatus0", this);
                this.$store.commit("setActiveLibId", null);
            },
            selectLib(val) {
                this.$store.commit("setActiveLibId", val);
                this.currPage0 = 1;
                this.pageSize0 = 10;
                if (this.activeName === 'status0') {
                    this.$store.commit("setLibCommits", null);
                    this.$store.dispatch("getLibCommits", this);
                } else if (this.activeName === 'libInfo') {
                    this.libInfo = null;
                    this.$api.libApi.getLibByLibId(this);
                }
            },
            changePage(val) {
                this.currPage0 = val;
                if (this.activeName === 'status0') {
                    this.$store.commit("setLibCommits", null);
                    this.$store.dispatch("getLibCommits", this);
                }
            },
            changeSize(val) {
                this.pageSize0 = val;
                if (this.activeName === 'status0') {
                    this.$store.commit("setLibCommits", null);
                    this.$store.dispatch("getLibCommits", this);
                }
            }
        },
        activated() {
            if (!this.joinTeam) {
                this.$store.dispatch("getJoinTeamList", this);
            } else {
                if (this.activeTeamId) {
                    this.$store.commit("setLibCommits", null);
                    this.$store.commit("setActiveLibId", null);
                    this.$store.commit("setLibStatus0", null);
                    this.$store.dispatch("getLibStatus0", this);
                }
            }
        }
    }
</script>

<style>
    #teamLib .el-table__row {
        cursor: pointer;
    }
</style>
