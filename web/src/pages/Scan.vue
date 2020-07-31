<template>
    <q-page class="flex flex-center">
        <div v-if="promptConfirmation">
            <p>{{ $t('confirm_qr_login') }}</p>
            <div class="row justify-around">
                <q-btn color="primary" :label="$t('yeah')" @click="yeah"/>
                <q-btn color="secondary" :label="$t('nah')" outline @click="nah"/>
            </div>
        </div>
        <div v-if="!promptConfirmation">
            <div style="border-color: #ac2b37; max-width: 90%; margin: auto; border-width: 2px; border-style: dashed;">
                <qrcode-stream @decode="onDecode" @init="onInit"/>
            </div>
        </div>
    </q-page>
</template>


<script>
    import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
    import { mapGetters, mapActions } from 'vuex';

    import { Notify } from 'quasar';

    export default {
        components: {
            QrcodeStream,
        },
        name: 'Scan',
        data() {
            return {
                error: '',
                result: '',
                socket: null,
                token: '',
                promptConfirmation: false,
            };
        },
        methods: {
            ...mapActions([
                'setPageTitle',
            ]),
            onDecode(result) {
                this.result = result;
                const dat = result.split('https://yourfinalgrade.com/app/#/scan?token=');
                if (dat.length === 2 && dat[0] === "") {
                    if (this.socket != null) {
                        this.socket.send(JSON.stringify({
                            requestType: "scanToken",
                            token: dat[1],
                        }));
                    } else {
                        Notify.create({
                            message: this.$t('qr_service_offline'),
                            timeout: 3000,
                            color: 'red',
                        });
                    }
                } else {
                    Notify.create({
                        message: this.$t('not_our_qr_code'),
                        timeout: 3000,
                        color: 'red',
                    });
                }
            },
            async onInit(promise) {
                try {
                    await promise;
                } catch (error) {
                    if (error.name === 'NotAllowedError') {
                        this.error = "ERROR: you need to grant camera access permisson";
                    } else if (error.name === 'NotFoundError') {
                        this.error = "ERROR: no camera on this device";
                    } else if (error.name === 'NotSupportedError') {
                        this.error = "ERROR: secure context required (HTTPS, localhost)";
                    } else if (error.name === 'NotReadableError') {
                        this.error = "ERROR: is the camera already in use?";
                    } else if (error.name === 'OverconstrainedError') {
                        this.error = "ERROR: installed cameras are not suitable";
                    } else if (error.name === 'StreamApiNotSupportedError') {
                        this.error = "ERROR: Stream API is not supported in this browser";
                    }
                }
            },
            yeah() {
                this.socket.send(JSON.stringify({
                    requestType: 'authenticateToken',
                    token: this.token,
                    sessionKey: this.getSessionKey,
                }));
                const self = this;
                setTimeout(() => {
                    self.$router.go(-1);
                }, 300);
            },
            nah() {
                this.promptConfirmation = false;
            },
        },
        computed: {
            ...mapGetters([
                'getLocale',
                'getSessionKey',
            ]),
        },
        mounted() {
            const self = this;
            this.setPageTitle({ name: this.$t('scan_qr') });
            this.socket = new WebSocket("wss://your-final-grade.appspot.com");
            this.socket.onopen = function () {
                // console.log("Established WSS Connection");
            };
            this.socket.onmessage = function (event) {
                const data = JSON.parse(event.data);
                // console.log(data);
                switch (data.requestType) {
                case 'tokenValid': {
                    self.token = data.token;
                    self.promptConfirmation = true;
                    break;
                }
                default:
                    break;
                }
            };
        },
        watch: {
            getLocale(val) {
                this.setPageTitle({ name: this.$t('scan_qr') });
            },
        },
    };
</script>

<style scoped>

</style>
