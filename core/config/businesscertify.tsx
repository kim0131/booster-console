export const getUserCertify = (value: string | number) => {
  let result = value.toString().slice(0, 1);

  switch (result) {
    case "0":
      return "미승인";
    case "1":
      return "승인 심사중";
    case "2":
      return "승인거절";
    case "3":
      return "승인";
    case "4":
      return "업데이트";
    default:
      return "미승인";
  }
};

export const getBusinessRefuse = (value: string | number) => {
  let result = value.toString();

  switch (result) {
    case "21":
      return "사진의 화질이 안좋음";
    case "22":
      return "육안으로 내용 확인 불가";
    case "23":
      return "기타사유1";
    case "24":
      return "기타사유2";
    case "25":
      return "기타사유3";
    case "26":
      return "기타사유4";
    default:
      return "미승인";
  }
};
