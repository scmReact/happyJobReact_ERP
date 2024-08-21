import ReactModal from "react-modal";
import styled from "styled-components";

export const BizPartnerModalStyled = styled(ReactModal)`
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .header {
        display: flex;
        align-items: center;
        padding: 16px;
        font-size: 20px;
        margin-right: auto;
    }

    .wrap {
        display: flex;
        min-width: 304px;
        padding: 16px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 12px;
        background: #fff;
        flex-direction: column;
    }

    select,
    input[type='text'] {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 80%;
        }
        
    input[type='text'].width_75 {
        width:75px;
    }

    input.width_120{
        width:120px;
    }

    .font_red {
        color:red;
    }

    .memo{
        width:650px;
        height:75px;
        resize:none;
    }
`;

export const BizPartnerModalTableStyled = styled.table`

    margin-bottom: auto;
    width:800px;
    
    tr:hover {
        background-color: #ffffff;
        opacity: 1;
        cursor: default;
    }

    th,
    td {
        padding: 8px;
        border-bottom: 1px solid #ddd;
        text-align: left;
    }

    th {
        background-color: #2676bf;
        color: #ddd;
        text-align: center;
    }

    button {
        background-color: #3bb2ea;
        width: unset;
        height: 51px;
        border: none;
        color: white;
        padding-top: 15px
        padding-bottom: 15px;
        padding-left: 10px;
        padding-right: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px #999;

        &:hover {
            background-color: #45a049;
        }

        &:active {
            background-color: #3e8e41;
            box-shadow: 0 2px #666;
            transform: translateY(2px);
        }
    }
`;