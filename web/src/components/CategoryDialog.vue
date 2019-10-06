<template>
    <q-dialog v-model="vmodel" persistent>
        <q-card style="max-width: 100%; width: 400px">
            <q-card-section>
                <div class="text-h6">Set category properties</div>
            </q-card-section>
            <q-card-section>
                <q-input autofocus dense v-model="name" label="Category Name"/>
                <q-input v-model.number="weight" :min="0" type="number" max="100" label="Category Weight"/>
                <q-input v-model.number="droppedGrades" :min="0" type="number" label="Number of Dropped Grades"/>
                <q-input v-model.number="maxPercent" :min="0" type="number" label="Max Percent"/>
                <q-separator/>
                <q-toggle v-model="buildUp" label="Toggle Build Up"/>
                <q-input v-if="!buildUp" v-model.number="maxPoints" :min="0" label="Max Points"/>
                <q-separator/>
                <q-toggle v-model="topWorthMoreEnabled" label="Toggle Top Worth More" :disable="!topWorthMoreEnabled && !buildUp"/>
                <q-input v-if="topWorthMoreEnabled" v-model.number="topWorthMore" label="Top Worth More #"/>
                <q-input v-if="topWorthMoreEnabled" v-model.number="topWorthValue" label="Top Worth Value %"/>
                <q-input v-if="topWorthMoreEnabled" v-model.number="botWorthValue" label="Bot Worth Value %"/>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" @click="resetFields()" v-close-popup />
                <q-btn flat label="Save" @click="save"/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { mongoObjectId } from "../store/data/def";

    export default {
        name: "CategoryDialog",
        data() {
            return {
                vmodel: false,
                id: '',
                classid: '',
                name: '',
                weight: 0,
                buildUp: true,
                maxPoints: 0,
                droppedGrades: 0,
                maxPercent: 0,
                topWorthMoreEnabled: false,
                topWorthMore: 0,
                topWorthValue: 0,
                botWorthValue: 0,
            };
        },
        watch: {
            buildUp(val) {
                if (!val) {
                    this.topWorthMoreEnabled = false;
                }
            },
        },
        computed: {
            ...mapGetters([
                'getCategoryByClassAndCategoryId',
            ]),
        },
        methods: {
            ...mapActions([
                'addCategory',
                'modifyCategory',
            ]),
            show({ editExisting, categoryId, classid }) {
                this.vmodel = true;
                this.classid = classid;
                if (editExisting) {
                    // populate fields from store
                    const storedData = this.getCategoryByClassAndCategoryId(classid, categoryId);
                    this.id = categoryId;
                    this.name = storedData.name;
                    this.weight = storedData.weight;
                    this.buildUp = storedData.buildUp;
                    this.maxPoints = storedData.maxPoints;
                    this.droppedGrades = storedData.droppedGrades;
                    this.maxPercent = storedData.maxPercent;
                    this.topWorthMoreEnabled = storedData.topWorthMoreEnabled;
                    this.topWorthMore = storedData.topWorthMore;
                    this.botWorthValue = storedData.botWorthValue;
                } else {
                    // create a new category
                    // create a new field then edit it.
                    this.id = mongoObjectId();
                    /*
                    this.addCategory([{ classid }, { name: 'brandNew' }])
                        // eslint-disable-next-line no-return-assign
                        .then(catId => this.id = catId);
                     */
                }
            },
            save() {
                const data = {
                    id: this.id,
                    name: this.name,
                    weight: this.weight,
                    buildUp: this.buildUp,
                    maxPoints: this.maxPoints,
                    droppedGrades: this.droppedGrades,
                    maxPercent: this.maxPercent,
                    topWorthMoreEnabled: this.topWorthMoreEnabled,
                    topWorthMore: this.topWorthMore,
                    topWorthValue: this.topWorthValue,
                    botWorthValue: this.botWorthValue,
                };
                // eslint-disable-next-line no-return-assign
                this.modifyCategory([{ classid: this.classid, id: this.id }, data]).then(() => {
                    this.vmodel = false;
                    this.resetFields();
                });
            },
            resetFields() {
                this.id = '';
                this.classid = '';
                this.name = '';
                this.weight = 0;
                this.buildUp = true;
                this.maxPoints = 0;
                this.droppedGrades = 0;
                this.maxPercent = 0;
                this.topWorthMoreEnabled = false;
                this.topWorthMore = 0;
                this.topWorthValue = 0;
                this.botWorthValue = 0;
            },
        },
    };
</script>

<style scoped>

</style>
