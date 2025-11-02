import { Children } from "react";
import type { ReactNode } from "react";

import styles from "./Nav.module.css";

export default function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <h2>
            <strong>TaskApp</strong>
          </h2>
        </li>
      </ul>
      <ul>
        {Children.map(children, (child) => (
          <div className="Row">{child}</div>
        ))}
      </ul>
    </nav>
  );
}
