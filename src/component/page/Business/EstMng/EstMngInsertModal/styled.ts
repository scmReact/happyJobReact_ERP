import ReactModal from "react-modal";
import styled from "styled-components";

export const EstMngInsertModalStyled = styled(ReactModal)`
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
        font-size: 30px;
    }

    .wrap {
        display: flex;
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
        margin: 3px 0;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 15px;
        width: 175px;
    }

    .btn-group {
        margin-left: auto;
    }
`;

export const EstMngInsertModalTableStyled = styled.table`
    .main {
        display: flex;
        column-gap: 10px;
        height: 55px;
        padding: 1px 0;
    }

    .title {
        width: 125px;
        background-color: #2676bf;
        color: #ddd;
        padding: 15px;
        border-bottom: 1px solid #ddd;
        display: flex;
        text-align: center;
        justify-content: center;
    }

    span {
        color: red;
    }

    .sizeS {
        width: 130px !important;
    }

    .sizeM {
        width: 157px !important;
    }

    .sizeM2 {
        width: 172px !important;
    }

    .sizeL {
        width: 200px !important;
    }
    .itemStyle {
        background-color: #eee;
    }
`;
