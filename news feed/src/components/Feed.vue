<template>
    <div>
        <div class="shapka">
            <span class="logo">SNC</span>
            <div class="user+logout">
                <span class="user_name">User99</span>
                <button class="log_out">LOG OUT</button>
            </div>
        </div>

        <div class="main">

            <div class="people">

                <div class="friend_list">
                    <div class="friend-text">
				        <span class="menu_text">Friends</span>
                    </div>
                    <div class="fr_menu">
                        <friend v-for="(friend, index) in friends" :name="friend" @removeFriend="removeFriend(index)"></friend>
                    </div>
                </div>
                <div class="umk_list">
                    <div class="umk-text">
                        <span class="menu_text">People you may know</span>
                    </div>
                    <div class="umk_menu">
                        <possible-friend v-for="(friend, index) in possibleFriends" :name="friend" @addFriend="addFriend(index)"></possible-friend>
                    </div>
                </div>

            </div>

            <div class="news">

                <div class="news-text">
                    <div>
                        <button>ADD POST</button>
                    </div>
                    <div>
					    <span>News</span>
                    </div>
                    <div>
                        <button>REFRESH</button>
                    </div>
                </div>

                <div class="news_menu">

                    <div class="post">
                        <div class="top">
                            <span class="nick">Alex123</span><time>12-30</time>
                        </div>
                        <div class="bottom">
                            example + img
                        </div>
                    </div>

                    <div class="post">
                        <div class="top">
                            <span class="nick">Alex123</span><time>12-30</time>
                        </div>
                        <div class="bottom">
                            example + img
                        </div>
                    </div>

                    <div class="post">
                        <div class="top">
                            <span class="nick">Alex123</span><time>12-30</time>
                        </div>
                        <div class="bottom">
                            example + img
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import Friend from './elements/Friend.vue'
    import PossibleFriend from './elements/PossibleFriend.vue'

    export default {
        components: {
            Friend,
            PossibleFriend
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
                ]
            }
        },
        methods: {
            removeFriend (index) {
                this.possibleFriends.push(this.friends[index])
                this.friends.splice(index, 1)
            },
            addFriend(index) {
                this.friends.push(this.possibleFriends[index])
                this.possibleFriends.splice(index, 1)
            }
        }
    }
</script>