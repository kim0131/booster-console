import axios from "axios";

const Joi = require("joi");

const id_schema = Joi.object({
  mb_id: Joi.string().alphanum().min(6).max(30).required(),
});

const pw_schema = Joi.object({
  mb_pw: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}")).required(),
});

const nick_schema = Joi.object({
  mb_nick: Joi.string().required(),
});

const email_schema = Joi.object({
  mb_email: Joi.string().email({ tlds: { allow: false } }),
});

const ph_schema = Joi.object({
  mb_ph: Joi.string().required(),
});

export const mb_id_vaildate = async (mb_id: string | undefined) => {
  let { value, error } = id_schema.validate({ mb_id: mb_id });

  if (
    error ==
    'ValidationError: "mb_id" length must be at least 6 characters long'
  ) {
    error = "아이디는 최소 6자 이상이여야합니다.";
  } else if (
    error ==
    'ValidationError: "mb_id" length must be less than or equal to 30 characters long'
  ) {
    error = "아이디는 30자를 초과할 수 없습니다.";
  } else if (
    error ==
    ('ValidationError: "mb_id" must only contain alpha-numeric character' ||
      'ValidationError: "mb_id" must only contain alpha-numeric characters')
  ) {
    error = "아이디는 영어 및 숫자만 사용할 수 있습니다.";
  } else if (error == 'ValidationError: "mb_id" is not allowed to be empty') {
    error = "아이디를 작성해주세요.";
  }
  await axios
    .post("/api2/mbid-check", {
      mb_id: mb_id,
    })
    .then(res => {})
    .catch(function (err) {
      if (err.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        error = err.response.data.msg;
      } else if (err.request) {
        console.log(err.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", err.message);
      }
    });
  return { value, error };
};

export const mb_pw_vaildate = async (mb_pw: string | undefined) => {
  let { value, error } = pw_schema.validate({ mb_pw: mb_pw });

  if (
    error ==
    `ValidationError: "mb_pw" with value "${mb_pw}" fails to match the required pattern: /^[a-zA-Z0-9]{8,30}/`
  ) {
    error = "비밀번호는 최소 8자 이상의 영어 및 숫자로 작성하여야합니다.";
  } else if (error == 'ValidationError: "mb_pw" is not allowed to be empty') {
    error = "비밀번호를 작성해주세요.";
  }

  return { value, error };
};

export const mb_nick_vaildate = async (mb_nick: string | undefined) => {
  let { value, error } = nick_schema.validate({ mb_nick: mb_nick });
  if (error == 'ValidationError: "mb_nick" is not allowed to be empty') {
    error = "닉네임을 작성해주세요.";
  }
  await axios
    .post("/api2/mbnick-check", {
      mb_nick: mb_nick,
    })
    .then(res => {})
    .catch(function (err) {
      if (err.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        error = err.response.data.msg;
      } else if (err.request) {
        console.log(err.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", err.message);
      }
    });
  return { value, error };
};

export const mb_email_vaildate = async (mb_email: string | undefined) => {
  let { value, error } = email_schema.validate({ mb_email: mb_email });
  if (error == 'ValidationError: "mb_email" is not allowed to be empty') {
    error = "이메일을 작성해주세요.";
  } else if (error == 'ValidationError: "mb_email" must be a valid email') {
    error = "올바른 이메일 형식이 아닙니다.";
  }
  await axios
    .post("/api2/mbemail-check", {
      mb_email: mb_email,
    })
    .then(res => {})
    .catch(function (err) {
      if (err.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        error = err.response.data.msg;
      } else if (err.request) {
        console.log(err.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", err.message);
      }
    });
  return { value, error };
};

export const mb_ph_vaildate = async (mb_ph: string | undefined) => {
  let { value, error } = ph_schema.validate({ mb_ph: mb_ph });
  if (error == 'ValidationError: "mb_ph" is not allowed to be empty') {
    error = "휴대폰 번호를 작성해주세요.";
  }
  await axios
    .post("/api2/mbph-check", {
      mb_ph: mb_ph,
    })
    .then(res => {})
    .catch(function (err) {
      if (err.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        error = err.response.data.msg;
      } else if (err.request) {
        console.log(err.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", err.message);
      }
    });
  return { value, error };
};
