<template>
    <q-dialog v-model="vmodel" persistent>
        <q-card style="max-width: 100%; width: 400px">
            <q-card-section>
                <div class="text-h6">{{ $t('set_category_properties') }}</div>
            </q-card-section>
            <q-card-section>
                <q-input autofocus
                         dense
                         v-model="name"
                         :label="$t('category_name')"/>
                <q-input v-model.number="weight"
                         :min="0"
                         type="number"
                         :max="100"
                         suffix="%"
                         :hint="$t('explain_category_weight')"
                         :label="$t('category_weight') + ' %'"/>
                <q-input v-model.number="maxPercent"
                         :min="0"
                         type="number"
                         suffix="%"
                         :hint="$t('explain_max_percent')"
                         :label="$t('max_percent') + ' %'"/>
                <div style="margin-top: 40px;"></div>
                <q-separator/>
                <q-input v-model.number="droppedGrades"
                         :min="0"
                         type="number"
                         :hint="$t('explain_num_dropped')"
                         :label="$t('num_dropped_grades')"/>
                <div style="margin-top: 20px;"></div>
                <q-separator/>
                <q-field borderless>
                    <q-toggle v-model="buildUp"
                              :label="$t('toggle_build_up')"/>
                </q-field>
                <q-input v-if="!buildUp"
                         v-model.number="maxPoints"
                         :min="0"
                         :label="$t('max_points')"/>
                <q-field :hint="$t('explain_top_worth_more')" borderless>
                    <q-toggle v-model="topWorthMoreEnabled"
                              :label="$t('toggle_top_worth_more')"
                              :disable="!topWorthMoreEnabled && !buildUp"/>
                </q-field>
                <div v-if="topWorthMoreEnabled" style="margin-top: 35px;"></div>
                <q-input v-if="topWorthMoreEnabled"
                         v-model.number="topWorthMore"
                         :hint="$t('explain_top_worth_more_num')"
                         :label="$t('top_worth_more_num')"/>
                <q-input v-if="topWorthMoreEnabled"
                         v-model.number="topWorthValue"
                         suffix="%"
                         :hint="$t('explain_top_worth_value')"
                         :label="$t('top_worth_value_percentage')"/>
                <q-input v-if="topWorthMoreEnabled"
                         v-model.number="botWorthValue"
                         suffix="%"
                         :hint="$t('explain_bot_worth_value')"
                         :label="$t('bot_worth_value_percentage')"/>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat
                       :label="$q.lang.label.cancel"
                       @click="resetFields()" v-close-popup />
                <q-btn flat
                       :label="$q.lang.label.update"
                       @click="save"/>
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
