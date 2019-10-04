<template>
    <q-page>
        <div class="q-pa-md" style="width: 100%; max-width: 400px">
            <q-list bordered>
                <q-item>
                    <q-item-section>
                        <q-item-label>Class name</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ classInfo.name }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label>Current Grade</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>50%</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label>Lowest Possible Grade</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>25%</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label>Highest Possible Grade</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>75%</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </q-page>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "ClassView.vue",
        props: ['classid'],
        computed: {
            ...mapGetters([
                'getClassById',
            ]),
            classInfo() {
                return this.getClassById(this.classid);
            },
        },
    };
</script>

<style scoped>

</style>
