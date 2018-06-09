<template>
    <div id="index">
        <el-carousel height="600px">
            <el-carousel-item v-for="(banner,index) in banners" :key="index">
                <img :src="banner"/>
            </el-carousel-item>
        </el-carousel>
        <el-row :gutter="30" id="cardWrapper">
            <el-col :span="8" v-for="card in cards" :key="card.title">
                <el-card shadow="hover">
                    <img :src="card.src">
                    <p class="title">{{card.title}}</p>
                    <p class="content">{{card.content}}</p>
                    <el-button @click.native="toPage(card.href)" class="toPage">立即使用</el-button>
                </el-card>
            </el-col>
        </el-row>
        <div id="sayingBar">
            <transition name="el-fade-in-linear" mode="out-in">
                <div v-for="(saying,index) in sayings" v-if="index === sayingActiveIndex" :key="index"
                     class="sayingItem">
                    <p class="content">{{ saying.content }}</p>
                    <p class="author">- {{ saying.author }}</p>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'index',
        data() {
            return {
                banners: [
                    require('../assets/banners/banner1.jpg')
                    , require("../assets/banners/banner2.jpg")
                    , require("../assets/banners/banner3.jpg")
                    , require("../assets/banners/banner4.jpg")
                ],
                sayings: [{
                    content: '"Individual commitment to a group effort - that is what makes a team work, a company work, a society work, a civilization work."',
                    author: 'Vince Lombardi'
                }, {
                    content: '"I am a member of a team, and I rely on the team, I defer to it and sacrifice for it, because the team, not the individual, is the ultimate champion."',
                    author: 'Mia Hamm'
                }, {
                    content: '"None of us is as smart as all of us."',
                    author: 'Ken Blanchard'
                }, {
                    content: '"A good job is a good thing."',
                    author: '《 The Analects of Wei Ling Gong 》'
                }],
                sayingActiveIndex: 0,
                cards: [{
                    src: require('../assets/cardIcons/visual.png'),
                    title: 'Visual',
                    content: '可视化团队管理，集员工调度、工作分配、通知下发于一体',
                    href: '/team/manage/team'
                }, {
                    src: require('../assets/cardIcons/viable.png'),
                    title: 'Viable',
                    content: '自行生产丰富的团队知识库，助力员工快速成长',
                    href: '/team/lib/view'
                }, {
                    src: require('../assets/cardIcons/vigorous.png'),
                    title: 'Vigorous',
                    content: '方便快捷的在线团队交流，打造一支充满活力的团队',
                    href: '/team/chat/public'
                }],
                dialogVisible: false
            }
        },
        methods: {
            toPage(href) {
                if (this.$store.state.hasLogin) {
                    this.$router.push({path: href});
                    window.scrollTo(0, 0);
                } else {
                    this.$emit("showDialog");
                }
            }
        },
        mounted() {
            setInterval(() => {
                if (this.sayingActiveIndex != this.sayings.length - 1) {
                    this.sayingActiveIndex++;
                } else {
                    this.sayingActiveIndex = 0;
                }
            }, 5000)
        }
    }
</script>
<style scoped>
    /*走马灯样式*/
    .el-carousel {
        overflow: hidden;
    }

    .el-carousel__item img {
        width: 100%;
        height: 100%;
    }

    /*名言轮播*/
    #sayingBar {
        height: 200px;
        background: #f5f5f5;
        text-align: center;
        padding: 80px 100px 0;
        font-style: italic;
        line-height: 1.5;
        font-weight: lighter;
    }

    #sayingBar .content {
        font-size: 26px;
        color: red;
        margin-bottom: 20px;
    }

    #sayingBar .author {
        font-size: 16px;
        color: #aaa;
    }

    .sayingItem {
        transition: all 1s ease-in-out;
    }

    /*特点卡片*/
    #cardWrapper {
        margin: 50px 0;
    }

    .el-card {
        text-align: center;
        padding: 20px;
    }

    #cardWrapper img {
        width: 96px;
        height: 96px;
    }

    #cardWrapper .title {
        font-size: 18px;
        font-weight: bold;
        margin-top: 30px;
        margin-bottom: 20px;
    }

    #cardWrapper .content {
        font-size: 14px;
        line-height: 1.5;
        letter-spacing: 1px;
        color: #aaa;
    }

    #cardWrapper .toPage {
        width: 100%;
        margin-top: 30px;
    }
</style>
