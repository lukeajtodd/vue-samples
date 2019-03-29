<template>
    <button
        v-if="clickHandler"
        :disabled="formSubmitting ? true : false"
        :type="type"
        @click="clickHandler"
        :class="btnClasses"
    >
        <template v-if="!formSubmitting">
            {{ content }}
        </template>
        <template v-else>
            <div class="loader loader--inline">
                <loader :width="15" :height="15" />
            </div>
        </template>
    </button>
    <button
        v-else
        :disabled="formSubmitting ? true : false" 
        :type="type" 
        :class="btnClasses"
    >
        <template v-if="!formSubmitting">
            {{ content }}
        </template>
        <template v-else>
            <loader :width="15" :height="15" />
        </template>
    </button>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'LoaderedButton',
    props: {
        content: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'button'
        },
        btnClasses: {
            type: String,
            default: ''
        },
        clickHandler: {
            type: Function
        }
    },
    computed: {
        ...mapState(['formSubmitting'])
    }
};
</script>
