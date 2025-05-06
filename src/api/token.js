'use client'
// export const authToken =  localStorage.getItem("authToken");
export const authToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;