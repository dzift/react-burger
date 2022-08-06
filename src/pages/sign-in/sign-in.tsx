import { useState, useRef, memo, SyntheticEvent } from "react";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import styles from "./sign-in.module.css";
import { useDispatch, useSelector } from "../../utils/hooks";

import Preloader from "../../components/preloader/preloader";

import { loginInApp } from "../../services/actions/authorization";
import { TLocataionState } from "../../utils/types";

const Login = () => {
  const dispatch = useDispatch();
  const { requestInProgress, isLoggedIn } = useSelector(
    (store) => store.AuthorizationData
  );

  const location = useLocation<TLocataionState>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const onChange = (e: SyntheticEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  const loginUser = (e: SyntheticEvent) => {
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
              data-cy="mail"
            />
            <PasswordInput
              onChange={onChange}
              value={password}
              name={"password"}
              data-cy="pass"
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
