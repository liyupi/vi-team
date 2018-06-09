<template>
    <div>
        <el-container>
            <el-header class="header-title">人员管理</el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="团队人员" name="nowPerson">
                        <el-table
                            :data="teamMember"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="用户 ID">
                                            <span>{{ props.row.userId }}</span>
                                        </el-form-item>
                                        <el-form-item label="真实姓名">
                                            <span>{{ props.row.realname }}</span>
                                        </el-form-item>
                                        <el-form-item label="性别">
                                            <span>{{ props.row.sex }}</span>
                                        </el-form-item>
                                        <el-form-item label="年龄">
                                            <span>{{ props.row.age }}</span>
                                        </el-form-item>
                                        <el-form-item label="身份">
                                            <span>{{ props.row.identity }}</span>
                                        </el-form-item>
                                        <el-form-item label="电话">
                                            <span>{{ props.row.telnum }}</span>
                                        </el-form-item>
                                        <el-form-item label="加入日期">
                                            <span>{{ props.row.joinDate }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="用户名"
                                prop="username">
                            </el-table-column>
                            <el-table-column
                                label="职位"
                                prop="position">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">调度
                                    </el-button>
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
                            :current-page="currPage"
                            :page-sizes="[10, 20, 30]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="已邀请" name="willJoin">
                        <el-table
                            :data="willJoinMember"
                            style="width: 100%">
                            <el-table-column
                                label="用户 ID"
                                prop="userId">
                            </el-table-column>
                            <el-table-column
                                label="用户名"
                                prop="username">
                            </el-table-column>
                            <el-table-column
                                label="电话"
                                prop="telnum">
                            </el-table-column>
                            <el-table-column
                                label="身份"
                                prop="identity">
                            </el-table-column>
                            <el-table-column
                                label="邀请日期"
                                prop="inviteDate">
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
                    <el-tab-pane label="申请加入" name="applyJoin">
                        该功能暂未开放
                    </el-tab-pane>
                    <el-tab-pane label="可视化管理" name="visualManage">该功能暂未开放</el-tab-pane>
                    <el-tab-pane name="invitePerson">
                        <span slot="label"><i class="el-icon-circle-plus-outline"></i> 邀请新人</span>
                        <div id="invitePage">
                            <el-input placeholder="请输入要邀请的用户ID" v-model="inviteId" class="input-with-select"
                                      @keyup.enter.native="searchUser">
                                <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                            </el-input>
                            <el-card class="userCard" v-if="user">
                                <div slot="header" class="clearfix">
                                    <span>用户信息</span>
                                    <el-button style="float: right; padding: 3px 0" type="text" @click="invite">邀请
                                    </el-button>
                                </div>
                                <div class="userInfo">
                                    <p>用户ID：{{user.userId}}</p>
                                    <p>用户名：{{user.username}}</p>
                                    <p>姓名：{{user.realname}}</p>
                                    <p>性别：{{user.sex}}</p>
                                    <p>年龄：{{user.age}}</p>
                                    <p>身份：{{user.identity}}</p>
                                    <p>电话：{{user.telnum}}</p>
                                </div>
                            </el-card>
                        </div>
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
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "managePerson",
        data() {
            return {
                activeName: 'nowPerson',
                inviteId: '',
                user: null,
                currPage: 1,
                pageSize:10
            };
        },
        computed: {
            ...mapState({
                createTeam: state => state.teams.createTeam,
                teamMember: state => state.teams.teamMember,
                total: state => state.teams.total
            }),
            activeTeamId: {
                get() {
                    return this.$store.state.teams.activeTeamId;
                },
                set() {
                }
            }
        },
        methods: {
            handleClick(tab, event) {
                this.currPage = 1;
                this.pageSize = 10;
                if (this.activeName == 'nowPerson') {
                    this.$store.commit("setTeamMember", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getTeamMember", this);
                    }
                } else if (this.activeName == 'willJoin') {
                    this.$store.commit("setWillJoinMember", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getWillJoinMember", this);
                    }
                }
            },
            handleEdit(index, row) {
                this.$prompt('请输入为该人员分配的职位', '修改职位', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^.{1,10}$/,
                    inputErrorMessage: '职位长度不能大于10位'
                }).then(({value}) => {
                    this.$api.teamMemberApi.updateTeamMember(this, {row: row, position: value});
                }).catch(() => {

                });
            },
            handleDelete(index, row) {
                this.$api.teamMemberApi.deleteTeamMember(this, row);
            },
            searchUser() {
                this.user = null;
                this.$api.userApi.searchUser(this);
            },
            invite() {
                this.$api.teamMemberApi.addTeamMember(this);
            },
            selectTeam(val) {
                this.$store.commit("setActiveTeamId", val);
                this.currPage = 1;
                this.pageSize = 10;
                if (this.activeName === 'nowPerson') {
                    this.$store.commit("setTeamMember", null);
                    this.$store.dispatch("getTeamMember", this);
                } else if (this.activeName === 'willJoin') {
                    this.$store.commit("setWillJoinMember", null);
                    this.$store.dispatch("getWillJoinMember", this);
                }
            },
            changePage(val) {
                this.currPage = val;
                if (this.activeName === 'nowPerson') {
                    this.$store.commit("setTeamMember", null);
                    this.$store.dispatch("getTeamMember", this);
                } else if (this.activeName === 'willJoin') {
                    this.$store.commit("setWillJoinMember", null);
                    this.$store.dispatch("getWillJoinMember", this);
                }
            },
            changeSize(val) {
                this.pageSize = val;
                if (this.activeName === 'nowPerson') {
                    this.$store.commit("setTeamMember", null);
                    this.$store.dispatch("getTeamMember", this);
                } else if (this.activeName === 'willJoin') {
                    this.$store.commit("setWillJoinMember", null);
                    this.$store.dispatch("getWillJoinMember", this);
                }
            }
        },
        activated() {
            if (!this.createTeam) {
                this.$store.dispatch("getCreateTeam", this);
            }
        }
    }
</script>

<style>

    #invitePage {
        width: 400px;
        margin: 0 auto;
        margin-top: 50px;
    }

    #invitePage .userCard {
        margin-top: 30px;
    }

    #invitePage .userInfo > p {
        font-size: 14px;
        color: #6f7180;
        padding: 10px;
    }

</style>
