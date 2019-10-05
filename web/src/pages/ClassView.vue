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
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab color="accent" icon="keyboard_arrow_up" direction="up">
                <q-fab-action color="primary" @click="addGrade" icon="grade" />
                <q-fab-action color="secondary" @click="addCategory" icon="category" />
            </q-fab>
        </q-page-sticky>
        <CategoryDialog ref="categoryDialog"/>
    </q-page>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import CategoryDialog from "../components/CategoryDialog";

    export default {
        name: "ClassView.vue",
        components: { CategoryDialog },
        props: ['classid'],
        computed: {
            ...mapGetters([
                'getClassById',
            ]),
            classInfo() {
                return this.getClassById(this.classid);
            },
        },
        methods: {
            addGrade() {

            },
            addCategory() {
                this.$refs.categoryDialog.show();
            },
        },
    };
</script>

<style scoped>

</style>
