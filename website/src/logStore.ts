import { writable } from "svelte/store";
import type { LogLine } from "./LogLyfe";

const createLogStore = () => {
    const { set, subscribe } = writable(new Array<LogLine>());

    return {
        set,
        subscribe,
    };
};

export default createLogStore();
