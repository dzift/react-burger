import { useState, useRef, memo, SyntheticEvent } from "react";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { resetForgotPass } from "../../services/actions/authorization";
import styles from "./reset-password.module.css";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../components/preloader/preloader";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const { requestInProgress, user, isLoggedIn } = useSelector(
    (store: any) => store.AuthorizationData
  );

  const [token, setToken] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [password, setPassword] = useState("");
  const onChange = (e: SyntheticEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  const sendPassword = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetForgotPass(password, token) as any);
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

  if (isLoggedIn || !user.email) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
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
            Восстановление пароля
          </p>

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
            <Button type="primary" size="large">
              Сохранить
            </Button>
          </form>

          <div className={`${styles.loginOptions} pb-4`}>
            <span className={`text text_type_main-default text_color_inactive`}>
              Вспомнили пароль?
            </span>
            <Link to="/login" className={`${styles.link} pl-2`}>
              Войти
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(ResetPassword);
