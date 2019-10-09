<template>
    <q-layout view="hHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn v-if="$router.currentRoute.name === 'ClassView'" flat round dense icon="clear" @click="$router.push('/')"/>
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
            </q-toolbar>
        </q-header>

        <q-drawer v-model="drawerLeft"
                  :breakpoint="500"
                  :width="250"
                  show-if-above
                  content-class="">
            <div class="column" style="height: 100%">
                <div class="col" style="margin-top: 0px;">
                    <q-card flat>
                        <q-card-section class="text-center">
                            <div class="text-h6">Your Final Grade</div>
                            <div class="text-subtitle2">A tool built with love by</div>
                            <div class="text-subtitle2">(<a href="https://jcharante.com">Jyan</a>, Jack, and James)</div>
                        </q-card-section>

                        <q-separator dark inset />

                        <q-card-section>
                            <div class="text-center">
                                Our goal is to create the 🔥🔥 ultimate 🔥🔥 final 💪 grade 💯 calculator 🧮 for students 👩‍🎓  🎉
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <q-list dense>
                                <q-item-label header>Feature Roadmap:</q-item-label>
                                <q-item>
                                    <q-item-section avatar>
                                        <q-icon name="check_box"/>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>Offline Only Mode</q-item-label>
                                    </q-item-section>
                                    <q-item-section avatar>
                                        <q-icon name="cloud_off"/>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section avatar>
                                        <q-icon name="check_box_outline_blank"/>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>Sync Online</q-item-label>
                                    </q-item-section>
                                    <q-item-section avatar>
                                        <q-btn icon="plus_one" flat dense/>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section avatar>
                                        <q-icon name="check_box_outline_blank"/>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>Dark Mode</q-item-label>
                                    </q-item-section>
                                    <q-item-section avatar>
                                        <q-btn icon="plus_one" flat dense/>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card-section>
                        <q-separator insert dark/>
                        <q-card-section>
                            <div class="text-center">
                                Found a bug? Have feature suggestions? Do we not support your grading system? Email Jyan at yfg@jcharante.com
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col"></div>
                <div class="col-1 row justify-start">
                    <q-btn v-if="isProbablySignedIn"
                           flat
                           @click="logout().then($router.push('/login'))"
                           color="accent"
                           icon="exit_to_app">{{ $t('logout') }}</q-btn>
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
            ]),
        },
        methods: {
            ...mapActions([
                'logout',
                'setLocale',
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
                enus: ENUS,
                zhhans: ZHHANS,
                router: this.$router,
            };
        },
    };
</script>

<style>
</style>
