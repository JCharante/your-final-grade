<template>
    <q-page>
        <div class="q-pa-md" style="width: 100%; max-width: 400px">
            <template v-if="getClassIds.length === 0">
                <p class="text-center" id="it">{{ $t('no_classses_entered') }}</p>
                <p class="text-center">{{ $t('why_not_add_one') }}</p>
            </template>
            <q-list v-else bordered separator>
                <q-item clickable :key="classId" v-for="classId in getClassIds">
                    <q-item-section>
                        <q-item-label>{{ getClassById(classId).name }}</q-item-label>
                    </q-item-section>
                    <q-item-section avatar @click="$router.push(`/class/${classId}`)">
                        <q-avatar flat icon="keyboard_arrow_right"/>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="accent" @click="fabClick"/>
        </q-page-sticky>
    </q-page>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "Classes",
        computed: {
            ...mapGetters([
                'getClassIds',
                'getClassById',
            ]),
        },
        methods: {
            ...mapActions([
                'setPageTitle',
                'addClass',
            ]),
            fabClick() {
                this.$q.dialog({
                    title: 'Create entry for new class',
                    message: 'Name of class',
                    prompt: {
                        model: '',
                        type: 'text',
                    },
                    cancel: true,
                    persistent: false,
                })
                    .onOk((data) => {
                        this.addClass({ name: data }).catch((err) => {
                            this.$q.dialog({
                                title: 'Invalid Submission',
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
    };
</script>

<style scoped>
    #it {
        margin-top: 100%;
    }
</style>
