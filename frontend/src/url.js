const mode = import.meta.env.VITE_MODE
export const URL= mode==="Dev" ? import.meta.env.VITE_URL : ""