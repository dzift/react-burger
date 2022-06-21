import React, { useState, useRef, memo } from "react";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./sign-in.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const sendAuth = (e) => {
    e.preventDefault();
    console.log("Done");
  };

  return (
    <div className={`${styles.container}`}>
      <p className={`${styles.title} text text_type_main-medium pb-6`}>Вход</p>
      <form onSubmit={sendAuth} className={`${styles.form} pb-20`}>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
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
        <Link to="/register" className={`${styles.link} pl-2`}>
          Зарегистрироваться
        </Link>
      </div>

      <div className={`${styles.loginOptions}`}>
        <span className={`text text_type_main-default text_color_inactive`}>
          Забыли пароль?
        </span>
        <Link to="/forgot-password" className={`${styles.link} pl-2`}>
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
};

export default memo(Login);
