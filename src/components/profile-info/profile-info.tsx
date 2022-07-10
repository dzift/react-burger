import { useState, useRef, useEffect, SyntheticEvent } from "react";

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
  const { user } = useSelector((store: any) => store.AuthorizationData);

  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>("");
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const onChange = (e: SyntheticEvent) => {
    setShowButton(true);
    setPassword((e.target as HTMLInputElement).value);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const cancelChanges = () => {
    setShowButton(false);
    setName(user.name);
    setEmail(user.email);
  };

  const updateUser = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserData(password, email, name) as any);
  };

  return (
    <div className={`${styles.containerInfo}`}>
      <form onSubmit={updateUser} className={`${styles.form} pb-20`}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => {
            setName(e.target.value);
            setShowButton(true);
          }}
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
          onChange={(e) => {
            setEmail(e.target.value);
            setShowButton(true);
          }}
          value={email}
          name={"email"}
          error={false}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <PasswordInput onChange={onChange} value={password} name={"password"} />

        {showButton && (
          <div className={`${styles.containerButton}`}>
            <Button type="secondary" size="medium" onClick={cancelChanges}>
              Отмена
            </Button>
            <Button type="primary" size="large">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileInfo;
