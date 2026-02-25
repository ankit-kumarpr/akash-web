import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    tagTypes: [
        "Auth",
        "Profile",
        "Blogs"
    ],

    baseQuery: fetchBaseQuery({
        // baseUrl: "https://backend-createch.onrender.com/api/",
        baseUrl: "https://akash-backend-75iv.onrender.com/api/",
        // baseUrl: "https://api.ssbwithisv.in/api/",
        // baseUrl: "https://learning-admin-panel-backend.onrender.com/api/v1/",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("authToken");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({



        /** 👤 Get current user profile */
        getTerm: builder.query({
            query: () => "team",
            providesTags: ["Profile"],
        }),

        getBlogs: builder.query({
            query: () => "blogs",
            providesTags: ["Profile"],
        }),
        
        getBlogsById: builder.query({
            query: (id) => `blogs/${id}`,
            providesTags: ["Profile"],
        }),

        getCareer: builder.query({
            query: () => "career",
            providesTags: ["Profile"],
        }),



        // ==================== 🔐 PERMISSIONS ====================

        /** ✨ Create new permission (Superadmin only) */



    }),
});

// ==================== 🎯 EXPORT HOOKS ====================

export const {
    // 🔐 Auth

    // useGetTermQury

    useGetTermQuery,
    useGetBlogsQuery,
    useGetCareerQuery,
    useGetBlogsByIdQuery


} = api;