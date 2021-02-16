<template>
    <q-page class="flex justify-center">
        <div class="column">
            <div class="row">
                <div class="text-center" style="margin-top: 80px;">
                    <h1>Know when to <u>stop trying</u>.</h1>
                </div>
            </div>
            <div class="row">
                <div class="column col-12 col-md-6" :class="{ 'items-center': $q.screen.lt.md }">
                    <div>
                        <div class="row" :class="{ 'justify-center': $q.screen.lt.md }">
                            <p>Sometimes, it becomes impossible to get an <u>A</u>.</p>
                        </div>
                        <div class="row" :class="{ 'justify-center': $q.screen.lt.md }">
                            <p><b>Stop wasting your time and know when to coast a B.</b></p>
                        </div>
                        <div class="row" :class="{ 'justify-center': $q.screen.lt.md }">
                            <div class="column col-6">
                                <div class="row items-center">
                                    <q-btn color="primary" size="lg" @click="$router.push('/app')">Get started</q-btn>
                                </div>
                                <div class="row items-center" :class="{ 'justify-center': $q.screen.lt.md }">
                                    <p style="margin-top: 15px;">No signup required</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column col-12 col-md-6 items-center" :style="{ 'padding-top': $q.screen.lt.md ? '50px' : 'none' }">
                    <div>
                        <div class="row">
                            <p style="margin-bottom: 40px;">Calculate your best and worst case scenario grades throughout the semester</p>
                        </div>
                        <div class="row">
                            <q-range
                                v-model="model"
                                :min="0"
                                :max="100"
                                :step="1"
                                :left-label-value="model.min + 'pts'"
                                :right-label-value="model.max + 'pts'"
                                label-always
                                color="info"
                            />
                        </div>
                        <div class="row">
                            <p><b>Find out if it's possible to get an A by getting above a X% on the final</b></p>
                        </div>
                        <div class="row">
                            <p>Or if you should focus on other classes instead.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="column bg-black text-white" style="width: 100%; padding-top: 180px;">
            <div class="row justify-center text-center">
                <h1>Like it <span class="bg-white text-black text-weight-bolder" style="padding: 13px">dark?</span></h1>
            </div>
            <div class="row justify-center">
                <h5><b>We got you covered.</b></h5>
            </div>
            <div class="row">
                <div class="column col-6 items-end">
                    <ul>
                        <li>100% Support for Dark Mode</li>
                        <li>Get started without an account.</li>
                        <li>Signed up on your phone? Log in on PC by scanning a QR code.</li>
                    </ul>
                </div>
                <div class="column col-6 items-start">
                    <ul>
                        <li>Designed for your Phone <b>&</b> PC.</li>
                        <li>Sync your data between devices with an account.</li>
                        <li>Supports English, 中文, và tiếng Việt.</li>
                    </ul>
                </div>
            </div>
        </div>
    </q-page>
</template>

<style lang="stylus">
    h1 {
        font-family: Georgia
    }
</style>

<script>
    export default {
        name: 'PageIndex',
        data() {
            return {
                model: {
                    min: 53,
                    max: 88.5,
                },
            };
        },
    };
</script>
