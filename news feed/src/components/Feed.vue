<template>
    <div>
        <div class="shapka">
            <span class="logo">SNC</span>
            <div class="user+logout">
                <span class="user_name">User99</span>
                <router-link :to="{name: 'auth'}">
                    <button class="log_out">LOG OUT</button>
                </router-link>
            </div>
        </div>

        <div class="main">

            <div class="people">

                <div class="friend_list">
                    <div class="friend-text">
				        <span class="menu_text">Friends</span>
                    </div>
                    <div class="fr_menu">
                        <friend v-for="(friend, index) in friends" :name="friend" @removeFriend="removeFriend(index)" :key="index"></friend>
                    </div>
                </div>
                <div class="umk_list">
                    <div class="umk-text">
                        <span class="menu_text">Possible friends</span>
                    </div>
                    <div class="umk_menu">
                        <possible-friend v-for="(friend, index) in possibleFriends" :name="friend" @addFriend="addFriend(index)" :key="index"></possible-friend>
                    </div>
                </div>

            </div>

            <div class="news">

                <div class="news-text">
                    <div>
                        <button class="add-post-btn">ADD POST</button>
                    </div>
                    <div>
					    <span>News</span>
                    </div>
                    <div>
                        <button class="refresh-btn" @click="refreshPosts">REFRESH</button>
                    </div>
                </div>

                <div class="news_menu">
                    <post v-for="(post,index) in posts" :post="post" :key="index"></post>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import Friend from './elements/Friend.vue'
    import PossibleFriend from './elements/PossibleFriend.vue'
    import Post from './elements/Post.vue'

    export default {
        components: {
            Friend,
            PossibleFriend,
            Post
        },
        data () {
            return {
                friends: [
                    'Alex123',
                    'Ivan333',
                    'VladYar',

                ],
                possibleFriends: [
                    'Pustohod',
                    'Afanas',
                    'Peker'
                ],
                posts: [
                    {
                        username: 'Alex123',
                        date: '02/12/19',
                        text: 'Maybe it\'s time to stop?',
                        img: ''
                    },
                    {
                        username: 'Ivan333',
                        date: '11/22/19',
                        text: 'When in doubt, tell the truth',
                        img: ''
                    },
                    {
                        username: 'Ivan333',
                        date: '04/12/19',
                        text: 'There are no shortcuts to any place worth going.',
                        img: ''
                    },
                    {
                        username: 'VladYar',
                        date: '12/04/19',
                        text: 'The time for action is now. It’s never too late to do something.',
                        img: ''
                    },
                    {
                        username: 'Alex123',
                        date: '12/04/19',
                        text: 'Real love stories never have endings.',
                        img: ''
                    }
                ]
            }
        },
        methods: {
            removeFriend (index) {
                this.possibleFriends.push(this.friends[index])
                this.friends.splice(index, 1)
            },
            addFriend (index) {
                this.friends.push(this.possibleFriends[index])
                this.possibleFriends.splice(index, 1)
            },
            refreshPosts () {
              alert('REFRESH')
            }
        }
    }
</script>