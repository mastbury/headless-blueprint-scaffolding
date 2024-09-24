import Link from "next/link";
import styles from "./footer.module.css";
import { gql, useQuery } from "@apollo/client";

const FOOTER_MENU_QUERY = gql`
query FooterMenu {
  menuItems(where: {location: FOOTER}) {
    nodes {
      id
      uri
      menuItemId
      label
    }
  }
}
`;

export default function Footer() {

  // Use the StickyNews query
  const { data, loading, error } = useQuery(FOOTER_MENU_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching footer menu!:", error);
    return <p>Error: {error.message}</p>;
  }

  const menuItems = data.menuItems.nodes;

  return (
    <footer className={styles.footer}>
      &copy; JimCuddy.com {new Date().getFullYear()}. All Rights Reserved.
      <ul className="footer-menu">
        {menuItems.map((item) => (
          <li key={item.id}><Link href={item.uri} >{item.label}</Link></li>
        ))}
      </ul>
    </footer>
  );
}
