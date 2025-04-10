import { ID } from "appwrite";
import { account, database } from "./config";
import APPWRITE_CONFIG from "./config";

export async function CREATE_ACCOUNT({ name, username, email, password }) {
    try {

        const form = [name, username, email, password]

        if (form.some(field => field === '' || field === null || field === undefined)) {
            throw "All fields are required"
        }

        const authAccount = await account.create(ID.unique(), email, password, name)

        if (authAccount) {

            const formattedUsername = username
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^a-zA-Z0-9_]/g, '')
                .toLowerCase();

            const dbAccount = await database.createDocument(
                APPWRITE_CONFIG.DB_ID,
                APPWRITE_CONFIG.USERS_COLLECTION_ID,
                authAccount.$id,
                {
                    name,
                    email,
                    username: formattedUsername
                }
            )

            if (!dbAccount) {
                throw "Failed to create account in database"
            }

            console.log("ACCOUNT CREATED", dbAccount)
            return dbAccount
        }

        throw "Failed to create account"

    } catch (error) {
        console.log("Failed to create account", error.message)
        throw new Error("Failed to create account")
    }
}

export async function LOGIN_ACCOUNT({ email, password }) {
    try {

        const form = [email, password]

        if (form.some(field => field === '' || field === null || field === undefined)) {
            throw "All fields are required"
        }

        const userAccount = await account.createEmailPasswordSession(email, password)

        if (userAccount) {
            return userAccount
        }

        throw "Failed to login account"

    } catch (error) {
        console.log("Failed to login account", error.message)
        throw new Error("Failed to login account")
    }
}

export async function LOGOUT_ACCOUNT() {
    try {

        return await account.deleteSession('current')

    } catch (error) {
        console.log("Failed to logout account", error.message)
        throw new Error("Failed to logout account")
    }
}

export async function GET_ACCOUNT() {
    try {

        const authAccount = await account.get()

        if(authAccount) {
            const dbAccount = await database.getDocument(
                APPWRITE_CONFIG.DB_ID,
                APPWRITE_CONFIG.USERS_COLLECTION_ID,
                authAccount.$id
            )

            return dbAccount
        }

        throw "Failed to fetch user details"

    } catch (error) {
        console.log("Failed to fetch user details", error.message)
        throw new Error("Failed to fetch user details")
    }
}