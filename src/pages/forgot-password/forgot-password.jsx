import { useState, useRef, memo } from "react";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { postForgotPass } from "../../services/actions/authorization";
import styles from "./forgot-password.module.css";
import { useDispatch, useSelector } from "react-redux";

import Preloader from "../../components/preloader/preloader";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { requestInProgress, user, isLoggedIn } = useSelector(
    (store) => store.AuthorizationData
  );

  const [email, setEmail] = useState("");
  const inputRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const sendMail = (e) => {
    e.preventDefault();
    dispatch(postForgotPass(email));
  };
  if (user.email) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
        }}
      />
    );
  }
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
          <form onSubmit={sendMail} className={`${styles.form} pb-20`}>
            <Input
              type={"text"}
              placeholder={"Укажите e-mail"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={"name"}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={"Ошибка"}
              size={"default"}
            />
            <Button type="primary" size="large">
              Восстановить
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

export default memo(ForgotPassword);
