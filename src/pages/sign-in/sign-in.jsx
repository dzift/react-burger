import React, { useState, useRef, memo, useCallback } from "react";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./sign-in.module.css";

const Login = () => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [password, setPassword] = React.useState("");
  const onChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={`${styles.container}`}>
      <p className={`${styles.title} text text_type_main-medium pb-6`}>Вход</p>
      <form action="submit" className={`${styles.form} pb-20`}>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <PasswordInput onChange={onChange} value={password} name={"password"} />
        <Button type="primary" size="large">
          Войти
        </Button>
      </form>

      <div className={`${styles.loginOptions} pb-4`}>
        <span className={`text text_type_main-default text_color_inactive`}>
          Вы - новый пользователь?
        </span>
        <Link className={`${styles.link} pl-2`}>Зарегистрироваться</Link>
      </div>

      <div className={`${styles.loginOptions}`}>
        <span className={`text text_type_main-default text_color_inactive`}>
          Забыли пароль?
        </span>
        <Link className={`${styles.link} pl-2`}>Восстановить пароль</Link>
      </div>
    </div>
  );
};

export default Login;
