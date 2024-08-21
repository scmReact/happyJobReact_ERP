import { useRecoilState } from "recoil"
import { EmpMgtModalStyled, EmpMgtTableStyled } from "./styled"
import { modalState } from "../../../../../stores/modalState"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Button } from "../../../../common/Button/Button";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { selectDept, selectDeptResponse, selectPositionResponse } from "../EmpMgtSearch/EmpMgtSearch";
import { modalState1 } from "../EmpMgtSalaryModal/EmpMgtSalaryModal";

export interface IUserInfoModalProps {
    onPostSuccess : () => void;
    loginId : string;
    setLoginId : (loginId : string) => void;
}

export interface IUserInfoDetail {
   
    fileName?: string;
    phsycalPath?: string;
    logicalPath?: string;
    fileSize?: number;          // Assuming file size is in bytes (number)
    fileExt?: string;           // Assuming file extension is a string (e.g., ".jpg")
    loginId?: string;           // Assuming loginID is a string
    name?: string;
    sex?: string;               // Could be a string, but an enum could also be used (e.g., 'M' | 'F')
    birthday?: string;          // Date as a string, consider using Date if working with dates
    school?: string;
    hp?: string;                // Assuming 'hp' represents a phone number
    email?: string;
    zipCode?: number;           // Zip code as a string
    addr?: string;
    addrDetail?: string;
    bankCode?: string;          // Bank code as a string
    salaryAccount?: string;     // Account number as a string
    deptCode?: string;
    deptName?: string;
    posCode?: string;
    posName?: string;
    jobCode?: string;
    emplStatus?: string;        // Employee status as a string (e.g., 'W', 'R')
    empDate?: string;           // Employment date as a string, consider using Date if working with dates
    leaveDate?: string;         // Leave date as a string, consider using Date if working with dates
    leaveReason?: string;
    annualSalary?: number;      // Salary as a number, assuming it's a monetary value
    pens?: string;              // Unclear what this represents, assumed string
    availDay?: number;          // Available days as a number (e.g., vacation days)
    userType?: string;          // User type code as a string
}


export interface IUserInfoDetailResponse {
    resultMsg : string;
    detailValue : IUserInfoDetail;
}



export interface ISelectBankResponse {
    bankList: selectDept[];
}

export interface ISelectJobResponse {
    roleList: selectDept[];
}

