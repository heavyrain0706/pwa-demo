import React from 'react';
import styles from "./Layout.module.scss";

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <header>
      <h1>Photo Library</h1>
    </header>
    <div className={styles.layout__container}>
      <main>
        {children}
      </main>
    </div>
  </div>
);

export default Layout;