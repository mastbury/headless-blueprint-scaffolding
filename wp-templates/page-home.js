import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import EntryHeader from "../components/entry-header";
import Footer from "../components/footer";
import style from "../styles/front-page.module.css";

// Define the GetHomePage query
const GET_HOME_PAGE = gql`
  ${Header.fragments.entry}
  query GetHomePage {
    ...HeaderFragment
  }
`;

// Define the StickyNews query
const STICKY_NEWS_QUERY = gql`
  query StickyNews {
    posts {
      nodes {
        id
        slug
        title(format: RENDERED)
      }
    }
  }
`;

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } = props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;

  // Use the StickyNews query
  const { data, loading, error } = useQuery(STICKY_NEWS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching sticky news:", error);
    return <p>Error: {error.message}</p>;
  }

  const posts = data.posts.nodes;

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />
      <main className="container">
        <EntryHeader title="Welcome to the Faust Scaffold Blueprint" />
        <section className={style.cardGrid}>
          {posts.map(post => (
            <Link key={post.id} href={`/${post.slug}`} className={style.card}>
              <h3>{post.title}</h3>
            </Link>
          ))}
          <Link
            href="https://wpengine.com/atlas"
            target="_blank"
            rel="noopener noreferrer"
            className={style.card}
          >
            <h3>Deploy →</h3>
            <p>
              Deploy your Faust.js app to Atlas along with your WordPress
              instance.
            </p>
          </Link>
          <Link
            href="https://github.com/wpengine/faustjs"
            target="_blank"
            rel="noopener noreferrer"
            className={style.card}
          >
            <h3>Contribute →</h3>
            <p>Visit us on GitHub to explore how you can contribute!</p>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Attach the GetHomePage query to the Component
Component.query = GET_HOME_PAGE;