import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}></div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Select Ui`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <div className="page">
        <h1>Welcome</h1>
        <p className="intro-text">
          Welcome to the documentation for the Select UI Component.
        </p>
        <p className="intro-text">
          This guide will help you understand, configure, and implement the
          Select UI component in your project.
        </p>

        <p className="intro-text">
          The goal of this project is to provide a scalable, customizable, and
          versatile Select component, designed to meet the needs of modern
          applications. As you explore the features, we hope you'll see how it
          can be tailored to fit a wide range of use cases.
        </p>
        <h2 className="section-title">Getting Started</h2>

        <div className="info-container">
          <p className="intro-text">
            To get started, simply install the package via npm:
          </p>
        </div>

        <pre className="code-block">
          <code>npm i select-ui</code>
        </pre>

        <p className="follow-up-text">
          Once installed, you can import the Select component in your project,
          and you are good to go.
        </p>

        <p className="follow-up-text">
          Lets start with the <a href="docs/showcase">Basic Functionality</a>
        </p>
      </div>
    </Layout>
  );
}
