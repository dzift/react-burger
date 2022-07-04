import { useState, useRef, memo } from "react";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import styles from "./sign-in.module.css";
import { useDispatch, useSelector } from "react-redux";

import Preloader from "../../components/preloader/preloader";

import { loginInApp } from "../../services/actions/authorization";

const Login = () => {
  const dispatch = useDispatch();
  const { requestInProgress, isLoggedIn } = useSelector(
    (store) => store.AuthorizationData
  );

  const location = useLocation();

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

  const loginUser = (e) => {
    e.preventDefault();
    dispatch(loginInApp(password, email));
  };

  if (isLoggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  return (
    <>
      {requestInProgress ? (
        <div className={`pt-30`}>
          <Preloader />
        </div>
      ) : (
        <div className={`${styles.container}`}>
          <p className={`${styles.title} text text_type_main-medium pb-6`}>
            Вход
          </p>

          <form onSubmit={loginUser} className={`${styles.form} pb-20`}>
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
            <PasswordInput
              onChange={onChange}
              value={password}
              name={"password"}
            />
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
      )}
    </>
  );
};

export default memo(Login);
