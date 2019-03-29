import { mapState, mapMutations } from 'vuex';
export default {
    $_veeValidate: {
        validator: 'new'
    },
    mounted() {
        this.$validator.pause();
    },
    computed: {
        ...mapState(['formSubmitting'])
    },
    methods: {
        ...mapMutations(['setFormSubmitting']),
        handleForm: function(e) {
            if (!this.formSubmitting) {
                this.$validator.resume();
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.setFormSubmitting(true);
                        this.formHandler(e);
                    }
                });
            }
        }
    }
};
