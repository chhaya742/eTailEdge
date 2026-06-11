// import { json } from "express";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
export const authOptions = {
//     // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId:"4be9a56146baca2cfc15",
            clientSecret:"5959ac7f55f1080cc4540dce69d04c87596ebe88"
//             // The name to display on the sign in form (e.g. "Sign in with...")
//             name: "Credentials",
//             // `credentials` is used to generate a form on the sign in page.
//             // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//             // e.g. domain, username, password, 2FA token, etc.
//             // You can pass any HTML attribute to the <input> tag through the object.
//             credentials: {
//                 username: { label: "Username", type: "text", placeholder: "jsmith" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials, req) {
//                 const { username, password } = credentials;
//                 const fetch=await fetch("http://localhost:3000/api/authentication/login",{
//                     method:"POST",
//                     Headers:{
//                         "Content-Type":"application/json"
//                     },
//                     body:JSON.stringify({username,password})
//                 })
//                 const user = await res.json()
//                 if(res.ok && user){
//                     return user;
//                 }else{
//                     return null;
//                 }
//             }
        })
    ],
//     session:{
//         strategy:"jwt"
//     }
}

// export default NextAuth(authOptions)




// export default async function handler(req, res, next) {
// // async function verifyToken(request, response, next) {
//     console.log("&&&&&&&&&&&&&&&&&");
//     const bearerHeader = request.headers['authorization'];
//     try {
//         if (typeof bearerHeader !== 'undefined') {
//             const bearerToken = bearerHeader.split(' ')[1];
//             jwt.verify(bearerToken, JWT_CONFIGURATION.secretKey, (error, data) => {
//                 if (error && error instanceof jwt.TokenExpiredError) {
//                     request.headers['authorization'] = null;
//                     throw error;
//                 }
//                 else if (error) {
//                     throw error;
//                 }
//                 else {
//                     isResourceAuthorize(request).then((data) => {
//                         if (data)
//                             next();
//                         else throw new Error('Insufficient permissions.');
//                     }).catch((error) => {
//                         response.json({
//                             isError: true,
//                             message: error.message
//                         }).end();
//                         return;
//                     });
//                 }
//             });
//         }
//         else throw new Error('Missing authorization header.');
//     } catch (error) {
//         response.status(401).json({ isError: true, message: error.message });
//     }
// // }
// }
