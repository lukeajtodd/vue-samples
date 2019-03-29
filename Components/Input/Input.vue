<template>
    <fragment>
        <template >
            <input
                ref="input"
                v-validate="rule"
                :data-vv-as="validateAsComputed"
                :id="idComputed"
                :type="type"
                class="form-control"
                :name="name"
                :value="modelItem"
                :disabled="isDisabled"
                :required="required"
                autocomplete="off"
            >
        </template>
        <InlineError
            :errors="errors"
            :type="name"
        />
    </fragment>
</template>

<script>
import { mapState } from 'vuex';
import InlineError from './InlineError';

export default {
    name: 'Input',
    inject: ['$validator'],
    data() {
        return {
            value: ''
        }
    },
    mounted() {
        this.$refs.input.addEventListener('keyup', this.updateValue);
        this.$refs.input.addEventListener('change', this.updateValue);
    },
    beforeDestroy() {
        this.$refs.input.removeEventListener('keyup', this.updateValue);
        this.$refs.input.removeEventListener('change', this.updateValue);
    },
    props: {
        rule: {
            type: [String, Boolean],
            default: false
        },
        type: {
            type: [String, Function],
            default: 'text'
        },
        id: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        module: {
            type: String,
            required: true
        },
        required: {
            type: Boolean,
            default: false
        },
        validateAs: {
            type: String
        },
        disabledCheck: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState(['formSubmitting']),
        idComputed() {
            return this.id || this.name;
        },
        validateAsComputed() {
            return this.validateAs || this.name;
        },
        modelItem: {
            get: function () {
                return _.get(this.$store.state[this.module], this.model);
            },
            set: function (val) {
                if (this.model.split('.').length < 2) {
                    this.$store.commit(`${this.module}/${this.model}`, val);
                } else {
                    let spl = this.model.split('.');
                    let target = spl[spl.length - 1];
                    this.$store.commit(`${this.module}/${target}`, val);
                }
            }
        },
        isDisabled() {
            return this.disabledCheck || this.$store.state.formSubmitting;
        }
    },
    methods: {
        updateValue(e) {
            this.modelItem = e.target.value;
        },
    },
    components: {
        InlineError
    }
};
</script>
