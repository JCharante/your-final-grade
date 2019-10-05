<template>
    <q-dialog v-model="vmodel" persistent>
        <q-card style="max-width: 100%; width: 400px">
            <q-card-section>
                <div class="text-h6">Set category properties</div>
            </q-card-section>
            <q-card-section>
                <q-input autofocus dense v-model="name" label="Category Name"/>
                <q-input v-model.number="weight" :min="0" type="number" max="100" label="Category Weight"/>
                <q-toggle v-model="buildUp" label="Toggle Build Up"/>
                <q-input v-if="!buildUp" v-model.number="maxPoints" :min="0" label="Max Points"/>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn flat label="Save" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    export default {
        name: "CategoryDialog",
        data() {
            return {
                vmodel: false,
                address: '',
                name: '',
                weight: 0,
                buildUp: true,
                maxPoints: 0,
                droppedGrades: 0,
                maxPercent: 0,
            };
        },
        methods: {
            show() {
                this.vmodel = true;
            },
        },
    };
</script>

<style scoped>

</style>
