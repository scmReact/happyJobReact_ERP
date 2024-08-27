import ReactModal from "react-modal";
import styled from "styled-components";

export const AccSlipModalStyled = styled(ReactModal)`
    width: 100%;
    height: 100%;
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

    .divCustName {
        display: flex;
        padding: 7px;
        margin-right: auto;
    }

    input[type="text"] {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 150px;
    }

    Button {
        height: 40px;
        display: flex;
        align-items: center;
    }
`;

export const AccSlipModalTableStyled = styled.table`
    border-collapse: collapse;
    margin-bottom: 20px;
    width: 600px;

    th,
    td {
        padding: 8px;
        border: 1px solid #ddd;
    }

    th {
        background-color: #2676bf;
        color: #ddd;
    }

    td {
        padding-left: 15px;
    }

    .thTotal {
        background-color: #ffffff;
        color: #000;
        padding-left: 15px;
    }
`;
