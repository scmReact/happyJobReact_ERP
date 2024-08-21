import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DatesSetArg } from '@fullcalendar/core'; 
import axios, { AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../../stores/modalState';
import { VctnCalendarDetail } from '../VctnCalendarDetail/VctnCalendarDetail';
import { Protal } from '../../../../common/potal/Portal';
import { IDetailValue, IModalParam, IVctnCalendarList } from '../../../../../models/interface/Employee/VctnCalendar/VctnCalendarModel';

export const VctnCalendarMain = () => {
    const [month, setMonth] = useState<string>('');
    const [list, setList] = useState<IDetailValue[]>([]);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [modalParam, setModatParam] = useState<IModalParam>();

    useEffect(() => {
        if (month) {
            getList();
        }
    }, [month]);

    const handleDatesSet = (info: DatesSetArg) => {
        const startDate = info.view.currentStart;

        const localStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000);
        const localYear = localStartDate.getFullYear();
        const localMonth = (localStartDate.getMonth() + 1).toString().padStart(2, '0');
        
        const formattedMonth = `${localYear}-${localMonth}`;

        setMonth(formattedMonth);
    };

    const getList = () => {
        axios
            .post(`/employee/vctnCalendarListJson.do`, { formattedMonth: month })
            .then((res: AxiosResponse<IVctnCalendarList>) => {
                console.log(res.data);
                setList(res.data.detailValue);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const transformData = (data: IDetailValue[]) => {
        return data.map(a => {
            let title;
            let color;
            if (a.applyYn === 'N') {
                title = '반려'; 
                color = '#e9fde8'; 
            } else if (a.applyYn === 'Y') {
                title = '승인'; 
                color = '#e9f5fb';
            } else if(a.applyYn === 'W') {
                title = '미승인';
                color = '#fde7e7';
            }
    
            return {
                id: a.seq.toString(), 
                title: title,
                start: a.vctnStrDate,
                end: a.vctnEndDate,
                color: color,
                textColor: 'black',
                extendedProps: {
                    applyYn: a.applyYn,
                    date: a.vctnStrDate
                }
            };
        });
    };

    const handleClick = (a: any)=>{
        const param = {
            applyYn : a.event._def.extendedProps.applyYn,
            date : a.event._def.extendedProps.date,
        }
        setModatParam(param)
        setModal(!modal)
    }

    return (
        <div>
            <FullCalendar
                locale={"kr"}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dayMaxEvents={true}
                events={transformData(list)} 
                height={'800px'}
                editable={true}
                datesSet={handleDatesSet}
                eventClick={handleClick}
            />
            {
                modal
                ?
                <Protal>
                    <VctnCalendarDetail modalParam={modalParam}/>
                </Protal>
                :
                null
            }
        </div>
    );
};
