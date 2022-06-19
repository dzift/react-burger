import React, { useState, useRef, memo, useCallback } from "react";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./reset-password.module.css";

const ResetPassword = () => {
  const [name, setName] = React.useState("");
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
      <p className={`${styles.title} text text_type_main-medium pb-6`}>
        Восстановление пароля
      </p>
      <form action="submit" className={`${styles.form} pb-20`}>
        <PasswordInput value={password} name={"password"} onChange={onChange} />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setName(e.target.value)}
          value={""}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button type="primary" size="large">
          Сохранить
        </Button>
      </form>

      <div className={`${styles.loginOptions} pb-4`}>
        <span className={`text text_type_main-default text_color_inactive`}>
          Вспомнили пароль?
        </span>
        <Link className={`${styles.link} pl-2`}>Войти</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
