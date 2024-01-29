import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import logo from "@/public/logo/f4e-logo-short.webp";

const LoaderSpinner = () => (
  <div className={styles.ring}>
    <Image priority src={logo} alt="Loading Logo" className="h-[70%] w-[70%]" />
  </div>
);

export default LoaderSpinner;
