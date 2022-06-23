import React, { useState, useRef, memo, useEffect } from "react";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-info.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../services/actions/authorization";

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.AuthorizationData);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const inputRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const cancelChanges = () => {
    setName(user.name);
    setEmail(user.email);
  };

  const updateUser = (e) => {
    e.preventDefault();
    dispatch(updateUserData(password, email, name));
  };

  return (
    <div className={`${styles.containerInfo}`}>
      <form onSubmit={updateUser} className={`${styles.form} pb-20`}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setName(e.target.value)}
          icon={"EditIcon"}
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
          icon={"EditIcon"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          error={false}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <PasswordInput onChange={onChange} value={password} name={"password"} />

        <div className={`${styles.containerButton}`}>
          <Button type="primary" size="large" onClick={cancelChanges}>
            Отмена
          </Button>
          <Button type="primary" size="large">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(ProfileInfo);
