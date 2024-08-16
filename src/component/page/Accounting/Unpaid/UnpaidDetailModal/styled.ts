import ReactModal from "react-modal";
import styled from "styled-components";

export const UnpaidDetailModalStyled = styled(ReactModal)`
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
        width: 900px;
    }

    StyledTable {
        font-size: 15px !important;
    }

    /* 
    input[type="text"],
    input[type="password"],
    input[type="date"],
    input[type="email"],
    select {
        margin: 3px 0;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 15px;
    } */
`;
