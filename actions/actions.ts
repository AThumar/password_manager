
"use server"
import { clerkClient } from '@clerk/nextjs/server'

interface Password {
    cardNo: string;
    expiry: string;
    cvv: number;
}

export async function addCardServer(cardNo: string, expiry: string, cvv: number, userId: string) {

    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    let passwords: Password[] = []
    if (Array.isArray(user.privateMetadata.passwords)) {
        passwords = user.privateMetadata.passwords || []
        passwords.push({ cardNo, expiry, cvv })

    }
    await client.users.updateUserMetadata(userId, {
        privateMetadata: {
            passwords: passwords || []
        },
    })

}


// "use server"
// import { clerkClient } from '@clerk/nextjs/server'

// interface Password {
//     cardNo: string;
//     expiry: string;
//     cvv: number;
// }

// export async function addCardServer(cardNo: string, expiry: string, cvv: number, userId: string) {let
//     try {
//         const client = await clerkClient();
//         const user = await client.users.getUser(userId);

//         const newPassword: Password = {
//             cardNo,
//             expiry,
//             cvv,
//         };

//         await client.users.updateUserMetadata(userId, (currentMetadata: any) => {
//             const privateMetadata: any = currentMetadata || {};
//             const passwords = privateMetadata.passwords || [];
//             passwords.push(newPassword);
//             return {
//                 ...privateMetadata,
//                 passwords,
//             };
//         });

//         const updatedUser = await client.users.getUser(userId);
//         console.log(updatedUser.privateMetadata);

//     } catch (error) {
//         console.error("Error adding card:", error);
//         throw error;
//     }
// }