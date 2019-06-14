<template>
    <div>
        <div v-on:click="() => onClickTab('addAudio')">Add audio</div>
        <div v-on:click="() => onClickTab('addWords')">Add words</div>
    </div>
</template>

<script>
export default {
    props: {
        onClickTab: Function,
    },
}
</script>

