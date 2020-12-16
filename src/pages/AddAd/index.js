import React, { useState, useRef, useEffect } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { PageArea } from './styles';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

import useApi from '../../helpers/OlxApi'
import { doLogin } from '../../helpers/AuthHeader';
import { useHistory } from 'react-router-dom';

export default () => {
    const history = useHistory();
    const api = useApi();
    const fileField = useRef();

    const [categories, setCategories] = useState([]);
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');

    const [disable, setDisable] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        const getCategories = async ()=>{
            const cats = await api.getCategories();
            setCategories(cats);
        }

        getCategories();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisable(true);
        setError('');
        let errors = [];

        if(!title.trim()){
            errors.push('Sem título');
        }

        if(!category){
            errors.push('Sem categoria');
        } 

        if(errors.length === 0){
            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', desc);
            fData.append('cat', category);

            if(fileField.current.files.length>0){
                for(let i=0;i<fileField.current.files.length;i++){
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await api.addAd(fData);

            if(!json.error){
                history.push(`/ad/${json.id}`);
                return;
            }
            setError(json.error);

        }else{
            setError(errors.join("/n"));
        }

        setDisable(false);
        
    }

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    });

    return(
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                {
                    error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title">Título</div>
                        <div className="area-input">
                            <input required value={title} onChange={e=>setTitle(e.target.value)} type="text" disabled={disable} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Categoria</div>
                        <div className="area-input">
                            <select disabled={disable} onChange={e=>setCategory(e.target.value)} required>
                                <option></option>
                                {categories && categories.map((i)=>(
                                    <option key={i._id} value={i._id}>{i.name}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Preço</div>
                        <div className="area-input">
                            <MaskedInput mask={priceMask} placeholder="R$ " disabled={disable || priceNegotiable} value={price} onChange={e=>setPrice(e.target.value)} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Preço negociável</div>
                        <div className="area-input">
                            <input type="checkbox" checked={priceNegotiable} onChange={e=>setPriceNegotiable(prevState=>!prevState)} disabled={disable} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Descrição</div>
                        <div className="area-input">
                            <textarea disabled={disable} value={desc} onChange={e=>setDesc(e.target.value)}></textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Imagens (1 ou mais)</div>
                        <div className="area-input">
                            <input type="file" disabled={disable} multiple ref={fileField} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"></div>
                        <div className="area-input">
                            <button disabled={disable}>ADICIONAR ANÚNCIO</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}