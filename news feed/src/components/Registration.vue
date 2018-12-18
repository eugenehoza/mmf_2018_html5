<template>
    <div>
        <div class="signup_name">
            <span class="snc">SNC</span>&nbsp &nbsp &nbsp<span class="chertochka">|</span>&nbsp &nbsp &nbsp<span class="social">(SocialNewsClub)</span>

        </div>

        <div class="s_center">
            <div class="signup_field">
                <div class="sign_up">
                    <span>SIGN UP</span>
                </div>
                <form method="post" action="/regist">
                    <div class="signup_nick">
                        <input placeholder="New nickname (5 or more symbols)" name="nickname">
                    </div>
                    <div class="signup_pass">
                        <input placeholder="New password (5 or more symbols)" name="password">
                    </div>
                    <div class="signup_end">
                        <button>SIGN UP</button> <a href="/login">LOG IN</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {}
</script>