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
const NEWS_QUERY = gql`
  query NewsPageItems {
  posts {
    nodes {
      postId
      title
      uri
      excerpt
    }
  }
}
`;

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } = props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;

  // Use the StickyNews query
  const { data, loading, error } = useQuery(NEWS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching sticky news:", error);
    return <p>Error: {error.message}</p>;
  }

  const posts = data.posts.nodes;
  console.log(posts);

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
        <EntryHeader title="News" />
        <section className={style.cardGrid}>
          {posts.map(post => (
            <Link key={post.postId} href={`/${post.uri}`} className={style.card}>
              <h3>{post.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

// Attach the GetHomePage query to the Component
Component.query = GET_HOME_PAGE;