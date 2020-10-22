import React from 'react';
import { HeaderArea } from './styles';
import { Link } from 'react-router-dom';
export default () => {
    return(
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <span className="logo-1">O</span>
                        <span className="logo-2">L</span>
                        <span className="logo-3">X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to="">Login</Link></li>
                        <li><Link to="">Cadastrar</Link></li>
                        <li><Link to="" className="button">Poste um anúncio</Link></li>
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    )
}