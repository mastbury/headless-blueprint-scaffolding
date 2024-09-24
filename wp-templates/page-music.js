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
const DISCOGRAPHY_ITEMS = gql`
  query DiscographyItems {
  discographyItems {
    nodes {
      title
      uri
      discography {
        albumCover {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
}
`;

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } = props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;

  // Use the StickyNews query
  const { data, loading, error } = useQuery(DISCOGRAPHY_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching sticky news:", error);
    return <p>Error: {error.message}</p>;
  }

  const discographyItems = data.discographyItems.nodes;
  console.log(discographyItems);

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
        <EntryHeader title="Discography" />
        <section className={style.cardGrid}>
          {discographyItems.map(discographyItem => (
            <article key={discographyItem.uri} className={style.card}>
              <Link href={discographyItem.uri}>
                
                  <img
                    src={discographyItem.discography.albumCover.node.mediaItemUrl}
                    alt={discographyItem.title}
                  />
                  <h2>{discographyItem.title}</h2>
                
              </Link>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

// Attach the GetHomePage query to the Component
Component.query = GET_HOME_PAGE;