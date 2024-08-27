import styled from 'styled-components';

export const MonthlyModalMainStyled = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrep;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    font-weight: bold;

    .container {
    border: 3px solid #3e4463;
    background-color: #f3f3f3;
    width: 1000px;
    height: 500px;
    }

    .chart{
        height: 60%;
        float : left;
        width:40%;
        margin:5%;
    }
    table{
        width:40%;
        margin:5%;
        float : right;
    }
    .button{
        margin-left : 900px
    }
    
`;