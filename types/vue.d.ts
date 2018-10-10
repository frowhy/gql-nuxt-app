/**
 * Extends interfaces in Vue.js
 */

import { ApolloHelpers } from "./index";

declare module "vue/types/vue" {
    interface Vue {
        $apolloHelpers: ApolloHelpers<any>;
    }
}
