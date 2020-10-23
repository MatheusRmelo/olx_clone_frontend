import styled from 'styled-components';

export const PageArea = styled.div`



    form {
        background-color: white;
        border-radius:8px;
        padding:8px;
        box-shadow: 0px 0px 3px #999;
    
        .area{
            display: flex;
            align-items: center;
            padding:8px;
            max-width:500px;

            .area-title{
                width:200px;
                text-align: right;
                padding-right: 16px;
                font-weight: bold;
                font-size:16px;
            }
            .area-input{
                flex:1;

                input {
                    
                    font-size:16px;
                    padding:8px;
                    border: 1px solid #DDD;
                    border-radius:8px;
                    outline: 0;
                    transition: all ease 0.4s;

                    &:focus{
                        border: 1px solid #333;
                        color:#333; 
                    }
                }

                button {
                    background-color:#0089FF;
                    border:0;
                    outline:0;
                    padding:8px 16px;
                    border-radius:8px;
                    color: white;
                    font-size: 16px;
                    cursor:pointer;
                    text-transform: uppercase;

                    &:hover{
                        background-color: #006FCE;
                    }
                }
            }
        }
    }
`;