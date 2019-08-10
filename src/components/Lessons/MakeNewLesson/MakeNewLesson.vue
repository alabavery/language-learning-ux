<template>
    <div>
        Make new lesson
        <button v-on:click="getClipsToMakeLesson">Do it</button>
    </div>
</template>

<script>
    import api from '../../../service/api';

    export default {
        name: "MakeNewLesson",
        props: {
          userId: Number,
        },
        data: function () {
          return {
            focusWordIds: [],
            proposedClips: [],
            createdLesson: null,
          };
        },
        methods: {
          getClipsToMakeLesson: async function () {
            this.proposedClips = await api.getClipsToMakeLesson({
                userId: this.userId,
                focusWordIds: this.focusWordIds,
                thresholdForUserKnowledge: .9,
                numOfClipsInLesson: 10,
            });
          },
        },
    }
</script>

<style scoped>

</style>