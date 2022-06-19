import React, { useState, useRef, memo, useCallback } from "react";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./registration.module.css";

const Register = () => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const [name, setName] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  return (
    <div className={`${styles.container}`}>
      <p className={`${styles.title} text text_type_main-medium pb-6`}>
        Регистрация
      </p>
      <form action="submit" className={`${styles.form} pb-20`}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"email"}
          error={false}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <PasswordInput onChange={onChange} value={value} name={"password"} />
        <Button type="primary" size="large">
          Зарегистрироваться
        </Button>
      </form>

      <div className={`${styles.loginOptions} pb-4`}>
        <span className={`text text_type_main-default text_color_inactive`}>
          Уже зарегистрированы?
        </span>
        <Link className={`${styles.link} pl-2`}>Войти</Link>
      </div>
    </div>
  );
};

export default Register;
