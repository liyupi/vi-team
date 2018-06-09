<template>
    <div>
        <el-container>
            <el-header class="header-title">我的工作</el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="进行中" name="status1">
                        <el-table
                            :data="workStatus1"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="工作详情">
                                            <span>{{ props.row.workDetail }}</span>
                                        </el-form-item>
                                        <el-form-item label="计划开始时间">
                                            <span>{{ props.row.planStartDate }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="工作"
                                prop="workName">
                            </el-table-column>
                            <el-table-column
                                label="负责人"
                                prop="username">
                            </el-table-column>
                            <el-table-column
                                label="开始日期"
                                prop="startDate">
                            </el-table-column>
                            <el-table-column
                                label="计划截至日期"
                                prop="endDate">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="finish(scope.$index, workStatus1)">完成</el-button>
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
                    <el-tab-pane label="已完成" name="status2">
                        <el-table
                            :data="workStatus2"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="工作详情">
                                            <span>{{ props.row.workDetail }}</span>
                                        </el-form-item>
                                        <el-form-item label="计划开始时间">
                                            <span>{{ props.row.planStartDate }}</span>
                                        </el-form-item>
                                        <el-form-item label="计划截止时间">
                                            <span>{{ props.row.endDate }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="工作"
                                prop="workName">
                            </el-table-column>
                            <el-table-column
                                label="负责人"
                                prop="username">
                            </el-table-column>
                            <el-table-column
                                label="开始时间"
                                prop="startDate">
                            </el-table-column>
                            <el-table-column
                                label="完成时间"
                                prop="finishDate">
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
                    <el-tab-pane label="已超时" name="timeout">
                        <el-table
                            :data="workTimeout"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="工作详情">
                                            <span>{{ props.row.workDetail }}</span>
                                        </el-form-item>
                                        <el-form-item label="计划开始时间">
                                            <span>{{ props.row.planStartDate }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="工作"
                                prop="workName">
                            </el-table-column>
                            <el-table-column
                                label="负责人"
                                prop="username">
                            </el-table-column>
                            <el-table-column
                                label="开始时间"
                                prop="startDate">
                            </el-table-column>
                            <el-table-column
                                label="计划截至时间"
                                prop="endDate">
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
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "workView",
        data() {
            return {
                activeName: 'status1',
                currPage: 1,
                pageSize: 10
            };
        },
        computed: {
            ...mapState({
                joinTeam: state => state.teams.joinTeam,
                workStatus1: state => state.works.workStatus1,
                workStatus2: state => state.works.workStatus2,
                workTimeout: state => state.works.workTimeout,
                userId: state => state.userId,
                total: state => state.works.total
            }),
            activeTeamId: {
                get() {
                    return this.$store.state.teams.activeJoinId;
                },
                set() {
                }
            }
        },
        methods: {
            handleClick(tab, event) {
                this.currPage = 1;
                this.pageSize = 10;
                if (this.activeName === 'status1') {
                    this.$store.commit("setWorkStatus1", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getWorkStatus1", {obj: this, workerId: this.userId});
                    }
                } else if (this.activeName === 'status2') {
                    this.$store.commit("setWorkStatus2", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getWorkStatus2", {obj: this, workerId: this.userId});
                    }
                } else if (this.activeName === 'timeout') {
                    this.$store.commit("setWorkTimeout", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getWorkTimeout", {obj: this, workerId: this.userId});
                    }
                }
            },
            finish(index, rows) {
                this.$api.workApi.updateWorkStatus(this, index, rows, 2);
            },
            selectTeam(val) {
                this.$store.commit("setActiveJoinId", val);
                this.currPage = 1;
                this.pageSize = 10;
                if (this.activeName === 'status1') {
                    this.$store.commit("setWorkStatus1", null);
                    this.$store.dispatch("getWorkStatus1", {obj: this, workerId: this.userId});
                } else if (this.activeName === 'status2') {
                    this.$store.commit("setWorkStatus2", null);
                    this.$store.dispatch("getWorkStatus2", {obj: this, workerId: this.userId});
                } else if (this.activeName === 'timeout') {
                    this.$store.commit("setWorkTimeout", null);
                    this.$store.dispatch("getWorkTimeout", {obj: this, workerId: this.userId});
                }
            },
            changePage(val) {
                this.currPage = val;
                if (this.activeName === 'status1') {
                    this.$store.commit("setWorkStatus1", null);
                    this.$store.dispatch("getWorkStatus1", {obj: this, workerId: this.userId});
                } else if (this.activeName === 'status2') {
                    this.$store.commit("setWorkStatus2", null);
                    this.$store.dispatch("getWorkStatus2", {obj: this, workerId: this.userId});
                } else if (this.activeName === 'timeout') {
                    this.$store.commit("setWorkTimeout", null);
                    this.$store.dispatch("getWorkTimeout", {obj: this, workerId: this.userId});
                }
            },
            changeSize(val) {
                this.pageSize = val;
                if (this.activeName === 'status1') {
                    this.$store.commit("setWorkStatus1", null);
                    this.$store.dispatch("getWorkStatus1", {obj: this, workerId: this.userId});
                } else if (this.activeName === 'status2') {
                    this.$store.commit("setWorkStatus2", null);
                    this.$store.dispatch("getWorkStatus2", {obj: this, workerId: this.userId});
                } else if (this.activeName === 'timeout') {
                    this.$store.commit("setWorkTimeout", null);
                    this.$store.dispatch("getWorkTimeout", {obj: this, workerId: this.userId});
                }
            }
        },
        activated() {
            if (!this.joinTeam) {
                this.$store.dispatch("getJoinTeamList", this);
            } else {
                if (this.activeName === 'status1') {
                    this.$store.commit("setWorkStatus1", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getWorkStatus1", {obj: this, workerId: this.userId});
                    }
                } else if (this.activeName === 'status2') {
                    this.$store.commit("setWorkStatus2", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getWorkStatus2", {obj: this, workerId: this.userId});
                    }
                } else if (this.activeName === 'timeout') {
                    this.$store.commit("setWorkTimeout", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getWorkTimeout", {obj: this, workerId: this.userId});
                    }
                }
            }
        }
    }
</script>

<style>

</style>
