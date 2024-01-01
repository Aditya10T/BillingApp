const mode = import.meta.env.VITE_MODE
export const myURL= mode==="dev" ? import.meta.env.VITE_URL : ""