import styled from 'styled-components';

export const VctnCalendarDetailStyled = styled.div`
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
        width: 400px;
    }
    .title{
    height: 40px;
    line-height: 40px;
    padding: 0px 20px;
    background-color: #3e4463;
    color: white;
   }
    .content{
        padding: 20px 30px;
    }
    th{
        padding: 17px;
        width: 90px;
        position: relative;
        height: 10px;
        border: 1px solid #bbc2cd;
        font-weight: bold;
        text-align: center;
    }
    .head{
        height: 40px;
        line-height: 40px;
        padding: 0px 20px;
        background-color: #3e4463;
        color: white;
    }
    td{
        text-align: right;
        height: 27px;
        padding: 5px 10px;
        border: 1px solid #bbc2cd;
        color: #868686;
        text-align: center;
    }
    thead{
        border: 1px solid #e5e5e5;
        background: #dce1e6;
    }
    .modalMiddle{
        width: 60%;
        margin: 0 auto;
        padding: 20px;
    }
    #select_storage{
        float: left;
    }
    .select_storage_count{
        margin-left: 200px;
    }
    .x{
        float: right;
        cursor: pointer;
    }
    .buttonDiv{
        margin-left: 86%;
    }
`