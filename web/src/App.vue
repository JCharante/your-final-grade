<template>
    <div id="q-app">
        <router-view />
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'App',
        methods: {
            ...mapActions([
                'saveUserStore',
                'saveDataStore',
                'saveAppStore',
            ]),
        },
        mounted() {
            window.addEventListener('beforeunload', () => {
                this.saveUserStore();
                this.saveDataStore();
                this.saveAppStore();
                console.log('Saving Stored before unload');
            });
        },
    };
</script>
