import styled from "@emotion/styled";
import { SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "./text-field";
import { getMonth, getDate } from "date-fns";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const CalendarContainer = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Container>
      <DatePicker
        selected={startDate}
        onChange={(date: SetStateAction<Date>) => setStartDate(date)}
        locale={ko} // 한글로 변경
        dateFormat="yyyy.MM.dd (eee)" // 시간 포맷 변경
        showPopperArrow={false} // 화살표 변경
        customInput={
          // 날짜 뜨는 인풋 커스텀
          <TextField></TextField>
        }
      />
    </Container>
  );
};

export default CalendarContainer;
