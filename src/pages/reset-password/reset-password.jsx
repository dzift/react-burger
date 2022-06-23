import React, { useState, useRef, memo, useEffect } from "react";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import {
  resetForgotPass,
  getUserData,
} from "../../services/actions/authorization";
import styles from "./reset-password.module.css";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../components/preloader/preloader";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const { requestInProgress, requestError, user } = useSelector(
    (store) => store.AuthorizationData
  );

  const auth = !!localStorage.getItem("refreshToken");

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const [token, setToken] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [password, setPassword] = useState("");
  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const sendPassword = (e) => {
    e.preventDefault();
    dispatch(resetForgotPass(password, token));
  };
  if (user.password) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }

  if (!!user.name && auth) {
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
        Восстановление пароля
      </p>
      {requestInProgress ? (
        <Preloader />
      ) : (
        <form onSubmit={sendPassword} className={`${styles.form} pb-20`}>
          <PasswordInput
            value={password}
            name={"password"}
            onChange={onChange}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setToken(e.target.value)}
            value={token}
            name={"code"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
          {requestInProgress ? (
            <Preloader />
          ) : (
            <Button type="primary" size="large">
              Сохранить
            </Button>
          )}
        </form>
      )}

      <div className={`${styles.loginOptions} pb-4`}>
        <span className={`text text_type_main-default text_color_inactive`}>
          Вспомнили пароль?
        </span>
        <Link to="/login" className={`${styles.link} pl-2`}>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default memo(ResetPassword);
