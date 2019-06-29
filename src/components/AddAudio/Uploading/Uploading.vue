<template>
    <div>
        <AudioUpload v-bind:onComplete="onAudioUploadComplete" />
        <TranscriptInput v-bind:onComplete="onTranscriptUploadComplete" />
    </div>
</template>

<script>
    import TranscriptInput from "./TranscriptInput";
    import AudioUpload from "./AudioUpload";
    export default {
        name: "Uploading",
        components: {
            AudioUpload,
            TranscriptInput,
        },
        props: {
          onComplete: Function,
        },
        data: function () {
            return {
                audioUploadComplete: false,
                transcriptUploadComplete: false,
                audio: null,
                transcript: null,
            };
        },
        methods: {
            onAudioUploadComplete: function (audio) {
                console.log(`Uploading component's onAudioUploadComplete received audio ${audio}`);
                console.log(audio);
                if (this.transcriptUploadComplete) {
                    this.onComplete(audio, this.transcript);
                } else {
                    this.audio = audio;
                    this.audioUploadComplete = true;
                }
            },
            onTranscriptUploadComplete: function (transcript) {
                console.log(`Uploading component's onTranscriptUploadComplete received transcript ${transcript}`);
                if (this.audioUploadComplete) {
                    this.onComplete(this.audio, transcript);
                } else {
                    this.transcript = transcript;
                    this.transcriptUploadComplete = true;
                }
            }
        },
    }
</script>

<style scoped>

</style>