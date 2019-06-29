<template>
    <div>
<!--        <audio v-bind:src="src" ref="audio">-->
<!--            Your browser does not support the audio element.-->
<!--        </audio>-->
    </div>
</template>

<script>
    export default {
        name: "AudioPlayer",
        props: {
            audio: File,
            onCreateRef: Function,
        },
        data: function () {
          return {
              src: null,
          };
        },
        mounted() {
            // this.src = URL.createObjectURL(this.audio);
            // console.log("this.$refs.audio", this.$refs.audio);
            // console.log("typeof this.$refs.audio", this.$refs.audio.constructor.name);
            // console.log("keys this.$refs.audio");
            // console.dir(this.$refs.audio);
            // console.log("this.$refs.audio.currentTime", this.$refs.audio.currentTime);
            // this.$refs.audio.play();
            // console.log("after play");
            // this.onCreateRef(this.$refs.audio);
            // const audio = new Audio(URL.createObjectURL(this.audio));
            console.dir(audio)

        }
    }
</script>

<style scoped>

</style>