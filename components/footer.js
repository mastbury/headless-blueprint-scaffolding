import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      &copy; JimCuddy.com {new Date().getFullYear()}. All Rights Reserved.
    </footer>
  );
}
