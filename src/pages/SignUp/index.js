import React, { useState, useEffect } from 'react';
import { PageArea } from './styles';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

import useApi from '../../helpers/OlxApi'
import { doLogin } from '../../helpers/AuthHeader';

export default () => {
    const api = useApi();
    
    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [stateList, setStateList] = useState([]);
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisable(true);
        setError('');

        if(password !== confirmPassword){
            setError('Senhas não batem');
            setDisable(false);
            return;
        }
        const json = await api.register(name, email, password, stateLoc);
        if(json.error){
            setError(json.error);
        }else{
            doLogin(json.token);  
            window.location.href = "/";
        }

        setDisable(false);
    }
    return(
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                {
                    error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title">Nome completo</div>
                        <div className="area-input">
                            <input required value={name} onChange={e=>setName(e.target.value)} type="text" disabled={disable} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Estado</div>
                        <div className="area-input">
                            <select value={stateLoc} onChange={e=>setStateLoc(e.target.value)} required>
                                <option></option>
                                {stateList.map((i,k)=>(
                                    <option key={k} value={i._id}>{i.name}</option>
                                ))}
                            </select>
                        </div>
                    </label>
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
                        <div className="area-title">Confirmar senha</div>
                        <div className="area-input">
                            <input required value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} type="password" disabled={disable}/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"></div>
                        <div className="area-input">
                            <button disabled={disable}>Fazer cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}