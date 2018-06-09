<template>
    <div id="commitView">
        <el-container>
            <el-header class="header-title">我的贡献</el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="查看我的贡献" name="viewCommit">
                        <el-table
                            @row-click="showContent"
                            :data="myCommits"
                            style="width: 100%">
                            <el-table-column
                                label="标题"
                                prop="title">
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
                                        @click="handleDelete(scope.$index, myCommits)">删除
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
                    <el-tab-pane name="commit">
                        <span slot="label"><i class="el-icon-circle-plus-outline"></i> 贡献知识</span>
                        <el-form :model="form" ref="form" label-width="80px" label-position="left" id="form">
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="form.title"></el-input>
                            </el-form-item>
                            <quill-editor v-model="form.content"></quill-editor>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" id="submit">提交</el-button>
                                <el-button @click="resetForm('form')" class="prev">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane name="selectTeam">
                        <span slot="label">
                            <el-select filterable v-model="activeTeamId" placeholder="请选择团队" size="small"
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
                            <el-select filterable v-model="activeLibId" placeholder="请选择知识库" size="small"
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
        name: "commitView",
        data() {
            return {
                activeName: 'viewCommit',
                currPage0: 1,
                pageSize0: 10,
                showContentDialog: false,
                showCommit: {},
                createCommit: {},
                form: {
                    title: '',
                    content: ''
                },
                newForm: {}
            };
        },
        computed: {
            ...mapState({
                joinTeam: state => state.teams.joinTeam,
                myCommits: state => state.commits.myCommits,
                libStatus0: state => state.libs.libStatus0,
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
                if (this.activeName === 'viewCommit') {
                    if (this.activeLibId) {
                        this.$store.commit("setMyCommits", null);
                        this.$store.dispatch("getMyCommits", this);
                    }
                }
            },
            handleDelete(index, rows) {
                this.$api.commitApi.deleteCommit(this, index, rows);
            },
            showContent(row, event, column) {
                this.showCommit = {};
                this.$api.commitApi.getCommitById(this, row);
            },
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$api.commitApi.addCommit(this);
                    } else {

                    }
                });
            },
            resetForm(formName) {
                this.form = _.assign({}, this.newForm);
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
                if (this.activeName === 'viewCommit') {
                    this.$store.commit("setMyCommits", null);
                    this.$store.dispatch("getMyCommits", this);
                }
            },
            changePage(val) {
                this.currPage0 = val;
                this.$store.dispatch("getMyCommits", this);
            },
            changeSize(val) {
                this.pageSize0 = val;
                this.$store.dispatch("getMyCommits", this);
            }
        },
        activated() {
            if (!this.joinTeam) {
                this.$store.dispatch("getJoinTeamList", this);
            } else {
                if (this.activeTeamId) {
                    this.$store.commit("setLibStatus0", null);
                    this.$store.dispatch("getLibStatus0", this);
                }
            }
        }
    }
</script>

<style>

    #commitView #form {
        margin-top: 25px;
    }

    #commitView #submit {
        width: 100px;
        margin-top: 25px;
    }

    #commitView .ql-container {
        min-height: 300px;
    }

    #commitView .el-table__row {
        cursor: pointer;
    }
</style>
