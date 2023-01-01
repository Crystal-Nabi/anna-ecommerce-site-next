import BackButton from "../../components/buttons/BackButton";
import AllProductsSection from "../../components/sections/AllProductsSection";

const ProductsPage = () => {
  return (
    <>
      <BackButton />
      {/* @ts-expect-error Server Component */}
      <AllProductsSection />
    </>
  );
};

export default ProductsPage;