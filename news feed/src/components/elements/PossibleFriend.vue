<template>
    <div class="friend">
        <span class="nick">{{ name }}</span>
        <button class="add-button" @click="$emit('addFriend')">ADD</button>
    </div>
</template>

<script>
    export default {
        props: {
            name: String
        }
    }
</script>