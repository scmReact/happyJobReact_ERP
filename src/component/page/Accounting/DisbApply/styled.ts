import styled from "styled-components";
import ReactModal from "react-modal";

export const DisbApplyModalStyled = styled(ReactModal)`
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
        min-width: 1000px;
        padding: 16px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 12px;
        background: #fff;
        flex-direction: column;
    }

    input[type="text"],
    input[type="date"],
    select {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 100px;
    }

    tbody tr:hover {
        background-color: #ffffff;
        opacity: 1;
        cursor: default;
    }

    textarea {
        width: 100%;
        height: 100px;
        resize: none;
    }

    span.font_red {
        color: red;
    }
`;

export const DisbApplySearchStyled = styled.div`
    margin-bottom: 10px;
    margin-top: 60px;
    margin-left: -450px;
    float: right;

    input,
    select {
        width: 100px;
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .selectbox {
        margin-right: 10px;
    }
`;
