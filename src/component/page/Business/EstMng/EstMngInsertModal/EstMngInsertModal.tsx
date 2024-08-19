import { FC, useContext, useEffect, useState } from "react";
import {
    EstMngInsertModalStyled,
    EstMngInsertModalTableStyled,
} from "./styled";
import { useRecoilState } from "recoil";
import { modalEstMngInsertModalState } from "../../../../../stores/modalEstMngInsertModalState";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../../stores/userInfo";
import { postComnApi } from "../../../../../api/postComnApi";
import { BusinessApi } from "../../../../../api/api";
import { Button } from "../../../../common/Button/Button";
import { modalItemInfoState } from "../../../../../stores/modalItemInfoState";
import { ItemInfoModal } from "../ItemInfoModal/ItemInfoModal";
import { EstMngInsertContext } from "../../../../../api/provider/EstMngProvider";
import {
    defaultEstMng,
    ICust,
    ICustJsonResponse,
    IEstMng,
    IEstMngInsert,
    IEstMngInsertResponse,
} from "../../../../../models/interface/Business/EstMngModel";

/**
 * EstMngInsertModal
 * - 견적서관리-견적서등록 컴포넌트
 * - 견적서관리-견적서등록 컴포넌트 정보를 입력하기 위한 컴포넌트
 * - 속성
 *   @void(onPostSuccess): 모달 활성
 *   @string(type): 처리주체
 *   @number(num): 미수금번호
 *
 * Example usage:
 * <EstMngInsertModal onPostSuccess={onPostSuccess}/>
 */

export const EstMngInsertModal = () => {
    const [estMngInsertModal, setEstMngInsertModal] = useRecoilState(
        modalEstMngInsertModalState
    );
    const [estMng, setEstMng] = useState<IEstMngInsert>();
    const { estMngInsert, setEstMngInsert } = useContext(EstMngInsertContext);
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
    const [custList, setCustList] = useState<ICust[]>([]);
    const [modalItemInfo, setModalItemInfo] =
        useRecoilState(modalItemInfoState);

    useEffect(() => {
        getCustList("all");
    }, []);

    useEffect(() => {
        console.log("estMngInsert");
        console.log(estMngInsert);
    }, [estMngInsert]);

    useEffect(() => {
        if (estMngInsert && typeof estMngInsert === "object") {
            setEstMng(estMngInsert as IEstMngInsert);
        }
    }, [estMngInsert]);

    const getCustList = async (type: string) => {
        const addList: ICust[] = [];
        const getCustList = await postComnApi<ICustJsonResponse>(
            BusinessApi.getCustListJson,
            { "": "" }
        );

        if (getCustList) {
            if (type === "all") {
                addList.push({
                    cust_id: "",
                    cust_name: "전체",
                });
            }

            if (type === "sel") {
                addList.push({
                    cust_id: "",
                    cust_name: "선택",
                });
            }

            for (const com of getCustList.custNameList) {
                addList.push({
                    cust_id: com.cust_id,
                    cust_name: com.cust_name,
                });
            }

            setCustList(addList);
        }
    };

    const handlerInsert = async () => {
        const postInsert = await postComnApi<IEstMngInsertResponse>(
            BusinessApi.estMngInsertJson,
            { ...estMngInsert, loginID: userInfo.loginId }
        );
        if (postInsert) {
            if (postInsert.result === "Success") {
                alert("등록 되었습니다.");
                onPostSuccess();
            } else {
                alert("등록 실패했습니다.");
            }
        }
    };

    const onPostSuccess = () => {
        setEstMng(defaultEstMng);
        setEstMngInsert(defaultEstMng);
        setEstMngInsertModal(!estMngInsertModal);
    };

    const onItemInfoModal = () => {
        setModalItemInfo(!modalItemInfo);
    };

    return (
        <EstMngInsertModalStyled isOpen={estMngInsertModal} ariaHideApp={false}>
            <div className="wrap">
                <div className="header">견적서 등록</div>
                <EstMngInsertModalTableStyled>
                    <div className="main">
                        <div className="title">
                            수주일자 <span>*</span>
                        </div>
                        <input
                            className="sizeS"
                            type="date"
                            defaultValue={estMng?.expire_date}
                            onChange={(e) =>
                                setEstMngInsert({
                                    ...estMngInsert,
                                    expire_date: e.target.value,
                                })
                            }
                        />
                        <div className="title">
                            거래처명<span>*</span>
                        </div>
                        <select
                            onChange={(e) =>
                                setEstMngInsert({
                                    ...estMngInsert,
                                    cust_id: e.target.value,
                                    cust_name: e.target.name,
                                })
                            }
                        >
                            {custList?.map((a) => {
                                return (
                                    <option key={a.cust_id} value={a.cust_id}>
                                        {a.cust_name}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="title">
                            유효기간 <span>*</span>
                        </div>
                        <input
                            className="sizeS"
                            type="date"
                            onChange={(e) =>
                                setEstMngInsert({
                                    ...estMngInsert,
                                    book_date: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="main">
                        <div className="title">
                            제조업체<span>*</span>
                        </div>
                        <input
                            className="sizeS itemStyle"
                            type="text"
                            value={estMng?.manufac}
                            readOnly={true}
                            onChange={(e) =>
                                setEstMngInsert({
                                    ...estMngInsert,
                                    manufac: e.target.value,
                                })
                            }
                        ></input>
                        <div className="title">
                            대분류 <span>*</span>
                        </div>
                        <input
                            className="sizeM itemStyle"
                            type="text"
                            value={estMng?.major_class}
                            onChange={(e) =>
                                setEstMngInsert({
                                    ...estMngInsert,
                                    major_class: e.target.value,
                                })
                            }
                        ></input>
                        <div className="title">
                            소분류 <span>*</span>
                        </div>
                        <input
                            className="sizeS itemStyle"
                            type="text"
                            value={estMng?.sub_class}
                            onChange={(e) =>
                                setEstMngInsert({
                                    ...estMngInsert,
                                    sub_class: e.target.value,
                                })
                            }
                        ></input>
                    </div>
                    <div className="main">
                        <div className="title">
                            제품명 <span>*</span>
                        </div>
                        <input
                            className="sizeL itemStyle"
                            type="text"
                            value={estMng?.item_name}
                            onChange={(e) =>
                                setEstMngInsert({
                                    ...estMngInsert,
                                    sub_class: e.target.value,
                                })
                            }
                        ></input>
                        <Button onClick={onItemInfoModal}>제품선택</Button>
                        <div className="sizeM2"></div>
                        <div className="title">
                            수량 <span>*</span>
                        </div>
                        <input
                            className="sizeS"
                            type="text"
                            onChange={(e) =>
                                setEstMngInsert({
                                    ...estMngInsert,
                                    qut: e.target.value,
                                })
                            }
                        />
                    </div>
                </EstMngInsertModalTableStyled>

                <div className="btn-group">
                    <Button width={90} onClick={handlerInsert}>
                        등록
                    </Button>
                    <Button width={90} onClick={onPostSuccess}>
                        닫기
                    </Button>
                </div>
            </div>
            {estMngInsertModal ? (
                <ItemInfoModal
                    onItemInfoModal={onItemInfoModal}
                ></ItemInfoModal>
            ) : null}
        </EstMngInsertModalStyled>
    );
};
