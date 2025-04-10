import { ID, Query } from "appwrite";
import { account, database } from "./config";
import APPWRITE_CONFIG from "./config";


export async function CREATE_BLOG({ title, body, category }) {
    try {

        const form = [title, body, category]

        if (form.some(field => field === '' || field === null || field === undefined)) {
            throw "All fields are required"
        }

        const owner = await account.get()

        const newBlog = await database.createDocument(
            APPWRITE_CONFIG.DB_ID,
            APPWRITE_CONFIG.BLOGS_COLLECTION_ID,
            ID.unique(),
            {
                title,
                body,
                owner: owner.$id,
                category
            }
        )

        if (newBlog) {
            return newBlog
        }

        throw "Failed to create blog"

    } catch (error) {
        console.log("Failed to create  blog", error.message)
        throw new Error("Failed to create  blog")
    }
}

export async function GET_BLOGS({ category }) {
    try {

        const blogs = await database.listDocuments(
            APPWRITE_CONFIG.DB_ID,
            APPWRITE_CONFIG.BLOGS_COLLECTION_ID,
            [
                Query.orderDesc('$createdAt'),
                Query.equal('category', category || '')
            ]
        )

        return blogs.documents || []

    } catch (error) {
        console.log("Failed to fetch blogs", error.message)
        throw new Error("Failed to fetch blogs")
    }
}

export async function CREATE_COMMENT({ blogId, body }) {
    try {

        const form = [blogId, body]

        if (form.some(field => field === '' || field === null || field === undefined)) {
            throw "All fields are required"
        }

        const owner = await account.get()

        const comment = await database.createDocument(
            APPWRITE_CONFIG.DB_ID,
            APPWRITE_CONFIG.COMMENTS_COLLECTION_ID,
            ID.unique(),
            {
                blog: blogId,
                body,
                owner: owner.$id
            }
        )

        if (comment) {
            return comment
        }

        throw "Failed to create comment"

    } catch (error) {
        console.log("Failed to create comment", error.message)
        throw new Error("Failed to create comment")
    }
}

export async function GET_BLOG_CATEGORIES() {
    try {

        const blogs = await database.listDocuments(
            APPWRITE_CONFIG.DB_ID,
            APPWRITE_CONFIG.BLOGS_COLLECTION_ID
        )

        const categories = [...new Set(blogs.documents.map(blog => blog.category))]
        return categories
        
    } catch (error) {
        console.log("Failed to fetch blog categories", error.message)
        throw new Error("Failed to fetch blog categories")
    }
}