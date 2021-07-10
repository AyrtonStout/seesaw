import { writable } from "svelte/store";

const createConfigOpenStore = () => {
    return writable(false);
};

export default createConfigOpenStore();
