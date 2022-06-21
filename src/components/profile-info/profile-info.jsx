import React, { useState, useRef, memo } from "react";

import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-info.module.css";
import { useDispatch, useSelector } from "react-redux";

const ProfileInfo = () => {
  const { name, email, password } = useSelector(
    (store) => store.AuthorizationData.user
  );

  const onChange = (e) => {
    // setPassword(e.target.value);
  };

  const inputRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  return (
    <div className={`${styles.containerInfo}`}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        // onChange={(e) => setName(e.target.value)}
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
        // onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={"email"}
        error={false}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
      />
      <PasswordInput onChange={onChange} value={password} name={"password"} />
    </div>
  );
};

export default memo(ProfileInfo);
