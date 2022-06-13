import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
import style from "@/components/layout/layout.module.css";
import { NAVCATEGORIES } from "@/graphql/category/queries";
import { useQuery } from "@apollo/client";
import Spinner from "@/components/spinner";
function Layout({ children }) {
  const { data, loading } = useQuery(NAVCATEGORIES);
  if (data)
    return (
      <>
        <Banner />
        <Navbar menuItem={data.categories.categories} />
        <main className={style.main}>{children}</main>
        <Footer />
      </>
    );
  if (loading) return <Spinner />;
}

export default Layout;
