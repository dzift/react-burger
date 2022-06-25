import React, { useState, useRef, memo, useEffect } from "react";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { createNewUser } from "../../services/actions/authorization";
import { Link, Redirect } from "react-router-dom";
import styles from "./registration.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/actions/authorization";
import Preloader from "../../components/preloader/preloader";

const Register = () => {
  const dispatch = useDispatch();
  const { requestInProgress, isLoggedIn } = useSelector(
    (store) => store.AuthorizationData
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const inputRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const sendNewUser = (e) => {
    e.preventDefault();
    dispatch(createNewUser(password, email, name));
  };

  if (isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <div className={`${styles.container}`}>
      <p className={`${styles.title} text text_type_main-medium pb-6`}>
        Регистрация
      </p>

      <form onSubmit={sendNewUser} className={`${styles.form} pb-20`}>
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          error={false}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <PasswordInput onChange={onChange} value={password} name={"password"} />
        {requestInProgress ? (
          <Preloader />
        ) : (
          <Button type="primary" size="large">
            Зарегистрироваться
          </Button>
        )}
      </form>

      <div className={`${styles.loginOptions} pb-4`}>
        <span className={`text text_type_main-default text_color_inactive`}>
          Уже зарегистрированы?
        </span>
        <Link to="/login" className={`${styles.link} pl-2`}>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default memo(Register);
