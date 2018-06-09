<template>
    <div>
        <el-container id="libCommit">
            <el-header class="header-title">贡献</el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="成员贡献记录" name="historyCommit">
                        <el-table
                            :data="libCommits"
                            @row-click="showContent"
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
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除
                                    </el-button>
                                </template>
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
                    <el-tab-pane name="selectTeam">
                        <span slot="label">
                            <el-select v-model="activeTeamId" filterable placeholder="请选择团队" size="small"
                                       @change="selectTeam">
                                <el-option
                                    v-for="team in createTeam"
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
        name: "libCommit",
        data() {
            return {
                activeName: 'historyCommit',
                currPage0: 1,
                pageSize0: 10,
                showContentDialog: false,
                showCommit: {}
            };
        },
        computed: {
            ...mapState({
                createTeam: state => state.teams.createTeam,
                libStatus0: state => state.libs.libStatus0,
                libCommits: state => state.commits.libCommits,
                total: state => state.commits.total
            }),
            activeTeamId: {
                get() {
                    return this.$store.state.teams.activeTeamId;
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

            },
            handleDelete(index, row) {

            },
            showContent(row, event, column) {
                this.showCommit = {};
                this.$api.commitApi.getCommitById(this, row);
            },
            selectTeam(val) {
                this.$store.commit("setActiveTeamId", val);
                this.$store.dispatch("getLibStatus0", this);
            },
            selectLib(val) {
                this.currPage0 = 1;
                this.pageSize0 = 10;
                this.$store.commit("setActiveLibId", val);
                this.$store.dispatch("getLibCommits", this);
            },
            changePage(val) {
                this.currPage0 = val;
                this.$store.dispatch("getLibCommits", this);
            },
            changeSize(val) {
                this.pageSize0 = val;
                this.$store.dispatch("getLibCommits", this);
            }
        },
        activated() {
            if (!this.createTeam) {
                this.$store.dispatch("getCreateTeam", this);
            } else {
                if (this.activeTeamId) {
                    this.$store.dispatch("getLibStatus0", this);
                }
            }

        }
    }
</script>

<style>
    #libCommit .el-table__row {
        cursor: pointer;
    }
</style>
