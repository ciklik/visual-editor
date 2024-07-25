import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./pricing.module.css";

export default function Pricing() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`License | ${siteConfig.title}`} description="">
      <main>
        <h1 className={styles.title}>Pricing</h1>
        <div className={styles.prices}>
          <div className={styles.price}>
            <div className={styles.price__title}>Personal</div>
            <div className={styles.price__info}>Unlimited website</div>
            <div className={styles.price__value}>Free</div>
            <div className={styles.price__body}>
              Free for non commercial website
            </div>
          </div>
          <div className={styles.price}>
            <div className={styles.price__title}>Commercial</div>
            <div className={styles.price__info}>One project</div>
            <div className={styles.price__value} style={{ fontSize: "2em" }}>
              On Demand
            </div>
            <div className={styles.price__body}>
              The pricing will demand of the scope of your project (Commercial
              CMS, Agency website...)
            </div>
            <div className={styles.price__action}>
              <a
                href="https://www.ciklik.com/notre-histoire/#first_name"
                className="button button--primary button--lg"
                target="_blank"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
