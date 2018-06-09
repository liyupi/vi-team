<template>
    <div>
        <el-container>
            <el-header class="header-title">工作分配</el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="工作分配" name="workAssign">
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
                                        @click="assign(scope.$index, scope.row)">分配
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
                            :total="totalTeamMember">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="甘特图" name="gantt">
                        <highcharts :options="options"></highcharts>
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
                    <el-tab-pane name="selectWork">
                        <span slot="label">
                            <el-select v-model="activeWorkId" filterable placeholder="请选择要分配的工作" size="small"
                                       @change="selectWork">
                                <el-option
                                    v-for="work in workStatus0"
                                    :key="work.workId"
                                    :label="work.workName"
                                    :value="work.workId">
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
        name: "workAssign",
        data() {
            return {
                activeName: 'workAssign',
                currPage0: 1,
                pageSize0: 10,
                options: {
                    chart: {
                        type: 'xrange'
                    },
                    title: {
                        text: '简易甘特图'
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            week: '%Y/%m/%d'
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        categories: ['制作产品原型', '开发', '测试'],
                        reversed: true
                    },
                    tooltip: {
                        dateTimeLabelFormats: {
                            day: '%Y/%m/%d'
                        }
                    },
                    series: [{
                        name: '项目1',
                        // pointPadding: 0,
                        // groupPadding: 0,
                        borderColor: 'gray',
                        pointWidth: 20,
                        data: [{
                            x: Date.UTC(2014, 10, 21),
                            x2: Date.UTC(2014, 11, 2),
                            y: 0,
                            partialFill: 0.25
                        }, {
                            x: Date.UTC(2014, 11, 2),
                            x2: Date.UTC(2014, 11, 5),
                            y: 1
                        }, {
                            x: Date.UTC(2014, 11, 8),
                            x2: Date.UTC(2014, 11, 9),
                            y: 2
                        }, {
                            x: Date.UTC(2014, 11, 9),
                            x2: Date.UTC(2014, 11, 19),
                            y: 1
                        }, {
                            x: Date.UTC(2014, 11, 10),
                            x2: Date.UTC(2014, 11, 23),
                            y: 2
                        }],
                        dataLabels: {
                            enabled: true
                        }
                    }]
                }
            };
        },
        computed: {
            ...mapState({
                createTeam: state => state.teams.createTeam,
                teamMember: state => state.teams.teamMember,
                totalTeamMember: state => state.teams.totalTeamMember,
                workStatus0: state => state.works.workStatus0
            }),
            activeTeamId: {
                get() {
                    return this.$store.state.teams.activeTeamId;
                },
                set() {
                }
            },
            activeWorkId: {
                get() {
                    return this.$store.state.works.activeWorkId;
                },
                set() {
                }
            },
            activeWorkName() {
                return this.workStatus0.find((work) => {
                    return work.workId === this.activeWorkId;
                }).workName;
            }
        },
        methods: {
            handleClick(tab, event) {
            },
            assign(index, row) {
                this.$confirm('请确认是否要为 ' + row.username + ' 分配工作 ' + this.activeWorkName, '确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.$api.workApi.assignWork(this, row.userId);
                });
            },
            selectTeam(val) {
                this.$store.commit("setActiveTeamId", val);
                this.$store.dispatch("getWorkStatus0", this);
                this.$store.commit("setActiveWorkId", null);
                if (this.activeName === 'workAssign') {
                    this.$store.commit("setTeamMember", null);
                    this.$store.dispatch("getTeamMember", this);
                }
            },
            selectWork(val) {
                this.$store.commit("setActiveWorkId", val);
            },
            changePage(val) {
                this.currPage0 = val;
                this.$store.dispatch("getTeamMember", this);
            },
            changeSize(val) {
                this.pageSize0 = val;
                this.$store.dispatch("getTeamMember", this);
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

</style>
