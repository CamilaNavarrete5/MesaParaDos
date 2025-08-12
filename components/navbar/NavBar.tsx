import Link from "next/link"
import { ActiveLink } from "../active-link/ActiveLink"
import Image from "next/image"
import { UserButton } from "./UserButton"


const navItems = [
    { path: '/', text: 'Home' },
    { path: '/review', text: 'Reseñas' },
    { path: '/map', text: 'Mapa' },
    { path: '/recipe', text: 'Recetario' },


]


export const NavBar = () => {
    return (
        <nav className="flex items-center bg-[#B5C18E] bg-opacity-30 p-2 m-2 rounded justify-between ">
            <div className="flex">
                <Image
                    src="/logo.png"
                    alt="Logo de mi sitio"
                    width={50}
                    height={50}
                />
            </div>



            <div className="flex">

                {
                    navItems.map(navItem => (
                        <ActiveLink key={navItem.path} {...navItem} />
                    ))
                }

            </div>

            <UserButton/>

        </nav>
    )
}


