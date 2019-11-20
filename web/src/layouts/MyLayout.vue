<template>
    <q-layout view="hHh LpR lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn v-if="$router.currentRoute.name === 'ClassView' || $router.currentRoute.name === 'Scan'" flat round dense icon="clear" @click="$router.push('/')"/>
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
                <q-btn flat icon="linked_camera" @click="$router.push('/scan')"/>
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
                        <q-card-section>
                            <q-list dense>
                                <q-item-label header>{{ $t('feature_roadmap')}}:</q-item-label>
                                <q-item>
                                    <q-item-section avatar>
                                        <q-icon name="check_box"/>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>{{ $t('offline_only_mode') }}</q-item-label>
                                    </q-item-section>
                                    <q-item-section avatar>
                                        <q-icon name="cloud_off"/>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section avatar>
                                        <q-icon name="check_box"/>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>{{ $t('sync_online') }}</q-item-label>
                                    </q-item-section>
                                    <q-item-section avatar>
                                        <q-icon name="cloud"/>
                                    </q-item-section>
                                    <q-item-section avatar v-if="displayVoting">
                                        <q-btn icon="plus_one" flat dense/>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section avatar>
                                        <q-icon name="check_box_outline_blank"/>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>{{ $t('dark_mode') }}</q-item-label>
                                    </q-item-section>
                                    <q-item-section avatar v-if="displayVoting">
                                        <q-btn icon="plus_one" flat dense/>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section avatar>
                                        <q-icon name="check_box_outline_blank"/>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>{{ $t('signin_with_google') }}</q-item-label>
                                    </q-item-section>
                                    <q-item-section avatar v-if="displayVoting">
                                        <q-btn icon="plus_one" flat dense/>
                                    </q-item-section>
                                </q-item>
                            </q-list>
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
                            <q-toggle v-if="isProbablySignedIn"
                                      v-model="darkModeEnabled"
                                      :dark="getDarkModeEnabled"
                                      disable
                                      :label="$t('dark_mode')"/>
                        </q-card-section>
                        <q-card-section>
                            <q-toggle v-model="enableOnlineSync"
                                      :disable="getSessionKey === 'unregistered'"
                                      :label="$t('enable_online_sync')"/>
                        </q-card-section>
                        <q-card-section>
                            <q-btn v-if="isProbablySignedIn"
                                   flat
                                   @click="userLogout().then(dataLogout()).then(appLogout()).then($router.push('/login'))"
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
                  :width="250">
            <div class="column justify-center items-center" style="height: 95%">
                <div class="col-6">
                    <q-card flat>
                        <q-card-section>
                            <p class="text-center">{{ $t('share_site_with_friend') }}</p>
                        </q-card-section>
                        <q-card-section>
                            <div id="qrcode"></div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
    import qrcode from 'qrcodejs2';

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
            this.qrcode = new qrcode("qrcode", {
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
