<template>
    <q-layout view="hHh LpR lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn v-if="$router.currentRoute.name === 'ClassView' || $router.currentRoute.name === 'Scan'" flat round dense icon="clear" @click="$router.push('/app/')"/>
                <q-btn v-else @click="drawerLeft = !drawerLeft" flat round dense icon="menu" />
                <q-toolbar-title>
                    {{ pageTitle }}
                </q-toolbar-title>

                <div></div>
                <q-btn flat
                       @click="toggleLang"
                >
                    {{ $i18n.locale === 'zh-cn' ? enus.nativeName : zhhans.nativeName }}
                </q-btn>
                <q-btn flat icon="linked_camera" @click="$router.push('/app/scan')"/>
                <q-btn flat icon="share" @click="rightDrawer = !rightDrawer"/>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="drawerLeft"
                  :breakpoint="500"
                  :width="250"
                  show-if-above
                  content-class="">
            <div :class="{column: true, 'bg-grey-10': getDarkModeEnabled}" style="height: 99%">
                <div class="col" style="margin-top: 0px;">
                    <q-card flat :dark="getDarkModeEnabled">
                        <q-card-section class="text-center">
                            <div class="text-h6">{{ $t('your_final_grade') }}</div>
                            <div class="text-subtitle2">{{ $t('a_tool_built_with_love_by') }}</div>
                            <div class="text-subtitle2" v-if="$i18n.locale === 'en-us'">
                                (<a href="https://jcharante.com">Jyan</a>, Jack, and James)
                            </div>
                            <div class="text-subtitle2" v-else>
                                (<a href="https://jcharante.com">张坚</a>, 杨亦诚和机米)
                            </div>
                        </q-card-section>

                        <q-card-section>
                            <div class="text-center">
                                {{ $t('our_goal') }}
                            </div>
                        </q-card-section>
                        <q-separator insert dark/>
                        <q-card-section>
                            <div class="text-center">
                                {{ $t('cta') }}
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col"></div>
                <div class="col-3 row justify-start items-end">
                    <q-card flat :dark="getDarkModeEnabled" :class="{'bg-grey-10': getDarkModeEnabled}">
                        <q-card-section>
                            <q-toggle v-model="enableOnlineSync"
                                      :disable="getSessionKey === 'unregistered'"
                                      :label="$t('enable_online_sync')"/>
                        </q-card-section>
                        <q-card-section>
                            <q-btn v-if="isProbablySignedIn"
                                   flat
                                   @click="userLogout().then(dataLogout()).then(appLogout()).then($router.push('/app/login'))"
                                   color="accent"
                                   :dark="getDarkModeEnabled"
                                   icon="exit_to_app">{{ $t('logout') }}</q-btn>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </q-drawer>

        <q-drawer v-model="rightDrawer"
                  side="right"
                  show-if-above
                  :width="350">
            <div class="column" style="max-width: 96%; margin: auto;">
                <div class="row">
                    <h5>{{ $t('yfg_user_guide') }}</h5>
                </div>
                <div class="row">
                    <p><b>Adding classes.</b> To start out using YFG, first create a class entry. You can create as many
                    as you'd like. Afterwards, click on one of the classes to continue.</p>
                </div>
                <div class="row justify-center">
                    <q-btn :label="$t('add_class')" outline icon="add" color="info"/>
                </div>
                <div class="row text-center">
                    <p style="margin-top: 15px;">The button looks like this and is located in the bottom-right corner.</p>
                </div>
                <div class="row">
                    <p><b>Adding Categories.</b> Once on a class page, you need to add categories in order to help
                    calculate your grade. These categories may be things like 'Homework', 'Labs', 'Final Exam', 'Quizzes'. </p>
                </div>
                <div class="row justify-center">
                    <q-btn :label="$t('add_category')" outline color="info" icon="add"/>
                </div>
                <div class="row text-center">
                    <p style="margin-top: 15px;">The button looks like this and is located in the bottom-right corner.</p>
                </div>
                <div class="row">
                    <p><b>Adding assignments.</b> For each category, you'll need to enter your assignments. These may
                    be homework assignments or quizzes. If you only have 2 quiz results but you expect to take 5 and
                    have the lowest grade dropped, then make sure the category is set to drop the lowest 1 grade, and
                    add 5 quiz assignments. There is a toggle switch for assignments that are not yet graded.</p>
                    <q-item>
                        <q-item-section>
                            <q-item-label><b>Example Category</b></q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>90.00%</q-item-label>
                            <q-item-label caption>18.00% / 20.00%</q-item-label>
                        </q-item-section>
                        <q-item-section avatar>
                            <q-btn icon="add" dense flat color="red"/>
                        </q-item-section>
                        <q-item-section avatar>
                            <q-btn icon="more_vert" flat dense>
                            </q-btn>
                        </q-item-section>
                    </q-item>
                </div>
                <div class="row text-center">
                    <p style="margin-top: 15px;">Colored red for emphasis. Each category has a button for entering assignments.</p>
                </div>
            </div>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ENUS from 'quasar/lang/en-us';

    import ZHHANS from 'quasar/lang/zh-hans';

    export default {
        name: 'MyLayout',
        computed: {
            ...mapGetters([
                'isProbablySignedIn',
                'pageTitle',
                'getDarkModeEnabled',
                'getEnableOnlineSync',
                'getSessionKey',
            ]),
            displayVoting() {
                return false;
            },
            darkModeEnabled: {
                set(enabled) {
                    this.setDarkModeEnabled({ enabled });
                },
                get() {
                    return this.getDarkModeEnabled;
                },
            },
            enableOnlineSync: {
                set(enabled) {
                    this.setEnableOnlineSync({ enabled });
                },
                get() {
                    return this.getEnableOnlineSync;
                },
            },
        },
        mounted() {
            // eslint-disable-next-line new-cap
            this.qrcode = new this.$qrcode("qrcode", {
                width: 200,
                height: 200,
                colorDark: "#ac2b37",
                colorLight: "#fff",
            });
            this.qrcode.makeCode(window.location.origin);
        },
        methods: {
            ...mapActions([
                'userLogout',
                'appLogout',
                'dataLogout',
                'setLocale',
                'setDarkModeEnabled',
                'setEnableOnlineSync',
            ]),
            toggleLang() {
                const currentLocale = this.$i18n.locale;
                const newLocale = currentLocale === 'en-us' ? 'zh-cn' : 'en-us';
                this.$i18n.locale = newLocale;
                this.lang.set(newLocale === 'en-us' ? ENUS : ZHHANS);
                this.setLocale({ locale: newLocale });
            },
        },
        data() {
            return {
                lang: this.$q.lang,
                i18n: this.$i18n,
                drawerLeft: false,
                rightDrawer: false,
                enus: ENUS,
                zhhans: ZHHANS,
                router: this.$router,
                qrcode: null,
            };
        },
    };
</script>

<style>
</style>
