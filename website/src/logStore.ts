import { writable } from "svelte/store";
import type { LogLine } from "./LogLyfe";

const createLogStore = () => {
    return writable(new Array<LogLine>());
};

export default createLogStore();
