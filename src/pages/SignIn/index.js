import React, { useState } from 'react';
import { PageArea } from './styles';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

import useApi from '../../helpers/OlxApi'
import { doLogin } from '../../helpers/AuthHeader';

export default () => {
    const api = useApi();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisable(true);

        const json = await api.login(email, password);
        if(json.error){
            setError(json.error);
        }else{
            doLogin(json.token, rememberPassword);  
            window.location.href = "/";
        }
    }
    return(
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {
                    error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title">E-mail</div>
                        <div className="area-input">
                            <input required value={email} onChange={e=>setEmail(e.target.value)} type="email" disabled={disable} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Senha</div>
                        <div className="area-input">
                            <input required value={password} onChange={e=>setPassword(e.target.value)} type="password" disabled={disable}/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Lembrar senha</div>
                        <div className="area-input">
                            <input checked={rememberPassword} onChange={()=>setRememberPassword(!rememberPassword)} type="checkbox" disabled={disable}/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"></div>
                        <div className="area-input">
                            <button disabled={disable}>Fazer login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}