export interface ISelectAuthResponse {
    authList: selectDept[];
}
export const EmpMgtModal:FC<IUserInfoModalProps> =({onPostSuccess, loginId, setLoginId}) =>{
    const [modal, setModal] = useRecoilState(modalState);
    const [userInfo, setUserInfo] = useState<IUserInfoDetail>();
    const [dept, setDept] = useState<selectDept[]>();
    const [position, setPosition] = useState<selectDept[]>();
    const [bank, setBank] = useState<selectDept[]>();
    const [job, setJob] = useState<selectDept[]>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string>('notImage');
    const [fileData, setFileData] = useState<File>();
    const [hpFst, setHpFst] = useState('010'); // 초기값 010
    const [hpMid, setHpMid] = useState('');
    const [hpLst, setHpLst] = useState('');
    const [postcode, setPostcode] = useState(''); // 우편번호
    const [address, setAddress] = useState(''); // 기본 주소
    const [detailAddress, setDetailAddress] = useState(''); // 상세 주소
    const [isDaumLoaded, setIsDaumLoaded] = useState(false); // 스크립트 로드 여부 확인
    const [auth, setAuth] = useState<selectDept[]>([]);
    const [selectDeptName, SetSelectDeptName] = useState('');
    const [selectPositionCode1, setSelectPositionCode1] = useState('');
    const [modal1, setModal1] = useRecoilState(modalState1);
    const handleHpChange = () => {
        setUserInfo({ ...userInfo, hp: `${hpFst}-${hpMid}-${hpLst}` });
    };
    useEffect(() => {
        if (userInfo?.hp) {
            const [fst, mid, lst] = userInfo.hp.split('-');
            setHpFst(fst || '010');
            setHpMid(mid || '');
            setHpLst(lst || '');
        }
    }, [userInfo?.hp]); // userInfo.hp 변경 시 업데이트
   
    useEffect(() =>{
        if(modal) {
            selectBank();
            selectDept();
            selectPosition();
            selectJob();
            selectAuth();

            const script = document.createElement("script");
            script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
            script.async = true;
            script.onload = () => setIsDaumLoaded(true);
            document.head.appendChild(script);
    
            return () => {
                document.head.removeChild(script);
            };
        }
    },[modal]);
    useEffect(()=>{
        if(modal && loginId)
            searchDetail(loginId);
    },[modal, loginId]);

    const handleComplete = (data: { address: string; addressType: string; bname: string; buildingName: string; zonecode: string; }) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setPostcode(data.zonecode);
        setAddress(fullAddress);
        setDetailAddress('');

        setUserInfo(prevState => ({
            ...prevState,
            zipCode: Number(data.zonecode),
            addr: fullAddress,
            addrDetail: '' // 기본값으로 설정
          }));
    };
    const searchDetail = async(loginId : string) =>{
        const postAction: AxiosRequestConfig={
            method:'POST',
            url:'/employee/empDetail.do',
            data: {loginId : loginId},
            headers : {
                'Content-Type':'application/x-www-form-urlencoded',
            },
        };
        axios(postAction).then((res:AxiosResponse<IUserInfoDetailResponse>)=>{
            setUserInfo(res.data.detailValue);
        });
    };

    const selectDept =()=>{
        const postAction: AxiosRequestConfig={
            method : 'POST',
            url : '/employee/empMgtDept.do',
            headers : {
                'Content-Type':'application/json',
            },
            data: {},
        };
        axios(postAction).then((res:AxiosResponse<selectDeptResponse>)=>{
            setDept(res.data.deptList);
        })
    };

    const selectPosition =() =>{
        const postAction: AxiosRequestConfig={
            method:'POST',
            url :'/employee/empMgtPosition.do',
            headers :{
                'Content-Type':'application/json',
            },
            data:{},
        };
        axios(postAction).then((res:AxiosResponse<selectPositionResponse>)=>{
            setPosition(res.data.positionList);
        })
    }
    
    const selectBank =() =>{
        const postAction:AxiosRequestConfig={
            method:'POST',
            url:'/employee/empMgtBank.do',
            data:{},
            headers :{
                'Content-Type':'application/json',
            },
        };
        axios(postAction).then((res:AxiosResponse<ISelectBankResponse>)=>{
            setBank(res.data.bankList);
        })
    }

    const selectJob =() =>{
        const postAction: AxiosRequestConfig={
            method :'POST',
            url : '/employee/empMgtRole.do',
            data: {},
            headers :{
                'Content-Type':'application/json',
            },
        };
        axios(postAction).then((res:AxiosResponse<ISelectJobResponse>)=>{
            setJob(res.data.roleList);
        });
    };

    const selectAuth =() =>{
        const postAction: AxiosRequestConfig={
            method :'POST',
            url : '/employee/empMgtAuth.do',
            data : {},
            headers :{
                'Content-Type':'application/json',
            },
        };
        axios(postAction).then((res:AxiosResponse<ISelectAuthResponse>)=>{
            setAuth(res.data.authList);
        });
    };



    const selectDeptCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedDept = e.target.value;
      setUserInfo({ ...userInfo, deptCode: e.target.value });
      SetSelectDeptName(selectedDept);
    };
    
    const selectPositionCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedPosition = e.target.value; 
      setUserInfo({...userInfo, jobCode: e.target.value});
      setSelectPositionCode1(selectedPosition);
    };
    
    
    const handleClick = () =>{
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    //이미지 파일 미리 보기 
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInfo = event.target.files;
        if (fileInfo?.length) {
            const fileInfoSplit = fileInfo[0].name.split('.');
            const fileExtension = fileInfoSplit[1].toLowerCase();

            if (fileExtension === 'jpg' || fileExtension === 'gif' || fileExtension === 'png') {
                setImageUrl(URL.createObjectURL(fileInfo[0]));
            } else {
                setImageUrl('notImage');
            }
            setFileData(fileInfo[0]);
        }
      };
    
      const downLoadFile = async () => {
        let param = new URLSearchParams();
        param.append('loginID', loginId?.toString() as string);

        const postAction: AxiosRequestConfig = {
            url: '/board/noticeDownload.do',
            method: 'POST',
            data: param,
            responseType: 'blob',
        };

        await axios(postAction).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', userInfo?.fileName as string);
            document.body.appendChild(link);
            link.click();

            link.remove();
        });
    };

    const handleClick1 = () => {
        const { daum } = window as any;
        new daum.Postcode({
            oncomplete: handleComplete,
        }).open();
    };

    const cleanUp =() => {
      setLoginId('');

    }

    
    
      const [years, setYears] = useState('');
      const [empDate, setEmpDate] = useState('');
      const handleDateChange = (e: { currentTarget: { value: any; }; }) => {
        const newEmpDate = e.currentTarget.value;
        setUserInfo({...userInfo, empDate : newEmpDate});
        setEmpDate(newEmpDate);
    
        if (newEmpDate) {
          const empDateObject = new Date(newEmpDate);
    
          if (isNaN(empDateObject.getTime())) {
            setYears('Invalid date');
            return;
          }
    
          const today = new Date();
          const yearDiff = today.getFullYear() - empDateObject.getFullYear();
          const monthDiff = today.getMonth() - empDateObject.getMonth();
    
          let calculatedYears = yearDiff;
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < empDateObject.getDate())) {
            calculatedYears -= 1;
          }
          setUserInfo({...userInfo, availDay : parseInt(years)*2})
          setYears(calculatedYears.toString());
        }
      }

      const salary =() =>{
        setModal1(!modal1);
        console.log("그냥 버튼을 넣을까? ")
      }
    return (
        <>
        <EmpMgtModalStyled isOpen={modal} ariaHideApp={false} onAfterClose={cleanUp}>
            <div className="wrap">
                <div className="header">직원 정보</div>
                <EmpMgtTableStyled>
                <colgroup>
        <col width="100px" />
        <col width="100px" />
        <col />
        <col width="80px" />
        <col width="80px" />
        <col />
        <col />
        <col width="100px" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <td rowSpan={3} width="100px">
            <div>
            <div id="picture" onClick={handleClick} style={{ cursor: 'pointer' }}>
                {imageUrl === 'notImage' ? (
                <div>
                    <label>파일명</label>
                    {fileData?.name || '파일 없음'}
                </div>
                ) : (
                <div>
                    <label>미리보기</label>
                    <img src={imageUrl} alt="Preview" style={{ width: '100px', height: '100px' }} />
                </div>
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} // 파일 입력 필드를 숨김
                onChange={handleFileChange}
            />
            </div>
          </td>
          <th>
            사번<span className="font_red">*</span>
          </th>
          <td colSpan={3}>
            <input type="text" id="loginId" name="loginId" className="inputTxt valid" 
            required
            onChange={(e)=>{
                setUserInfo({...userInfo, loginId : e.target.value})
            }}
            defaultValue={userInfo?.loginId || ''}
            readOnly={loginId? true : false}
            />
          </td>
          <th colSpan={2}>
            성명<span className="font_red">*</span>
          </th>
          <td colSpan={3}>
            <input type="text" id="name" name="name" className="inputTxt" style={{ width: '100px' }} 
            required
            onChange={(e)=>{
                setUserInfo({...userInfo, name : e.target.value})
            }}
            defaultValue={userInfo?.name || ''}
            />
          </td>
        </tr>
        <tr>
          <th>
            성별<span className="font_red">*</span>
          </th>
          <td colSpan={8}>
            <input type="radio" id="M" name="sex" value={'male'} className="valid" 
                onChange={(e)=>setUserInfo({...userInfo, sex : e.target.value })}
                checked={userInfo?.sex === 'male'}
            />
            <label htmlFor="M">남</label>
            <input type="radio" id="F" name="sex" value={'female'} className="valid" 
                onChange={(e)=>setUserInfo({...userInfo, sex : e.target.value })}
                checked={userInfo?.sex === 'female'}
            />
            <label htmlFor="F">여</label>
          </td>
        </tr>
        <tr>
          <th>생년월일</th>
          <td colSpan={3}>
            <input type="text" id="birthday" name="birthday" className="inputTxt" placeholder="YYYY-MM-DD" required 
             onChange={(e)=>{
                setUserInfo({...userInfo, email
                    : e.target.value})
            }}
            defaultValue={userInfo?.email
                || ''}
            />
          </td>
          <th colSpan={2}>최종학력</th>
          <td colSpan={3}>
            <input type="text" id="school" name="school" className="inputTxt" 
               onChange={(e)=>{
                setUserInfo({...userInfo, school : e.target.value})
            }}
            defaultValue={userInfo?.school || ''}
            />
          </td>
        </tr>
        <tr>
          <th>
            이메일<span className="font_red">*</span>
          </th>
          <td colSpan={4}>
            <input type="text" id="email" name="email" className="inputTxt valid" 
             onChange={(e)=>{
                setUserInfo({...userInfo, loginId : e.target.value})
            }}
            defaultValue={userInfo?.loginId || ''}
            />
          </td>
          <th colSpan={2}>
            연락처<span className="font_red">*</span>
          </th>
          <td colSpan={3}>
            <input type="text" id="hpFst" name="hp" className="inputTxt" style={{ width: '55px' }} readOnly
             value={hpFst}
            />
            -
            <input type="text" id="hpMid" name="hp" className="inputTxt valid" style={{ width: '100px' }}
             value={hpMid}
             onChange={(e) => {
                 setHpMid(e.target.value);
                 handleHpChange();
             }}
            />
            -
            <input type="text" id="hpLst" name="hp" className="inputTxt valid" style={{ width: '100px' }}
            value={hpLst}
            onChange={(e) => {
                setHpLst(e.target.value);
                handleHpChange();
            }}
            />
          </td>
        </tr>
        <tr>
          <th>주소</th>
          <td id="addrSearch" colSpan={4}>
          <input
                type="text"
                name="zipCode"
                required
                onChange={(e) => {
                    setUserInfo({ ...userInfo, zipCode: Number(e.target.value) });
                }}
                value={postcode ? postcode : userInfo?.zipCode?.toString() }
                ></input>
            <Button onClick={handleClick1}>주소찾기</Button>
            <br />
        
            <input
                type="text"
                name="addr"
                required
                onChange={(e) => {
                    setUserInfo({ ...userInfo, addr
                        : e.target.value });
                }}
                value={address ? address : userInfo?.addr
                    ?.toString() }
                ></input>
            <br />
            <input
                type="text"
                name="addrDetail"
                required
                onChange={(e) => {
                    setUserInfo({ ...userInfo, addrDetail
                        : e.target.value });
                }}
                value={detailAddress ? detailAddress : userInfo?.addrDetail
                    ?.toString() }
                ></input>
          </td>
          <th colSpan={2}>
            은행계좌<span className="font_red">*</span>
          </th>
          <td colSpan={3}>
            <select id="bank" className="valid" style={{ width: '100px' }}
            
            >
            <option onChange={(e)=>setUserInfo({...userInfo, bankCode : e.currentTarget.value})}>은행선택</option>
            {bank && bank?.length > 0 ? (
                bank.map((a,i)=>{
                    return (
                        <option key={i} value={a.detail_code}>{a.detail_name}</option>
                    )
                })
            ) : (null)}
            </select>
            <input type="text" id="salaryAccount" name="salaryAccount" className="inputTxt valid" style={{ width: '200px' }} placeholder="숫자만 입력해주세요." />
          </td>
        </tr>
        <tr>
          <th>
            부서<span className="font_red">*</span>
          </th>
          <td colSpan={4}>
          <select 
                id="dept" 
                style={{ width: '200px' }} 
                className="valid" 
                onChange={selectDeptCode}
                >
                <option onChange={(e)=> setUserInfo({...userInfo, deptCode : e.currentTarget.value})}>부서선택</option>
                {dept?.map((a, index) => (
                    <option key={index} value={a.detail_code}>{a.detail_name}</option>
                ))}
            </select>

          </td>
          <th colSpan={2}>부서코드</th>
          <td>
            <input type="text" id="deptCode" name="deptCode" className="inputTxt" value={selectDeptName} readOnly />
          </td>
          <th>직무</th>
          <td>
            <select id="job" style={{ width: '100px' }} onChange={(e)=> setUserInfo({...userInfo, jobCode : e.currentTarget.value })}>
            {job && job?.length > 0 ? (
                    job.map((a, i)=>{
                        return (
                            <option key={i} value={a.detail_code}>{a.detail_name}</option>
                        )
                    })
                ) : (null)} 
            </select>
          </td>
        </tr>
        <tr>
          <th>
            직급<span className="font_red">*</span>
          </th>
          <td colSpan={4}>
            <select id="pos" className="valid" style={{ width: '200px' }}
             onChange={selectPositionCode}
            >
            <option value={''}>선택</option>
            {position && position?.length > 0 ? (
                    position.map((a, i)=>{
                        return (
                            <option key={i} value={a.detail_code}>{a.detail_name}</option>
                        )
                    })
                ) : (null)} 
            </select>
          </td>
          <th colSpan={2}>직급코드</th>
          <td>
            <input type="text" id="posCode" name="posCode" className="inputTxt" value={selectPositionCode1} readOnly />
          </td>
          <th>
            재직구분<span className="font_red">*</span>
          </th>
          <td colSpan={2}>
            <input type="radio" id="W" name="emplStatus" className="valid" value="W" 
             checked={userInfo?.emplStatus === "W"}
             disabled={userInfo?.emplStatus !== "W"} 
            onChange={(e)=> setUserInfo({...userInfo, emplStatus :e.currentTarget.value })} />
            <label htmlFor="W">재직</label>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" id="O" name="emplStatus" className="valid" value="O"
             checked={userInfo?.emplStatus === "O"}
             disabled={userInfo?.emplStatus !== "O"} 
            onChange={(e)=> setUserInfo({...userInfo, emplStatus :e.currentTarget.value })}
            />
            <label htmlFor="O">휴직</label>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" id="R" name="emplStatus" className="valid" value="R"
             checked={userInfo?.emplStatus === "R"}
             disabled={userInfo?.emplStatus !== "R"} 
            />
            <label htmlFor="R">퇴직</label>
          </td>
        </tr>
        <tr>
          <th>
            입사일<span className="font_red">*</span>
          </th>
          <td colSpan={4}>
            <input type="date" id="empDate" name="empDate" className="valid" style={{ height: '25px', width: '200px' }} 
            onChange={handleDateChange}
            />
          </td>
          <th colSpan={2}>퇴사일</th>
          <td>
            <input type="date" id="leaveDate" name="leaveDate" style={{ height: '25px', width: '100px' }} readOnly 
            onChange={(e)=>setUserInfo({...userInfo, leaveDate : e.currentTarget.value})}
            />
          </td>
          <th>근무연차</th>
          <td colSpan={2}>
            <input type="text" id="years" className="inputTxt" readOnly 
            value={years}/>
          </td>
        </tr>
        <tr>
          <th>
            연봉<span className="font_red">*</span>
          </th>
          <td colSpan={3} style={{ borderRight: '0px' }}>
            <input type="text" id="annualSalary" name="annualSalary" className="inputTxt valid" style={{ width: '170px' }} placeholder="숫자만 입력해주세요." />
          </td>
          <td style={{ padding: '0px', margin: '0px', borderLeft: '0px' }}>
            <a href="#" id="btnSalary" className="btnType"
            onClick={salary}
            >
              <span>호봉</span>
            </a>
          </td>
          <th colSpan={2}>퇴직금</th>
          <td colSpan={3}>
            <input type="text" id="pens" name="pens" className="inputTxt" placeholder="숫자만 입력하세요." />
          </td>
        </tr>
        <tr>
          <th>
            연차일수<span className="font_red">*</span>
          </th>
          <td colSpan={4}>
            <input type="text" id="availDay" name="availDay" className="inputTxt" style={{ width: '170px' }} placeholder="숫자만 입력하세요."
            value={parseInt(years)*2}
            />
          </td>
          <th colSpan={2}>
            권한<span className="font_red">*</span>
          </th>
          <td colSpan={3}>
            <select id="userType" style={{ width: '200px' }} className="valid">
            <option >선택</option>
            {auth && auth?.length > 0 ? (
                    auth.map((a,i)=>{
                        return (
                            <option key={i} value={a.detail_code}>{a.detail_name}</option>
                        )
                    })
                ) : (null)} 
            </select>
            </td>
        </tr>
        <tr id="leaveReasonTr" style={{ display: 'none' }}>
          <th>퇴사사유</th>
          <td colSpan={9}>
            <textarea id="leaveReason" style={{ overflowY: 'hidden', overflowX: 'hidden', resize: 'none' }} readOnly></textarea>
          </td>
        </tr>
      </tbody>
                </EmpMgtTableStyled>
                <Button onClick={()=>setModal(!modal)}>닫기</Button>
            </div>
        </EmpMgtModalStyled>
        </>
    )
}
