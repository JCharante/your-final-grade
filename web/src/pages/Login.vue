<template>
    <q-page class="flex flex-center">
        <div class="row" style="width: 390px; max-width: 90%;">
            <div class="col-12">
                <q-input v-model="username"
                         :label="$t('username')"/>
            </div>
            <div class="col-12">
                <q-input v-model="password"
                         :label="$t('password')"
                         type="password"/>
            </div>
            <div class="col-12" v-if="creatingAccount">
                <q-input v-model="displayName"
                         :label="$t('display_name')"/>
            </div>
            <hr>
            <div class="col-12 row">
                <div class="col">
                    <q-btn @click="creatingAccount ? signup() : signin()"
                           :label="creatingAccount ? $t('create_account') : $t('signin')"
                           color="primary"
                           :disable="(username.length === 0 || password.length === 0) || creatingAccount ? displayName.length === 0 : false"/>
                </div>

                <q-btn :label="!creatingAccount? $t('need_an_account') : $t('already_have_account')"
                       @click="creatingAccount = !creatingAccount"
                       color="secondary"/>
            </div>
        </div>
    </q-page>
</template>


<script>
    import { mapGetters, mapActions } from 'vuex';
    import { Notify } from 'quasar';
    import { axiosInstance } from '../boot/axios';

    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                displayName: '',
                creatingAccount: false,
            };
        },
        methods: {
            ...mapActions([
                'setPageTitle',
            ]),
            signin() {
                axiosInstance.post('/', { requestType: 'login', username: this.username, password: this.password })
                    .then((response) => {
                        // console.log(response);
                        this.$store.dispatch('setSessionDoc', response.data).then(this.$router.push('/'));
                        return response;
                    })
                    .then((response) => {
                        return axiosInstance.post('/', { sessionKey: response.data.sessionKey, requestType: 'userDetails' });
                    })
                    .then((response) => {
                        this.$store.dispatch('setDisplayName', response.data);
                    })
                    .catch((err) => {
                        switch (err.response.status) {
                        case 400:
                            Notify.create({
                                message: this.$t('try_different_username'),
                                timeout: 2000,
                                color: 'red',
                            });
                            break;
                        case 403:
                            Notify.create({
                                message: this.$t('invalid_credentials'),
                                timeout: 200,
                                color: 'red',
                            });
                            break;
                        default:
                            break;
                        }
                        // console.error(err);
                    });
            },
            signup() {
                axiosInstance.post('/', { requestType: 'signup', username: this.username, password: this.password, displayName: this.displayName })
                    .then((response) => {
                        // console.log(response);
                        this.$store.dispatch('setSessionDoc', response.data).then(this.$router.push('/'));
                        return response;
                    })
                    .then((response) => {
                        return axiosInstance.post('/', { sessionKey: response.data.sessionKey, requestType: 'userDetails' });
                    })
                    .then((response) => {
                        this.$store.dispatch('setDisplayName', response.data);
                    })
                    .catch((err) => {
                        switch (err.response.status) {
                        case 400:
                            Notify.create({
                                message: this.$t('try_different_username'),
                                timeout: 2000,
                                color: 'red',
                            });
                            break;
                        case 403:
                            Notify.create({
                                message: this.$t('invalid_credentials'),
                                timeout: 200,
                                color: 'red',
                            });
                            break;
                        default:
                            break;
                        }
                        // console.error(err);
                    });
            },
        },
        computed: {
            ...mapGetters([
                'getLocale',
            ]),
        },
        mounted() {
            this.setPageTitle({ name: this.$t('your_final_grade') });
        },
        watch: {
            getLocale(val) {
                this.setPageTitle({ name: this.$t('your_final_grade') });
            },
        },
    };
</script>

<style scoped>

</style>
