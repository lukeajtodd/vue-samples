<template>
    <div
        class="v-select"
        :ref="`v-select-${this.id}`"
        :class="{ 'is-open': open }"
        v-closable="{
            exclude: [`v-select-${this.id}`],
            handler: 'closeDropdown'
        }"
    >
        <div
            tabindex="0"
            class="v-select__toggle"
            @click="toggleDropdown"
            @keyup.enter="toggleDropdown"
            @keyup.space="toggleDropdown"
        >
            <slot name="selected" v-bind="{ option: computedOption }"/>
        </div>

        <ul
            tabindex="0"
            @focus="openDropdown"
            @keyup.esc="closeDropdown"
            class="v-select__dropdown"
        >
            <li
                tabindex="-1"
                v-for="(option, index) in options"
                :key="index"
            >
                <a
                    tabindex="0"
                    @click="handleChange(option)"
                    @keyup.enter="handleChange(option)"
                    @keyup.space="handleChange(option)"
                >
                    <slot name="option" v-bind="(typeof option === 'object') ? option : { [label]: option }"/>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar';
import { debounce } from 'throttle-debounce';
import shortid from 'shortid';

export default {
    name: 'VueSelect',
    data() {
        return {
            id: null,
            selectedOption: null,
            open: false,
            scrollbar: null
        }
    },
    props: {
        options: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        initialValue: {
            default: null
        },
        forceValue: {
            default: null
        }
    },
    watch: {
        options(val) {
            // New passed options
            this.selectedOption = null;
        },
        forceValue(val) {
            if (val) {
                this.silentChange(val);
            }
        }
    },
    created() {
        this.id = shortid.generate();
    },
    mounted() {
        this.scrollbar = new PerfectScrollbar('.v-select__dropdown', {
            suppressScrollX: true,
            wheelPropagation: true,
            scrollYMarginOffset: 30
        });
    },
    beforeDestroy() {
        this.scrollbar.destroy();
        this.scrollbar = null;
    },
    methods: {
        handleChange(option) {
            this.selectedOption = option;
            document.dispatchEvent(new Event('change', { cancelable: true }));
            this.$emit('select:change', option);
            this.open = false;
        },
        silentChange(option) {
            this.selectedOption = option;
            this.open = false;
        },
        toggleDropdown() {
            this.open = !this.open;
            this.updateScrollbar();
        },
        openDropdown() {
            this.open = true;
        },
        closeDropdown() {
            this.open = false;
        },
        updateScrollbar: debounce(300, function () {
            if (this.scrollbar) {
                this.scrollbar.update();
            }
        }),
    },
    computed: {
        computedOption() {
            return this.selectedOption ? this.selectedOption : this.initialValue ? this.initialValue : this.options[0];
        },
        computedOnChange() {
            return this.onChange ? this.onChange : this.handleChange;
        }
    }
}
</script>

<style lang="scss" scoped>
.v-select {
    position: relative;

    &__toggle {
        display: flex;
        align-items: center;
    }

    &__dropdown {
        position: absolute;
        width: 100%;
        overflow: hidden;
        left: 0;
        top: 100%;
        max-height: 0;
        list-style-type: none;
        margin: 0;
        padding: 0;
        transition: max-height 0.25s ease-in-out;
        z-index: 1000;

        > li {
            position: relative;

            > a {
                display: block;
            }
        }
    }

    &:after {
        content: url("/img/chevron-down.svg");
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        transition: transform 0.25s;
        width: 11px;
        pointer-events: none;
    }

    &.is-open {
        .v-select__dropdown {
            max-height: 14em;
        }

        &:after {
            transform: translateY(-45%) scale(-1);
        }
    }
}
</style>
