import React from "react";
import styles from "../styles/TextInput.module.css";

type TextInputType =
  | "text"
  | "email"
  | "submit"
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "tel"
  | "time"
  | "url"
  | "week";

interface TextInputProps extends React.HTMLAttributes<HTMLInputElement> {
  name?: string;
  type?: TextInputType;
  placeholder?: string;
  autocomplete?: string;
  id?: string;
}

export const TextInput = ({
  name,
  type,
  placeholder,
  autocomplete = "off",
  id,
  ...rest
}: TextInputProps) => {
  return (
    <input
      className={styles.input}
      name={name ? name : ""}
      type={type ? type : "text"}
      placeholder={placeholder ? placeholder : ""}
      autoComplete={autocomplete}
      id={id ? id : ""}
      {...rest}
    />
  );
};
