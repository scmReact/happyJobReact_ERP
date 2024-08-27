import styled from "styled-components";

export const EmpSalePlanModalStyled = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  font-family: Arial, sans-serif;
  font-weight: 400;

  .container {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
    position: relative;
    width: 500px;
    max-width: 90%;
    overflow-y: auto;
    max-height: 80%;
    display: flex;
    flex-direction: column;
  }

  .head {
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  .head strong {
    font-size: 1.5em;
    color: #333;
  }

  label {
    font-weight: bold;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    position: relative;
  }

  span.required {
    color: red;
    font-size: 1em;
  }

  input[type="text"],
  input[type="date"],
  input[type="number"],
  textarea,
  select {
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 1em;
  }

  select {
    background-color: #f9f9f9;
    color: #333;
  }

  textarea {
    resize: vertical;
  }

  .buttonDiv {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  button {
    background-color: #007bff;
    border: none;
    color: #fff;
    padding: 10px 20px;
    font-size: 1em;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px rgba(0, 0, 0, 0.2);
  }

  button:hover {
    background-color: #0056b3;
  }

  button:active {
    background-color: #004085;
    box-shadow: 0 2px rgba(0, 0, 0, 0.2);
    transform: translateY(1px);
  }
`;
