import * as process from "process";

export const ENTRYPOINT = typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_ENTRYPOINT : window.origin;
