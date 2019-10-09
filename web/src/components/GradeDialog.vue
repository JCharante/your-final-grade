<template>
    <q-dialog v-model="vmodel" persistent>
        <q-card style="max-width: 100%; width: 400px">
            <q-card-section>
                <div class="text-h6">{{ $t('set_grade_properties') }}</div>
            </q-card-section>
            <q-card-section>
                <q-select v-model="categoryModel"
                          outlined
                          :options="categoryOptions"
                          :label="$t('category')"/>
                <q-input v-model="name"
                         :label="$t('assignment_name')"/>
                <q-input v-model.number="maxPoints"
                         type="number"
                         :label="$t('max_points')"/>
                <q-toggle v-model="notYetGraded"
                          :label="$t('not_yet_graded')"/>
                <q-input v-model.number="pointsEarned"
                         v-if="!notYetGraded"
                         type="number"
                         :min="0"
                         :label="$t('points_earned')"/>
                <q-input v-model.number="possibleExtraCredit"
                         type="number"
                         :min="0"
                         :label="$t('possible_extra_credit')"/>
            </q-card-section>
            <q-card-actions align="right"
                            class="text-primary">
                <q-btn flat
                       :label="$q.lang.label.cancel"
                       @click="resetFields()"
                       v-close-popup/>
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
        name: "GradeDialog.vue",
        data() {
            return {
                vmodel: false,
                id: '',
                categoryModel: {},
                classid: '',
                categoryId: '',
                name: '',
                maxPoints: 0,
                pointsEarned: 0,
                possibleExtraCredit: 0,
                notYetGraded: false,
            };
        },
        computed: {
            ...mapGetters([
                'getClassById',
                'getGradeByClassAndGradeId',
            ]),
            categoryOptions() {
                if (this.classid !== '') {
                    return Object.values(this.getClassById(this.classid).categories)
                        .map((category) => {
                            return {
                                label: category.name,
                                value: category.id,
                            };
                        });
                } else {
                    return [];
                }
            },
        },
        methods: {
            ...mapActions([
                'setGrade',
            ]),
            show({ editExisting, classid, gradeId, categoryId }) {
                this.vmodel = true;
                this.classid = classid;
                if (editExisting) {
                    // populate fields from store
                    this.id = gradeId;
                    const storedData = this.getGradeByClassAndGradeId(classid, gradeId);
                    this.categoryId = storedData.categoryId;
                    if (this.categoryId in this.getClassById(this.classid).categories) {
                        this.categoryModel.value = this.categoryId;
                        this.categoryModel.label = this.getClassById(this.classid).categories[this.categoryId].name;
                    }
                    this.name = storedData.name;
                    this.maxPoints = storedData.maxPoints;
                    this.pointsEarned = storedData.pointsEarned;
                    this.possibleExtraCredit = storedData.possibleExtraCredit;
                    this.notYetGraded = storedData.notYetGraded;
                } else {
                    this.id = mongoObjectId();
                    this.categoryId = categoryId;
                    if (categoryId && this.categoryId in this.getClassById(this.classid).categories) {
                        this.categoryModel.value = this.categoryId;
                        this.categoryModel.label = this.getClassById(this.classid).categories[this.categoryId].name;
                    }
                }
            },
            save() {
                const data = {
                    id: this.id,
                    classid: this.classid,
                    categoryId: this.categoryModel.value,
                    name: this.name,
                    maxPoints: this.maxPoints,
                    pointsEarned: this.pointsEarned,
                    possibleExtraCredit: this.possibleExtraCredit,
                    notYetGraded: this.notYetGraded,
                };

                this.setGrade([{ classid: this.classid, id: this.id }, data]).then(() => {
                    this.vmodel = false;
                    this.resetFields();
                });
            },
            resetFields() {
                this.categoryModel = {};
                this.classid = '';
                this.categoryId = '';
                this.name = '';
                this.maxPoints = 0;
                this.pointsEarned = 0;
                this.possibleExtraCredit = 0;
                this.notYetGraded = false;
            },
        },
    };
</script>

<style scoped>

</style>
