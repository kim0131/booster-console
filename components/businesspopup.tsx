/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { getUserCertify } from "@core/config/businesscertify";
import { businessImageUrl } from "@core/config/imgurl";
import styled from "@emotion/styled";
import axios from "axios";
import { url } from "inspector";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import Selectbox from "./elements/selectbox";
import TextField from "./elements/text-field";

interface IPropsImageContaier {
  img: string;
}

const PopUpContainer = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const PopUpPage = styled.section`
  width: 70%;
  max-width: 80rem;
  height: 100%;
  position: absolute;
  right: 0;
  /* margin: 0 auto; */
  border-radius: 0.3rem;
  background-color: #fff;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  overflow: hidden;
`;
const Header = styled.header`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
  height: 3rem;
`;

const Footer = styled.footer`
  width: 100%;
  height: 4rem;
  position: absolute;
  display: flex;
  bottom: 0;
  padding: 12px 16px;
  text-align: left;
  gap: 1rem;
`;

const ContentBox = styled.div`
  padding: 16px;
  height: calc(100% - 7rem);
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1rem;
`;
const HeaderButton = styled.button`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
`;
const FooterButton1 = styled.button`
  padding: 6px 12px;
  color: #fff;
  background-color: #2563eb;
  border-radius: 5px;
  font-size: 13px;
`;
const FooterButton2 = styled.button`
  padding: 6px 12px;
  color: black;
  background-color: #f4f4f5;
  border-radius: 5px;
  font-size: 13px;
`;

const Section1 = styled.div`
  width: 100%;
  height: 12rem;
  border: 1px #d4d4d8 solid;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
`;
const Section2 = styled.div`
  background: #f4f4f5;
  border-radius: 4px;
  flex: 1;
  height: calc(100% - 14rem);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #71717a;
`;
const Section3 = styled.div`
  background: #f4f4f5;
  border-radius: 4px;
  flex: 1;
  width: 48%;
  height: calc(100% - 14rem);
  padding: 0 0 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Section1Container = styled.div`
  width: 50%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0rem 2rem;
  gap: 1rem;
`;
const Section1Header = styled.div`
  width: 5rem;
  color: #a1a1aa;
`;
const Section1Content = styled.div`
  color: #18181b;
