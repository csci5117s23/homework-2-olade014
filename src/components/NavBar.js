import Link from 'next/link'
import { useClerk } from "@clerk/clerk-react";

export default function NavBar(){

    async function signOut(){
        await window.Clerk.signOut();
    }

    return(
        <>  
            <div className="nav-container">
                <Link className="nav-link todo" href="/todos">Todo</Link>
                <Link className="nav-link done" href="/done">Done</Link>
                <button className="nav-link logout" onClick={() => signOut()}>Logout</button>
            </div>
        </>
    )
}