<template>
    <div class="friend">
        <span class="nick">{{ name }}</span>
        <button class="remove-btn" @click="$emit('removeFriend')">REMOVE</button>
    </div>
</template>

<script>
    export default {
        props: {
            name: String
        }
    }
</script>