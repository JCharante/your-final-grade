<template>
    <q-page class="flex flex-center">
        <div class="row" style="width: 390px; max-width: 90%;">
            <div class="col-12 row justify-center items-center">
                <div id="login-qrcode" ref="lqr" style="margin: auto;"></div>
            </div>
            <hr style="margin-top: 20px;" v-if="!tokenScanned">
            <div class="col-12">
                <template v-if="tokenScanned">
                    <div class="col-12 text-center">
                        {{ $t('waiting_for_client') }}
                    </div>
                    <br>
                    <div class="col-12 text-center">
                        <q-btn :label="$t('new_qr_code')" @click="requestNewToken()" color="primary" icon="refresh" outline/>
                    </div>
                </template>
            </div>
            <template  v-if="!tokenScanned">
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
                <div class="col-12">
                    <hr style="margin-top: 60px; margin-bottom: 60px;">
                    <div class="row justify-center">
                        <q-btn outline
                               color="primary"
                               @click="continueWithoutAccount"
                               :label="$t('or_continue_without_account')"/>
                    </div>
                    <p class="text-center text-caption" style="margin-top: 20px;">
                        {{ $t('continue_without_account_notice') }}
                    </p>
                </div>
            </template>
        </div>
    </q-page>
</template>


<script>
    import qrcode from 'qrcodejs2';

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
                socket: null,
                qrcode: null,
                tokenScanned: false,
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
            continueWithoutAccount() {
                this.$store.dispatch('setSessionDoc', { sessionKey: 'unregistered' }).then(this.$router.push('/'));
                this.$store.dispatch('setDisplayName', { displayName: 'Unregistered User' });
            },
            requestNewToken() {
                this.tokenScanned = false;
                const self = this;
                setTimeout(() => {
                    self.socket.send(JSON.stringify({
                        requestType: 'newToken',
                    }));
                }, 100);
            },
        },
        computed: {
            ...mapGetters([
                'getLocale',
            ]),
        },
        mounted() {
            this.setPageTitle({ name: this.$t('your_final_grade') });
            // eslint-disable-next-line new-cap
            this.qrcode = new qrcode("login-qrcode", {
                width: 200,
                height: 200,
                colorDark: "#ac2b37",
                colorLight: "#fff",
            });
            this.socket = new WebSocket("wss://your-final-grade.appspot.com");
            const self = this;
            this.socket.onopen = function () {
                // console.log("Established WSS Connection");
                self.requestNewToken();
            };
            this.socket.onmessage = function (event) {
                const data = JSON.parse(event.data);
                // console.log(data);

                switch (data.requestType) {
                case 'newToken':
                    self.$refs.lqr.style.display = 'block';
                    // console.log('got new token, make new qr code');
                    self.qrcode.makeCode(`https://yourfinalgrade.com/app/#/scan?token=${data.token}`);
                    break;
                case 'tokenScanned':
                    self.tokenScanned = true;
                    // console.log('token scanned');
                    self.$refs.lqr.style.display = 'none';
                    // self.requestNewToken();
                    break;
                case 'grantedSessionKey':
                    self.$store.dispatch('setSessionDoc', data).then(self.$router.push('/'));
                    axiosInstance.post('/', { sessionKey: data.sessionKey, requestType: 'userDetails' }).then((response) => {
                        self.$store.dispatch('setDisplayName', response.data);
                    });
                    break;
                default:
                    break;
                }
            };
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
