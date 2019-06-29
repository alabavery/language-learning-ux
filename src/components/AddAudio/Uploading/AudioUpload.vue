<template>
    <div>
        Audio Upload
        <input ref="upload" @change="onUpload" type="file" name="audio" accept="audio/*">
    </div>
</template>

<script>
    export default {
        name: "AudioUpload",
        props: {
          onComplete: Function,
        },
        methods: {
          onUpload: function () {
              this.onComplete(this.$refs.upload.files[0]);
          },
        },
    }
</script>

<style scoped>

</style>