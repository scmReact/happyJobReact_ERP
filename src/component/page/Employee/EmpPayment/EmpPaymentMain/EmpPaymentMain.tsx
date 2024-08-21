import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { EmpPaymentContext } from '../../../../../api/provider/EmpPaymentProvider';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../../stores/modalState';
import { IEmpPaymentList, IPostResponse, ISalaryApprove, ISearchEmpPayment } from '../../../../../models/interface/EmpPayment/empPaymentModel';
import { postComnApi } from '../../../../../api/postComnApi';
import { EmpPaymentApi } from '../../../../../api/api';
import { EmpPaymentMainStyled } from './styled';
import { Button } from '../../../../common/Button/Button';
import { StyledTable, StyledTd, StyledTh } from '../../../../common/styled/StyledTable';
import { PageNavigate } from '../../../../common/pageNavigation/PageNavigate';
import { fomatDate } from '../../../../../common/fomatData';

export const EmpPaymentMain = () => {
    const [empPaymentList, setEmpPaymentList] = useState<IEmpPaymentList[]>();
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>();
    const { searchKeyword } = useContext(EmpPaymentContext);
    const [modal, setModal] = useRecoilState(modalState);
    const defaultValue = { loginID: '', salary_year: '' }
    const [payStatus, setPayStatus] = useState<ISalaryApprove>(defaultValue);
    const navigate = useNavigate();

    useEffect(() => {
        searchEmppayment();
    }, [searchKeyword]);

    const searchEmppayment = async (cpage?: number) => {
        cpage = cpage || 1;

        const postSearchEmpPayment = await postComnApi<ISearchEmpPayment>(EmpPaymentApi.listEmpPaymentJson, {
            ...searchKeyword,
            cpage : cpage,
            pageSize: 5,
        });
        console.log(postSearchEmpPayment)

        if (postSearchEmpPayment) {
            setEmpPaymentList(postSearchEmpPayment.salaryManageList);
            setTotalCnt(postSearchEmpPayment.salaryManageListCnt);
            setCurrentPage(cpage);
        }
    };

    const salaryApprove = (loginID?: string, salaryYear?: string) => {
        console.log('로그확인' , loginID, salaryYear)
        const postAction: AxiosRequestConfig = {
            method: 'POST',
            url: '/employee/salaryApproveJson.do',
            data: { loginID, salaryYear },
            headers: {
                'Content-Type': 'application/json',
            },
        };
    
        axios(postAction).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === 'Success') {
                alert('급여가 지급되었습니다.');
                // 필요한 경우 페이지를 다시 로드하거나 상태를 업데이트
            } else {
                alert('급여 지급에 실패했습니다.');
            }
        }).catch((error) => {
            alert('오류가 발생했습니다.');
        });
        searchEmppayment();
    };

    // const handlerModal = (grpCod: string, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    //     e.stopPropagation();
    //     setGrpCod(grpCod);
    //     setModal(!modal);
    // };

    return (
        <EmpPaymentMainStyled>

            <StyledTable>
                <colgroup>
                    <col width="6%" />
                    <col width="6%" />
                    <col width="6%" />
                    <col width="6%" />
                    <col width="6%" />
                    <col width="6%" />
                    <col width="6%" />
                    <col width="6%" />
                    <col width="6%" />
                    <col width="6%" />
                    <col width="6%" />hooks
                    <col width="6%" />
                    <col width="6%" />
                    <col width="6%" />
                </colgroup>
                <thead>
                    <tr>
                        <StyledTh>해당년월</StyledTh>
                        <StyledTh>부서</StyledTh>
                        <StyledTh>직급</StyledTh>
                        <StyledTh>사번</StyledTh>
                        <StyledTh>사원명</StyledTh>
                        <StyledTh>연봉</StyledTh>
                        <StyledTh>기본급</StyledTh>
                        <StyledTh>국민연금</StyledTh>
                        <StyledTh>건강보험</StyledTh>
                        <StyledTh>산재보험</StyledTh>
                        <StyledTh>고용보험</StyledTh>
                        <StyledTh>실급여</StyledTh>
                        <StyledTh>퇴직금</StyledTh>
                        <StyledTh>지급여부</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {empPaymentList && empPaymentList?.length > 0 ? (
                        empPaymentList.map((a) => {
                            return (
                                <tr
                                    key={a.loginID}
                                >
                                    <StyledTd>{a.salary_year}</StyledTd>
                                    <StyledTd>{a.dept_name}</StyledTd>
                                    <StyledTd>{a.pos_name}</StyledTd>
                                    <StyledTd>{a.loginID}</StyledTd>
                                    <StyledTd>{a.name}</StyledTd>
                                    <StyledTd>{a.annual_salary}</StyledTd>
                                    <StyledTd>{a.annual_salary/12}</StyledTd>
                                    <StyledTd>{a.nation_pens}</StyledTd>
                                    <StyledTd>{a.health_insur}</StyledTd>
                                    <StyledTd>{a.empl_insur}</StyledTd>
                                    <StyledTd>{a.workers_insur}</StyledTd>
                                    <StyledTd>{a.salary}</StyledTd>
                                    <StyledTd>{a.pens}</StyledTd>
                                    <StyledTd>
                                         <>
            {a.pay_status === 'N' ? (
                <Button onClick={() => {
                    if (window.confirm('급여를 지급하겠습니까?')) {
                        salaryApprove(a.loginID, a.salary_year);
                    } else {
                        alert('급여 지급을 취소하였습니다.');
                    }
                }}>
                    <span>미지급</span>
                </Button>
            ) : (
                <Button>
                   지급완료
                </Button>
            )}
        </>
                                    </StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={14}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={totalCnt}
                onChange={searchEmppayment}
                itemsCountPerPage={5}
                activePage={currentPage as number}
            ></PageNavigate>
            
        </EmpPaymentMainStyled>
    );
};
