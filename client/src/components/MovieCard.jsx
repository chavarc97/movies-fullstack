import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const brokenUrl =
    "https://static.vecteezy.com/system/resources/previews/014/585/760/original/movie-poster-frame-template-with-now-showing-png.png";
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <img src={movie.poster_path || brokenUrl} alt="" className="h-[620px] sm:h-[520px] w-full object-cover hover:scale-105 transition-scale duration-300"/>
    </div>
  );
};
export default MovieCard;
