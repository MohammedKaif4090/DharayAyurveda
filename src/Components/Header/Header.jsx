import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import chia from "../../assets/Chia seeds/Brown_and_Gray_Minimalist_Packaging__Mockup_Pinterset_Pin_page-0001-removebg-preview (1).png";
import aloevera from "../../assets/Alovera/Copy_of_Green_Traditional_And_Elegant_Ayurvedic_Medicine_Poster-images-0-removebg-preview (1).png";
import gond from "../../assets/Gond/chia_.pdf-page-005-removebg-preview (2).png";

const Header = () => {

  return (
    <div className="w-full">
      {/* Swiper Carousel */}
      <section className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-full h-[300px] md:h-[500px]"
        >
           <SwiperSlide>
          <div className="flex flex-col md:flex-row bg-radial-[at_50%_75%] from-teal-400 via-emerald-600 to-green-950 to-90% justify-around items-center mx-auto pb-2">
            {/* Left Section: Text (visible on md and up) */}
            <div className="hidden md:flex md:w-1/2 flex-col md:items-start pl-10 pb-32 mt-16">
              <p className="text-white p-2 rounded text-4xl md:text-7xl leading-10 md:text-left">
                <span className="text-5xl md:text-8xl text-green-300 font-bold">Get Your</span>
                <br />
                <br />
                Chia Seeds Now
              </p>
            </div>

               {/* Right Section: Image */}
               <div className="w-full md:w-1/2 flex justify-center m-11">
                <img
                  src={chia}
                  alt="Chia"
                  className="w-[150px] md:w-[250px] h-full max-h-[150] md:h-[400px] object-cover rounded-md"
                />
              </div>
            </div>
        </SwiperSlide>

          <SwiperSlide>
        <div className="flex flex-col md:flex-row bg-radial-[at_50%_75%] from-teal-400 via-emerald-600 to-green-950 to-90% justify-around items-center mx-auto pb-2">
          {/* Left Section: Text and Logo */}
          <div className="hidden md:flex md:w-1/2 flex-col md:items-start pl-8 pb-32">
              <p className="text-white p-2 rounded text-4xl md:text-7xl leading-10 md:text-left  ">
                <span className="text-5xl md:text-8xl text-green-300 font-bold "> Get Your</span>
                <br />
                <br />
                Aloe Vera Gel Now
              </p>
            </div>

          {/* Right Section: Aloe Vera Image */}
          <div className="w-full md:w-1/2 p-7">
            <img
              src={aloevera}
              alt="Aloe Vera"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>

        </div>
      </SwiperSlide>

     <SwiperSlide>
          <div className="flex flex-col md:flex-row bg-radial-[at_50%_75%] from-teal-400 via-emerald-600 to-green-950 to-90% justify-around items-center mx-auto pb-2">
            {/* Left Section: Text (visible on md and up) */}
            <div className="hidden md:flex md:w-1/2 flex-col md:items-start pl-8 pb-32 mt-16">
              <p className="text-white p-2 rounded text-4xl md:text-7xl leading-10 md:text-left">
                <span className="text-5xl md:text-8xl text-green-300 font-bold">Get Your</span>
                <br />
                <br />
                Gond For Ladoo
              </p>
            </div>

              {/* Right Section: Image */}
              <div className="w-full md:w-1/2 flex justify-center m-11">
                <img
                  src={gond}
                  alt="Gond"
                  className="w-[150px] md:w-[250px] h-full max-h-[150] md:h-[400px] object-cover rounded-md"
                />
              </div>
            </div>
        </SwiperSlide>


        </Swiper>
      </section>
    </div>
  );
};

export default Header;