<template>
    <div>
        <div class="log_name">
            <span class="snc">SNC</span>&nbsp &nbsp &nbsp<span class="chertochka">|</span>&nbsp &nbsp &nbsp<span class="social">(SocialNewsClub)</span>

        </div>

        <div class="l_center">
            <div class="log_field">
                <div class="log_in">
                    <span>LOG IN</span>
                </div>
                <form method="post" action="/login">
                    <div class="signup_nick">
                        <input placeholder="Nickname" name="yourNickname">
                    </div>
                    <div class="signup_pass">
                        <input placeholder="Password" name="yourPassword">
                    </div>
                    <div class="signup_end">
                        <button>SIGN UP</button> <a href="/regist">SIGN UP</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>