import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import { EditorDemo } from "../components/EditorDemo";

export default function Home() {
  const code = `
editor.registerComponent('hero', {
  title: 'Hero',
  category: 'Banner',
  fields: [
    Text('title', {multiline: false}),
    HTMLText('content'),
    Repeater('buttons', {
      title: 'Buttons',
      addLabel: 'Add a new button',
      fields: [
        ButtonFields()
      ],
    })
  ],
})
`;
  const elementCode = `<visual-editor
  name="content"
  preview="https://renderer:8000/preview"
  iconsUrl="/icons/[name].svg"
  id="editor1"
  value=""
></visual-editor>`;
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Edit your page block by block"
    >
      <header
        className={clsx("hero hero--secondary hero--dark", styles.heroBanner)}
      >
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>

          <iframe
            className={`margin-bottom--lg ${styles.video}`}
            src="https://www.youtube-nocookie.com/embed/XIMLoLxmTDw?controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
            >
              Getting started
            </Link>
            <EditorDemo className="button--lg margin-left--sm" />
          </div>
        </div>
      </header>
      <main>
        <div className="container container padding-vert--lg">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col col--offset-2 col--4 margin-right--lg">
              <h2>Focus on the data</h2>
              <p>
                Instead of trying to give a full blown visual editor that has
                too much features `visual-editor` focus on the data. You choose
                what data you want and what kind of field you need for every
                block on your page. The user focus on the data while you can
                focus on the layout.
              </p>
            </div>
            <div className="col col--4">
              <CodeBlock className="language-js">{code}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="container container padding-vert--lg">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col col--4 col--offset-2 ">
              <img src="/visual-editor/img/frameworks.svg" alt="" />
            </div>
            <div className="col col--4 margin-left--lg">
              <h2>Framework agnostic</h2>
              <p>
                The editor does not care about the framework you use, you get
                the value and you are responsible of transforming the date into
                HTML. You can use any language / framework you want for
                rendering your page.
              </p>
            </div>
          </div>
        </div>

        <div className="container container padding-vert--lg">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col col--offset-2 col--4 margin-right--lg">
              <h2>Based on the specs</h2>
              <p>
                The editor uses custom element and HTML Attributes so it can be
                easily inserted anywhere.
              </p>
            </div>
            <div className="col col--4">
              <CodeBlock className="language-html">{elementCode}</CodeBlock>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
