import styled from "styled-components";

export const EstMngStyled = styled.div`
    background-color: #e0e0e0;
    border: 1px solid #ccc;
    box-sizing: border-box;
    height: 120px;
    position: relative;

    .title {
        width: max-content;
        font-size: 30px;
        margin-left: 10px;
        font-weight: bold;
        z-index: 0px;
    }
`;

export const EstMngSearchStyled = styled.div`
    position: absolute;
    padding-left: 550px;
    margin-top: -40px;
    input,
    select {
        padding: 8px;
        margin-top: 10px;
        margin-right: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    label {
        padding-right: 10px;
    }

    .searchWrapper {
        padding: 5px 0;
        margin: 5px 10px;
    }

    .searchWrapper2 {
        float: right;
        margin: 1px 10px;
    }
`;
