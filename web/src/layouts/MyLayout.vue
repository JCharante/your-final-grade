<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title>
                    {{ pageTitle }}
                </q-toolbar-title>

                <div></div>
                <q-btn flat
                       @click="$q.lang.isoName = ($q.lang.isoName === 'en-us' ? 'zh-cn' : 'en-us')"
                >
                    {{ $q.lang.isoName === 'zh-cn' ? $t('english') : $t('chinese') }}
                </q-btn>
                <q-btn v-if="isProbablySignedIn" flat @click="logout().then($router.push('/login'))" icon="exit_to_app">{{ $t('logout') }}</q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

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
            ]),
        },
        data() {
            return {
                lang: this.$q.lang,
            };
        },
    };
</script>

<style>
</style>