`;
const Section3Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: space-around;
  flex-direction: column;
  padding: 0rem 2rem;
`;
const Section3Header = styled.div`
  width: 100%;
  color: #a1a1aa;
`;
const Section3Content = styled.div`
  color: #18181b;
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ImageContainer = styled.div<IPropsImageContaier>`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
`;

interface IStatePopUp {
  open?: boolean;
  id?: number | string | string[];
  close?: any;
}

const BusinessPopUp = ({ open, close, id }: IStatePopUp) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const options = [
    { value: 0, label: "미승인" },
    { value: 1, label: "승인심사중" },
    { value: 2, label: "승인거절" },
    { value: 3, label: "승인완료" },
    { value: 4, label: "업데이트" },
  ];
  const refuseOptions = [
    { value: 21, label: "사진의 화질이 안좋음" },
    { value: 22, label: "육안으로 내용 확인 불가" },
    { value: 23, label: "기타사유1" },
    { value: 24, label: "기타사유2" },
    { value: 25, label: "기타사유3" },
    { value: 26, label: "기타사유4" },
  ];

  const [userInfo, setUserInfo] = useState({
    idx: "",
    mb_archive: "",
    mb_birth: "",
    mb_business_certify: "",
    mb_business_num: "",
    mb_datetime: "",
    mb_email: "",
    mb_email_certify: "",
    mb_id: "",
    mb_name: "",
    mb_nick: "",
    mb_ph: "",
    mb_pw: "",
    mb_pw_token: "",
    mb_update: "",
    business_address1: "",
    business_address2: "",
    business_company: "",
    business_datetime: "",
    business_name: "",
    business_number: "",
    business_number2: "",
    business_sector: "",
    business_status: "",
    business_update: "",
    business_url: "",
    business_telephone: "",
    mb_idx: 0,

    business_full_url: "",
  });
  const [businessInfo, setBusinessInfo] = useState({
    business_address1: "",
    business_address2: "",
    business_company: "",
    business_datetime: "",
    business_name: "",
    business_number: "",
    business_number2: "",
    business_sector: "",
    business_status: "",
    business_update: "",
    business_url: "",
    business_telephone: "",
    mb_idx: 0,

    business_full_url: "",
  });
  useEffect(() => {
    if (open && id) {
      getUserInfo();
    }
    if (router.query.mode == "open") {
      open = true;
    }
  }, [router, id]);

  const getUserInfo = async () => {
    setIsLoading(true);
    await axios.get(`/api2/user/${id}`).then(async res => {
      let user = res.data.result;
      let business = await axios
        .get(`/api2/business/${user.mb_business_num}`)
        .then(res => {
          let business = res.data;
          business.business_full_url = "";
          if (business.business_url) {
            business.business_full_url =
              businessImageUrl + business.business_url;
          }
          console.log(business);
          setBusinessInfo(business);
          return business;
        })
        .catch(error => {
          router.push("/user");
        });
      user.mb_business_certify = parseInt(user.mb_business_certify); // String을 Int로 변환
      Object.assign(user, business);
      setUserInfo(user);
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const onChangeSelcet = (e: any) => {
    const value = e.value;
    const label = e.label;
    setUserInfo({
      ...userInfo,
      mb_business_certify: value,
    });
  };

  const onChangeTextFiled = (e: any) => {
    const { value, name } = e.currentTarget;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    setBusinessInfo({
      ...businessInfo,
      [name]: value,
    });
  };
  // 수정 API
  const onClickUpdateAxios = async () => {
    await axios
      .post(`/api2/user/update/${id}`, {
        mb_id: userInfo.mb_id,
        mb_email: userInfo.mb_email,
        mb_name: userInfo.mb_name,
        mb_nick: userInfo.mb_nick,
        mb_ph: userInfo.mb_ph,
        mb_pw_token: userInfo.mb_pw_token,
        mb_email_certify: userInfo.mb_email_certify,
        mb_archive: userInfo.mb_archive,
        mb_birth: userInfo.mb_birth,
        mb_business_certify: 3,
        mb_business_num: userInfo.mb_business_num,
      })
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
    await axios
      .post(`/api2/business/update/${userInfo.mb_business_num}`, businessInfo)
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
    router.push(router.pathname);
  };

  // 거절 API
  const onClickRefuseAxios = async () => {
    await axios
      .post(`/api2/user/update/${id}`, {
        mb_id: userInfo.mb_id,
        mb_email: userInfo.mb_email,
        mb_name: userInfo.mb_name,
        mb_nick: userInfo.mb_nick,
        mb_ph: userInfo.mb_ph,
        mb_pw_token: userInfo.mb_pw_token,
        mb_email_certify: userInfo.mb_email_certify,
        mb_archive: userInfo.mb_archive,
        mb_birth: userInfo.mb_birth,
        mb_business_certify: userInfo.mb_business_certify,
        mb_business_num: userInfo.mb_business_num,
      })
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
    await axios
      .post(`/api2/business/update/${userInfo.mb_business_num}`, businessInfo)
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
    router.push(router.pathname);
  };

  return (
    <>
      {open && (
        <PopUpContainer>
          <PopUpPage>
            <Header>
              사용자 등록 정보
              <HeaderButton onClick={close}>&times;</HeaderButton>
            </Header>
            <ContentBox>
              {isLoading ? (
                <Flex>
                  <Rings height="100" width="100" color="black" />
                </Flex>
              ) : (
                <>
                  <Section1>
                    <Section1Container>
                      <Section1Header>분류</Section1Header>
                      <Section1Content>
                        {getUserCertify(userInfo.mb_business_certify)}
                      </Section1Content>
                    </Section1Container>
                    <Section1Container>
                      <Section1Header>연락처</Section1Header>
                      <Section1Content>{userInfo.mb_ph}</Section1Content>
                    </Section1Container>
                    <Section1Container>
                      <Section1Header>아이디</Section1Header>
                      <Section1Content>{userInfo.mb_id}</Section1Content>
                    </Section1Container>
                    <Section1Container>
                      <Section1Header>생성일</Section1Header>
                      <Section1Content>{userInfo.mb_datetime}</Section1Content>
                    </Section1Container>
                    <Section1Container>
                      <Section1Header>이름</Section1Header>
                      <Section1Content>{userInfo.mb_name}</Section1Content>
                    </Section1Container>
                    <Section1Container>
                      <Section1Header>업데이트일</Section1Header>
                      <Section1Content>{userInfo.mb_update}</Section1Content>
                    </Section1Container>
                    <Section1Container>
                      <Section1Header>이메일</Section1Header>
                      <Section1Content>{userInfo.mb_email}</Section1Content>
                    </Section1Container>
                    <Section1Container>
                      <Section1Header>첨부파일</Section1Header>
                      <Section1Content>{userInfo.business_url}</Section1Content>
                    </Section1Container>
                  </Section1>
                  <Section2>
                    <ImageContainer
                      img={
                        businessInfo.business_full_url
                          ? businessInfo.business_full_url
                          : ""
                      }
                    />
                  </Section2>
                  <Section3>
                    <Header>사업자등록증 정보 입력</Header>
                    <Section3Container>
                      <Section3Header>연락처</Section3Header>
                      <Section3Content>
                        <TextField
                          value={userInfo.business_telephone}
                          onChange={onChangeTextFiled}
                          name={"business_telephone"}
                        />
                      </Section3Content>
                    </Section3Container>
                    <Section3Container>
                      <Section3Header>회사명</Section3Header>
                      <Section3Content>
                        <TextField
                          value={userInfo.business_company}
                          onChange={onChangeTextFiled}
                          name={"business_company"}
                        />
                      </Section3Content>
                    </Section3Container>
                    <Section3Container>
                      <Section3Header>사업자번호</Section3Header>
                      <Section3Content>
                        <TextField
                          value={userInfo.business_number}
                          onChange={onChangeTextFiled}
                          name={"business_number"}
                        />
                      </Section3Content>
                    </Section3Container>
                    <Section3Container>
                      <Section3Header>주소</Section3Header>
                      <Section3Content>
                        <TextField
                          value={userInfo.business_address1}
                          onChange={onChangeTextFiled}
                          name={"business_address1"}
                        />
                      </Section3Content>
                    </Section3Container>
                    <Section3Container>
                      <Section3Header>소재지(시군구까지)</Section3Header>
                      <Section3Content>
                        <TextField
                          value={userInfo.business_address2}
                          onChange={onChangeTextFiled}
                          name={"business_address2"}
                        />
                      </Section3Content>
                    </Section3Container>
                    <Section3Container>
                      <Section3Header>법인등록번호</Section3Header>
                      <Section3Content>
                        <TextField
                          value={userInfo.business_number2}
                          onChange={onChangeTextFiled}
                          name={"business_number2"}
                        />
                      </Section3Content>
                    </Section3Container>
                    <Section3Container>
                      <Section3Header>업종</Section3Header>
                      <Section3Content>
                        <TextField
                          value={userInfo.business_sector}
                          onChange={onChangeTextFiled}
                          name={"business_sector"}
                        />
                      </Section3Content>
                    </Section3Container>
                    <Section3Container>
                      <Section3Header>업태</Section3Header>
                      <Section3Content>
                        <TextField
                          value={userInfo.business_status}
                          onChange={onChangeTextFiled}
                          name={"business_status"}
                        />
                      </Section3Content>
                    </Section3Container>
                  </Section3>
                </>
              )}
            </ContentBox>
            <Footer>
              <>
                <FooterButton1 onClick={onClickUpdateAxios}>
                  승인하기
                </FooterButton1>
                <FooterButton2 onClick={onClickRefuseAxios}>거절</FooterButton2>
                <Selectbox
                  id={"popup"}
                  options={refuseOptions}
                  value={userInfo.mb_business_certify}
                  onChange={onChangeSelcet}
                  menuPlacement={"auto"}
                  placeholder={"거절사유를 선택해주세요."}
                />
              </>
            </Footer>
          </PopUpPage>
        </PopUpContainer>
      )}
    </>
  );
};

export default BusinessPopUp;
