import { ref, reactive } from "vue";
import data from "./TableData.json";

export default function () {
    const selectedId = ref(0);
    const rows = ref(data);
    const state = reactive({
        user: {
            id: null,
            name: null,
            phone: null,
            email: null,
            adress: null,
            postalZip: null,
        }
    });

    const userNullfy = () => {
        setTimeout(() => {
            state.user = {
                id: null,
                name: null,
                phone: null,
                email: null,
                adress: null,
                postalZip: null,
            };
        }, 500);
    };

    const addUser = async () => {
        state.user.id = await (rows.value.reduce((a, b) => {
            return a.id > b.id ? a.id : b.id;
        }) + 1);
        rows.value.push(state.user);
        userNullfy();
    };

    const updateUser = () => {
        const index = rows.value.findIndex((t) => t.id === state.user.id);
        rows.value[index] = state.user;
        userNullfy();
    };

    const deleteUser = async () => {
        rows.value = await rows.value.filter((t) => t.id !== selectedId.value);
        selectedId.value = null;
    };

    return { selectedId, rows, state, addUser, updateUser, deleteUser };
}