import axios, { AxiosResponse } from "axios";
import { BlogsType, BlogType } from "../redux/BlogsReducer";
import { getPostsTC, PostsType, PostType } from "../redux/PostsReducer";
import { UsersType, UserType } from "../redux/UserReducer";

// export const instance = axios.create({
//     baseURL: 'https://ht-02-03.vercel.app/api/',
//     headers: {
//         Authorization: "Basic YWRtaW46cXdlcnR5",
//     },
// })
export const AdminInstance = axios.create({
    baseURL: 'https://ht-02-03.vercel.app/api/',
    headers: {
        Authorization: "Basic YWRtaW46cXdlcnR5",
    },
})

//BlogsType
export type OneBlogResponseType = {
    id: string
    name: string
    description: string
    websiteUrl: string
}

export type AddBlogType = {
    name: string
    description: string
    websiteUrl: string
}

export type GetBlogsArgsType = {
    searchNameTerm?: string
    sortBy?: string
    sortDirection?: string
    pageNumber?: number
    pageSize?: number
}

//blogsAPI
export const blogsAPI = {

    getBlogs(args?: GetBlogsArgsType) {
        return AdminInstance.get<BlogsType>('blogs', { params: args })
    },
    getOneBlog(id: string) {
        return AdminInstance.get<{ id: string }, AxiosResponse<OneBlogResponseType>>(`blogs/${id}`)
    },
    getBlogPosts(blogId: string, args?: GetPostsArgsType) {
        return AdminInstance.get<PostsType>(`blogs/${blogId}/posts`, { params: args })
    },
    addBlog(fields: AddBlogType) {
        return AdminInstance.post<BlogType>('blogs', fields)
    },
    removeBlog(id: string) {
        return AdminInstance.delete(`blogs/${id}`)
    },
    updateBlog(id: string, param: AddBlogType) {
        return AdminInstance.put<BlogType>(`blogs/${id}`, param)
    }
}

//PostsType
export type CreatePostType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type GetPostsArgsType = {
    pageNumber?: number
    pageSize?: number
    sortBy?: string
    sortDirection?: string
    blogId?: string
}

///postsAPI
export const postsAPI = {
    getPosts(args: GetPostsArgsType) {
        return AdminInstance.get<PostsType>('posts', { params: args })
    },
    getPost(id: string) {
        return AdminInstance.get<PostType>(`posts/${id}`)
    },
    addPost(param: CreatePostType) {
        return AdminInstance.post<CreatePostType>(`posts`, param)
    },
    removePost(id: string) {
        return AdminInstance.delete(`posts/${id}`)
    },
    updatePost(id: string, param: CreatePostType) {
        return AdminInstance.put<CreatePostType>(`posts/${id}`, param)
    }
}

//UsersType
type getUsersArgsType = {
    sortBy?: string
    sortDirection?: string
    pageNumber?: number
    pageSize?: number
    searchLoginTerm?: string
    searchEmailTerm?: string
}

 export type addUserType = {
    login: string
    password: string
    email: string
}

//usersAPI
export const usersAPI = {
    getUsers(args: getUsersArgsType) {
        return AdminInstance.get<UsersType>(`users`, { params: args })
    },
    addUser(param: addUserType) {
        return AdminInstance.post<UserType>(`users`, param)
    },
    removeUser(id: string) {
        return AdminInstance.delete(`users/${id}`)
    }
}

export type LoginisationType = {
    loginOrEmail: string
    password: string
}
export const authApi = {
    logIn(param: LoginisationType) {
        return AdminInstance.post(`auth/login`, param)
    },
    authMe(accessToken: string | null) {
        return AdminInstance.get(`auth/me`, {headers: { Authorization: "Bearer " + accessToken,} } )
    }
}