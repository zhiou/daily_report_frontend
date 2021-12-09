
import {list} from "../../api/department";


const state = () => ({
    all: [],
});


const actions = {
    list({commit}) {
        return new Promise((resolve, reject) => {
            list()
                .then((data) => {
                    commit("SET_ALL", data)
                    resolve();
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
};

const mutations = {
    SET_ALL: (state, departments) => {
        state.all = departments
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
