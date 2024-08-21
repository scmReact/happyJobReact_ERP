import ReactModal from "react-modal";
import styled from "styled-components";

export const VctnApproveModalStyled = styled(ReactModal)`
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

    input[type="date"],
    textarea {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 100px;
    }

    textarea {
        width: 94%;
        height: 70px;
    }

    p,
    label {
        margin-bottom: 20px;
    }
`;

export const VctnApproveModalTableStyled = styled.table`
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

    .button-container {
        display: flex;
        justify-content: flex-end;
    }
`;

export const VctnApproveButton = styled.button<{ $backcolor?: string }>`
    padding: 8px 16px;
    background-color: ${(props) => (props.$backcolor ? props.$backcolor : "#3bb2ea")};
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin-right: 5px;
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
`;
