<template>
    <div class="post">
        <div class="post-header">
            <span class="nick">{{ post.username }}</span>
            <time>{{ post.date }}</time>
        </div>
        <div class="post-body">
            {{ post.text }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            post: Object
        }
    }
</script>