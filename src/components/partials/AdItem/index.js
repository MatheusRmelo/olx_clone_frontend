import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from './styles';

export default (props)=>{
    let price = '';

    if(props.data.priceNegotiable){
        price = 'Preço negociável';
    }else{
        price = `${props.data.price.toFixed()}`;
    }

    return(
        <Item className="adItem">
            <Link to={`ad/${props.data.id}`}>
                <div className="itemImage">
                    <img src={props.data.image} alt="" />
                </div>
                <div className="itemName">{props.data.title}</div>
                <div className="itemPrice">R$ {price}</div>
            </Link>
        </Item>
    )
}