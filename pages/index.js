import BannerSection from "../Components/HomeComponents/BannerSection";
import ProductRow from "../Components/HomeComponents/ProductRow";
import ShopByPet from "../Components/HomeComponents/ShopByPet";



export default function Home() {
  return (

    <div className="my-8 homepage">

      {/* BANNER SECTION */}
      <BannerSection />

      {/* SHOP BY PET */}
      <ShopByPet />

      {/* TOP PRODUCTS */}
      <ProductRow title="Top Products" />

      {/* EXPERT PICK */}
      <ProductRow title="Picked By Our Experts" />

      {/* CUSTOMER FAVORITES */}
      <ProductRow title="Customer Favorites" />

      {/* CTA */}

      {/* BRANDS */}

      {/* FOOTER */}

    </div>

  )
}
