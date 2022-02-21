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
const CalendarContainer = (props: any) => {
  return (
    <Container>
      <DatePicker
        selected={props.selected}
        onChange={props.onChange}
        dateFormat="yyyy.MM.dd " // 시간 포맷 변경
        showPopperArrow={false} // 화살표 변경
        customInput={
          // 날짜 뜨는 인풋 커스텀
          <TextField name={props.name}></TextField>
        }
      />
    </Container>
  );
};

export default CalendarContainer;
