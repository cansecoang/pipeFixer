import { signInWithPopup } from "firebase/auth";

const auth = firebase.auth();
const provider = new firebase.auth.googleAuthProvider();

auth.languagecode ="es";

export async function login (){
    try{
        const response = await auth.signInWithPopup(provider);
        console.log(response);
        return response.user;
    }catch(error){
        throw new error(error);
    }
}

export function logout(){
    auth.singOut();
}