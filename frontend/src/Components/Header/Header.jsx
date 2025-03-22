import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import pic1 from "../../assets/Header/top-view-selection-fine-powders-bowls-with-copy-space-stones.jpg";
import pic2 from "../../assets/Header/natural-cosmetics-desk.jpg";
import pic3 from "../../assets/Header/lisa-hobbs-mRaNok_Ld6s-unsplash.jpg";
import pic4 from "../../assets/Header/chinh-le-duc-vuDXJ60mJOA-unsplash.jpg";
import pic5 from "../../assets/Neem brush/409e7650-57da-4301-8419-5234dc229e69.jpg"
const Header = () => {
  return (
    <div className="w-full">
      {/* Swiper Carousel */}
      <section className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-full h-[300px] md:h-[500px]"
        >
          <SwiperSlide>
            <img
              src={pic1}
              alt="Neem"
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={pic2}
              alt="Natural Cosmetics"
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={pic3}
              alt="Nature Scenery"
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={pic4}
              alt="Herbal Products"
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={pic5}
              alt="Herbal Products"
              className="w-full md:w-[1000px] h-[300px] md:h-[500px] object-cover m-auto"
            />
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
};

export default Header;
