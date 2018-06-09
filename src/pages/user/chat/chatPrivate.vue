<template>
    <div>
        <el-container>
            <el-header class="header-title">查看私语</el-header>
            <el-main>
                该功能暂未开放
                <!--<el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="我发送的私语" name="mySend">我发送的私语</el-tab-pane>
                    <el-tab-pane label="收到的私语" name="myReceive">我收到的私语</el-tab-pane>
                    <el-tab-pane name="selectTeam">
                        <span slot="label">
                            <el-select filterable v-model="activeJoinId" placeholder="请选择团队" size="small" @change="selectTeam">
                                <el-option
                                    v-for="team in joinTeam"
                                    :key="team.teamId"
                                    :label="team.teamName"
                                    :value="team.teamId">
                                </el-option>
                            </el-select>
                        </span>
                    </el-tab-pane>

                </el-tabs>-->
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "chatPrivate",
        data() {
            return {
                activeName: 'mySend'
            };
        },
        computed: {
            ...mapState({
                joinTeam: state => state.teams.joinTeam
            }),
            activeJoinId: {
                get() {
                    return this.$store.state.teams.activeJoinId;
                },
                set() {
                }
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            selectTeam(val) {
                this.$store.commit("setActiveJoinId", val);
            }
        },
        activated() {
            if (!this.joinTeam) {
                this.$store.dispatch("getJoinTeam", this);
            }
        }
    }
</script>

<style>

</style>
