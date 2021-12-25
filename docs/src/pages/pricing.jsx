import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

export default function Pricing() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Pricing | ${siteConfig.title}`} description="">
      <header className={clsx("hero hero--secondary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Pricing</h1>
        </div>
      </header>
      <main>
        <div className="container padding-vert--lg text--center">
          <h2>Explain the pricing here and how to pay for the </h2>
        </div>
      </main>
    </Layout>
  );
}
