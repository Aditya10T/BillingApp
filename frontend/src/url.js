const mode = import.meta.env.VITE_MODE
export const URL= mode==="dev" ? import.meta.env.VITE_URL : ""