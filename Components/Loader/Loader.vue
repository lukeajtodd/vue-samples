<template>
    <div
        class="loader-anim"
        :style="{ 
            width: width ? width + 'px' : null,
            height: height ? height + 'px' : null
        }"
    >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'Loader',
    props: {
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
        }
    }
};
</script>

<style lang="scss" scoped>
.loader-anim {
    display: flex;
    flex-wrap: wrap;

    > div {
        animation: fade 900ms infinite;
        background-color: white;
        border-radius: 50%;
        margin: 5%;
        width: 22%;
        height: 22%;
        flex: 0 0 22%;
    }

    > div:nth-child(1) {
        animation-delay: -800ms;
    }
    > div:nth-child(2) {
        animation-delay: -700ms;
    }
    > div:nth-child(3) {
        animation-delay: -600ms;
    }
    > div:nth-child(4) {
        animation-delay: -500ms;
    }
    > div:nth-child(5) {
        animation-delay: -400ms;
    }
    > div:nth-child(6) {
        animation-delay: -300ms;
    }
    > div:nth-child(7) {
        animation-delay: -200ms;
    }
    > div:nth-child(8) {
        animation-delay: -200ms;
    }

    @keyframes fade {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
    }
}
</style>

