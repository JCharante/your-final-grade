<template>
    <q-page class="flex flex-center">
        <p>{{ getDisplayName }}</p>
    </q-page>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'PageIndex',
        computed: {
            ...mapGetters([
                'getDisplayName',
            ]),
        },
    };
</script>
