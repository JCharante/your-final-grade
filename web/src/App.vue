<template>
    <div id="q-app" :class="{'bg-grey-10': getDarkModeEnabled}">
        <router-view />
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import ENUS from 'quasar/lang/en-us';
    import ZHHANS from 'quasar/lang/zh-hans';

    export default {
        name: 'App',
        methods: {
            ...mapActions([
                'saveUserStore',
                'saveDataStore',
                'saveAppStore',
                'setLocale',
                'smartRetrieveDataStore',
            ]),
        },
        computed: {
            ...mapGetters([
                'getDarkModeEnabled',
            ]),
        },
        mounted() {
            const newLocale = this.$store.state.user.locale;
            this.$i18n.locale = newLocale;
            this.$q.lang.set(newLocale === 'en-us' ? ENUS : ZHHANS);

            this.$q.addressbarColor.set();

            this.smartRetrieveDataStore();

            window.addEventListener('beforeunload', () => {
                this.saveUserStore();
                this.saveDataStore();
                this.saveAppStore();
                // console.log('Saving Stored before unload');
            });
        },
    };
</script>
