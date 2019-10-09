<template>
    <q-page>
        <div class="q-pa-md" style="width: 100%; max-width: 500px; margin: auto;">
            <q-list bordered>
                <q-item>
                    <q-item-section>
                        <q-item-label>{{ $t('class_name') }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ classInfo.name }}</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="edit"
                                @click="editClassName"/>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label>{{ $t('current_grade') }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ currentGrade }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label>{{ $t('lowest_possible_grade') }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ lowestGrade }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label>{{ $t('highest_possible_grade') }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ highestGrade }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            <template v-if="Object.values(classInfo.categories).length > 0">
                <q-list bordered
                        v-for="category in Object.values(classInfo.categories)"
                        :key="category.id"
                >
                    <q-item>
                        <q-item-section>
                            <q-item-label><b>{{ category.name }}</b></q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ getCatGradeString(category.id) }}</q-item-label>
                        </q-item-section>
                        <q-item-section avatar>
                            <q-icon name="edit"
                                    @click="editCategory(category.id)"/>
                        </q-item-section>
                        <q-item-section avatar>
                            <q-icon name="delete"/>
                        </q-item-section>
                    </q-item>
                    <q-item v-for="grade in Object.values(classInfo.grades).filter(g => g.categoryId === category.id)"
                            :key="grade.id">
                        <q-item-section>
                            <q-item-label>{{ $t('assignment') }}:</q-item-label>
                            <q-item-label caption>{{ $t('points') }}: {{ grade.pointsEarned }}/{{ grade.maxPoints }}</q-item-label>
                        </q-item-section>
                        <q-item-section top>
                            <q-item-label>{{ grade.name }}</q-item-label>
                        </q-item-section>
                        <q-item-section avatar>
                            <q-icon name="edit"
                                    @click="editGrade(grade.id)"/>
                        </q-item-section>
                        <q-item-section avatar>
                            <q-icon name="delete"/>
                        </q-item-section>
                    </q-item>
                </q-list>
            </template>
            <template v-else>
                <div id="no-cat">
                    <p class="text-center">{{ $t('no_categories_entered') }}</p>
                    <p class="text-center">{{ $t('why_not_add_one') }}</p>
                </div>
            </template>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <template v-if="Object.values(classInfo.categories).length === 0">
                <q-btn fab color="secondary" @click="addCategory" icon="category"/>
            </template>
            <template v-else>
                <q-fab color="accent" icon="keyboard_arrow_up" direction="up">
                    <q-fab-action color="primary" @click="addGrade" icon="grade" />
                    <q-fab-action color="secondary" @click="addCategory" icon="category" />
                </q-fab>
            </template>
        </q-page-sticky>
        <CategoryDialog ref="categoryDialog"/>
        <GradeDialog ref="gradeDialog"/>
    </q-page>
</template>

<script>
    import { ClassCalculator } from 'your-final-grade-calculator-public';
    import { mapGetters, mapActions } from 'vuex';
    import CategoryDialog from "../components/CategoryDialog";
    import GradeDialog from '../components/GradeDialog';

    export default {
        name: "ClassView",
        components: { GradeDialog, CategoryDialog },
        props: ['classid'],
        computed: {
            ...mapGetters([
                'getClassById',
                'getLocale',
            ]),
            classInfo() {
                return this.getClassById(this.classid);
            },
            dataForCalculator() {
                return {
                    categories: JSON.parse(JSON.stringify(Object.values(this.getClassById(this.classid).categories))).map((cat) => {
                        cat.displayName = cat.name;
                        cat.name = cat.id;
                        return cat;
                    }),
                    grades: JSON.parse(JSON.stringify(Object.values(this.getClassById(this.classid).grades))).map((grade) => {
                        grade.category = grade.categoryId;
                        return grade;
                    }),
                    name: this.getClassById(this.classid).name,
                };
            },
            /**
             *
             * @returns {ClassCalculator}
             */
            classCalculatorObject() {
                return new ClassCalculator(this.dataForCalculator);
            },
            currentGrade() {
                return this.classCalculatorObject.getCurrentGrade();
            },
            highestGrade() {
                return this.classCalculatorObject.getHighestGrade();
            },
            lowestGrade() {
                return this.classCalculatorObject.getLowestGrade();
            },
        },
        methods: {
            ...mapActions([
                'setPageTitle',
                'setClassName',
            ]),
            addGrade() {
                this.$refs.gradeDialog.show({
                    editExisting: false,
                    classid: this.classid,
                });
            },
            addCategory() {
                this.$refs.categoryDialog.show({
                    editExisting: false,
                    classid: this.classid,
                });
            },
            editCategory(categoryId) {
                this.$refs.categoryDialog.show({
                    editExisting: true,
                    classid: this.classid,
                    categoryId,
                });
            },
            editGrade(gradeId) {
                this.$refs.gradeDialog.show({
                    editExisting: true,
                    classid: this.classid,
                    gradeId,
                });
            },
            getCatGradeString(id) {
                const val = this.classCalculatorObject.getCatGrade(id);
                return val.toLocaleString('en', { style: 'percent', minimumFractionDigits: 2 });
            },
            editClassName() {
                this.$q.dialog({
                    title: this.$t('edit_class_details'),
                    message: this.$t('class_name'),
                    prompt: {
                        model: this.classInfo.name,
                        type: 'text',
                    },
                    cancel: true,
                    persistent: false,
                })
                    .onOk((data) => {
                        this.setClassName([{ classid: this.classInfo.id }, { name: data }]).catch((err) => {
                            this.$q.dialog({
                                title: this.$t('invalid_submission'),
                                message: err,
                                persistent: false,
                            });
                        });
                    });
            },
        },
        mounted() {
            this.setPageTitle({ name: this.$t('classes') });
        },
        watch: {
            getLocale(val) {
                this.setPageTitle({ name: this.$t('classes') });
            },
        },
    };
</script>

<style scoped>
    #no-cat {
        margin-top: 50px;
    }
</style>
