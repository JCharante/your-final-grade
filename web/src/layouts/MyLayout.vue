<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn v-if="$router.currentRoute.name === 'ClassView'" flat round dense icon="clear" @click="$router.push('/')"/>
                <q-btn v-else @click="drawerLeft = !drawerLeft" flat round dense icon="menu" />
                <q-toolbar-title>
                    {{ pageTitle }}
                </q-toolbar-title>

                <div></div>
                <q-btn flat
                       @click="toggleLang"
                >
                    {{ $i18n.locale === 'zh-cn' ? enus.nativeName : zhhans.nativeName }}
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="drawerLeft"
                  content-class="bg-secondary text-white"
                    elevated>
            <q-btn v-if="isProbablySignedIn" flat @click="logout().then($router.push('/login'))" icon="exit_to_app">{{ $t('logout') }}</q-btn>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    import ENUS from 'quasar/lang/en-us';
    import ZHHANS from 'quasar/lang/zh-hans';

    export default {
        name: 'MyLayout',
        computed: {
            ...mapGetters([
                'isProbablySignedIn',
                'pageTitle',
            ]),
        },
        methods: {
            ...mapActions([
                'logout',
                'setLocale',
            ]),
            toggleLang() {
                const currentLocale = this.$i18n.locale;
                const newLocale = currentLocale === 'en-us' ? 'zh-cn' : 'en-us';
                this.$i18n.locale = newLocale;
                this.lang.set(newLocale === 'en-us' ? ENUS : ZHHANS);
                this.setLocale({ locale: newLocale });
            },
        },
        data() {
            return {
                lang: this.$q.lang,
                i18n: this.$i18n,
                drawerLeft: false,
                enus: ENUS,
                zhhans: ZHHANS,
                router: this.$router,
            };
        },
    };
</script>

<style>
</style>
