<template>
    <div id="top-nav">
        <div
                class="tab"
                v-bind:style="{ ...getClickedUnClickedStyle('addAudio') }"
                v-on:click="() => onClick('addAudio')"
        >
            Add audio
        </div>
        <div
                class="tab"
                v-bind:style="{ ...getClickedUnClickedStyle('addWords') }"
                v-on:click="() => onClick('addWords')"
        >
            Add words
        </div>
    </div>
</template>

<script>
export default {
    props: {
        onClickTab: Function,
        pageDisplayed: String,
    },
    methods: {
      onClick: function (tabName) {
          this.onClickTab(tabName);
      },
        getClickedUnClickedStyle: function (tabName) {
        return tabName === this.pageDisplayed ? { backgroundColor: '#2f4f4f' } : {};
      },
    },
}
</script>

<style>
    #top-nav {
        display: flex;
        background-color: slategrey;
        color: white;
        justify-content: space-evenly;
        top: 0;
    }
    .tab {
      width: 30%;
    }
</style>
