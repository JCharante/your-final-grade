<template>
    <q-layout view="hHh LpR lFf">
        <q-header elevated>
            <q-toolbar class="bg-white text-primary shadow-0">
                <div></div>
                <q-toolbar-title>
                    <router-link to="/" class="text-primary" style="text-decoration: none;">
                        {{ $q.screen.lt.sm ? 'YFG' : 'Your Final Grade' }}
                    </router-link>

                </q-toolbar-title>

                <div></div>
                <q-btn outline :label="$t('login')"/>
                <q-btn v-if="$q.screen.lt.sm" @click="drawerRight = !drawerRight" flat round dense icon="menu" />
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
    export default {
        name: "BlankLayout.vue",
        data() {
            return {
                drawerRight: false,
            };
        },
    };
</script>

<style scoped>

</style>
