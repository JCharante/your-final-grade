import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { Quasar } from 'quasar';
import messages from 'src/i18n';

Vue.use(VueI18n);

export default ({ app }) => {
    const locale = Quasar.lang.getLocale() || 'en-us'; // TODO: Load from cookies or headers
    const i18n = new VueI18n({
        locale,
        fallbackLocale: 'en-us',
        messages,
    });
    console.log('Locale Detected', locale);
    app.i18n = i18n;
};
