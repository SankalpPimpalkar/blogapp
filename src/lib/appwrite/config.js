import { Client, Databases, Storage, Account } from "appwrite"

const APPWRITE_CONFIG = {
    PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    DB_ID: process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
    USERS_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLL_ID,
    BLOGS_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_BLOGS_COLL_ID,
    COMMENTS_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLL_ID,
    AVATARS_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_AVATARS_BUCKET_ID,
    PROJECT_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
}

export default APPWRITE_CONFIG

const client = new Client()
client
    .setEndpoint(APPWRITE_CONFIG.PROJECT_ENDPOINT)
    .setProject(APPWRITE_CONFIG.PROJECT_ID)

export const account = new Account(client)
export const database = new Databases(client)
export const storage = new Storage(client)