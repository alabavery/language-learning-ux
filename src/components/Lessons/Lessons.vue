<template>
    <div>
        <ExistingLessons />
        <button v-on:click="displayMakeNewLesson">Make new lesson</button>
        <MakeNewLesson v-if="showMakeNewLesson" v-bind:user-id="userId" />
    </div>
</template>

<script>
    import ExistingLessons from './ExistingLessons/ExistingLessons';
    import MakeNewLesson from './MakeNewLesson/MakeNewLesson';

    export default {
        name: "Lessons",
        components: {
            ExistingLessons,
            MakeNewLesson,
        },
        props: {
          userId: Number,
        },
        data: function () {
          return {
            showMakeNewLesson: false,
          };
        },
        methods: {
            displayMakeNewLesson: function () {
                this.showMakeNewLesson = true;
            },
            onCompleteMakeNewLesson: function () {
                this.showMakeNewLesson = false;
                // fetch all user lessons
            },
        },
    }
</script>

<style scoped>

</style>