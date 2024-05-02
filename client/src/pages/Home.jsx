import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(genres);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies/get?limit=6");
      const data = await res.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <main>
      {/* top section */}
      <section className="flex flex-col gap-7 p-28 px-9 justify-center border-b shadow-lg">
        <h1 className="text-4xl font-semibold text-cyan-800">
          Find your new <span className="text-cyan-500">favorite</span>
          <br />
          movie with ease
        </h1>
        <div className="text-neutral-400 w-[300px] sm:w-[450px] text-justify">
          Discover your ideal movie experience effortlessly with MovieMate. At
          MovieMate, locating your perfect film is simple, quick, and enjoyable.
          Our knowledgeable team is here to assist you at every stage, making
          sure your journey is smooth and delightful.
        </div>
        <Link
          /* to={"/search"} */
          className="text-sm sm:text-md text-cyan-800 font-bold hover:text-cyan-600"
        >
          Let's get started...
        </Link>
      </section>
      {/* Carrousel */}
      <Swiper navigation>
        {movies.data &&
          movies.data.length > 0 &&
          movies.data.map((movie) => (
            <SwiperSlide key={movie._id}>
              <Link>
                <div
                  style={{
                    background: `url(${movie.backdrop_path}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[500px]"
                ></div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* Movies */}
      <section className="max-w-6xl mx-auto  p-3 flex flex-col gap-8 my-10 self-center">
        {/* map to show movie card component */}
        {movies.data && movies.data.length > 0 && (
          <div className=" justify-items-center">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-cyan-800">
                Recent Movies
              </h2>
            </div>
            <div className="flex flex-wrap gap-6 w-full justify-center">
              {movies.data.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
export default Home;
