import Vuex from 'vuex'

export default () => {
    return new Vuex.Store({
                              state:     () => (
                                  { isSigned: undefined }
                              ),
                              mutations: {
                                  signed(state, status) {
                                      state.isSigned = status
                                  },
                              },
                          })
}
