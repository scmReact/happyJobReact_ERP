import React, { useEffect, useState } from "react";
import { Button } from "../../../common/Button/Button";
import { IEmpSalePlanSearchList } from "../EmpSalePlanMain/EmpSalePlanMain";

interface EmpSalePlanModalProps {
  planNum?: number;
  onSuccess: () => void;
  setPlanNum: (num: number | undefined) => void;
  low: IEmpSalePlanSearchList;
}

export const EmpSearchDetailModal: React.FC<EmpSalePlanModalProps> = ({
  planNum,
  onSuccess,
  setPlanNum,
  low,
}) => {
  return (
    <>
      <Button>저장</Button>
      <Button></Button>
      <Button>취소</Button>
    </>
  );
};
