<template>
    <ClientOnly>
        <Disqus :identifier="identifier" :url="url" :title="title" />        
    </ClientOnly>
</template>

<script>
export default {
    props: {
        identifier: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }
}
</script>