import styled from 'styled-components';

export const HeaderArea = styled.div`
    background-color: white;
    height:60px;
    border-bottom: 1px solid #CCC;
    .container{
        max-width:1000px;
        margin:auto;
        display:flex;
    }
    a {
        text-decoration: none;
    }
    .logo{
        flex:1;
        display:flex;
        align-items: center;
        height:60px;

        .logo-1,
        .logo-2,
        .logo-3{
            font-size: 32px;
            font-weight: bold;
        }
        .logo-1 { color: red;}
        .logo-2 { color: green;}
        .logo-3 { color: blue;}
    }
    nav{
        padding:8px 0px;

        ul, li{
            margin:0;
            padding:0;
            list-style:none;
        }

        ul{
            display:flex;
            align-items: center;
            height: 40px;
        }
        li{
            margin: 0px 16px;

            a, button{
                border:0;
                background: none;
                cursor:pointer;
                outline:0;
                color: #000;
                font-size:16px;
                text-decoration:none;

                &:hover{
                    color: #999;
                }

                &.button{
                    background-color:#FF8100;
                    border-radius:8px;
                    color: white;
                    padding: 8px 16px;   
                }
                &.button:hover{
                    background-color: #E57706;
                }
            }
        }
    }
    
`;