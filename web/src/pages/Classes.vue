<template>
    <q-page>
        <div class="q-pa-md" style="max-width: 350px">
            <template v-if="true">
                <p class="text-center" id="it">It doesn't look like you have any classes :(</p>
                <p class="text-center">Why not add one?</p>
            </template>
            <q-list v-else>
                <q-item clickable>
                    <q-item-section>
                        <q-item-label>Chem 1010</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="accent" />
        </q-page-sticky>
    </q-page>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "Classes",
        methods: {
            ...mapActions([
                'setPageTitle',
            ]),
        },
        mounted() {
            this.setPageTitle({ name: 'Classes' });
        },
    };
</script>

<style scoped>
    #it {
        margin-top: 100%;
    }
</style>
