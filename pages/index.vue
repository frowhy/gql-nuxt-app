<template>
    <section class="container">
        <div>
            <logo />
            <h1 class="title">
                gql-nuxt-app
            </h1>
            <h2 class="subtitle">
                A Nuxt application built by GraphQL
            </h2>
            <div class="links">
                <a
                    v-show="!getSinged"
                    class="button--green"
                    @click="signIn">{{ signInStatus }}</a>
                <a
                    v-show="getSinged"
                    class="button--grey"
                    @click="signOut">{{ signOutStatus }}</a>
            </div>
        </div>
    </section>
</template>

<script>
import Logo      from '~/components/Logo.vue'
import signInGQL from '~/gql/SignIn.gql'

export default {
    components: {
        Logo,
    },
    data() {
        return {
            email:         'frowhy@gmail.com',
            password:      'admin',
            signInData:    null,
            signInStatus:  "登录",
            signOutStatus: "注销",
        }
    },
    computed:   {
        getSinged() {
            return this.$store.state.isSigned === undefined
                   ? !!this.$apolloHelpers.getToken()
                   : this.$store.state.isSigned
        },
    },
    fetch({ app, params }) {

    },
    async asyncData(app) {
        // let [
        //         getOne,
        //         getTwo,
        //     ] = await Promise.all([
        //                               app.$axios.$get(''),
        //                               app.$axios.$get(''),
        //                           ])
        //
        // return {
        //     getOne,
        //     getTwo,
        // }
    },
    methods:    {
        async signIn() {
            let _this          = this
            _this.signInStatus = "登陆中..."

            const _result = await _this.$apollo.mutate({
                                                           mutation:  signInGQL,
                                                           variables: {
                                                               email:    _this.email,
                                                               password: _this.password,
                                                           },
                                                       })
            await _this.$apolloHelpers.onLogin(_result.data.signIn['accessToken'])
            _this.signInStatus = "登陆成功"
            _this.signInData   = _result.data.signIn

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 500)
            })

            _this.$store.commit('signed', true)
            _this.signOutStatus = "注销"
        },
        async signOut() {
            let _this           = this
            _this.signOutStatus = "注销中..."

            await _this.$apolloHelpers.onLogout()
            _this.signOutStatus = "注销成功"

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 500)
            })

            _this.$store.commit('signed', false)
            _this.signInStatus = "登陆"
        },
    },
}
</script>

<style scoped lang="scss">

.container {
    min-height      : 100vh;
    display         : flex;
    justify-content : center;
    align-items     : center;
    text-align      : center;
}

.title {
    font-family    : 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display        : block;
    font-weight    : 300;
    font-size      : 100px;
    color          : #35495e;
    letter-spacing : 1px;
}

.subtitle {
    font-weight    : 300;
    font-size      : 42px;
    color          : #526488;
    word-spacing   : 5px;
    padding-bottom : 15px;
}

.links {
    padding-top : 15px;

    a {
        &:hover {
            cursor : pointer;
        }
    }
}
</style>
