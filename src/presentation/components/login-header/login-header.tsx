import Logo from "@/presentation/components/logo/logo"
import React from 'react'
import Styles from './login-header-styles.scss'

const LoginHeader: React.FC = () => {
    return (
        <header className={Styles.header}>
                <Logo/>
                <h1>4dev Enquete para Programadores</h1>
        </header>   
    )
}
export default LoginHeader
