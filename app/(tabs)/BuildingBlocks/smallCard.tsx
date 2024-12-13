// Importar datos
import React from "react";
import { loadedMovies } from "./app/(tabs)/data/data.tsx";

// Definición del tipo de props
interface MovieProps {
  id: number;
  name: string;
  rating: number;
  year: number;
  poster: string;
  language: string;
  overview: string;
}

// Componente SmallCard
const SmallCard: React.FC<MovieProps> = ({ name, rating, year, poster, overview }) => {
  return (
    <div style={styles.card}>
      <img src={poster} alt={name} style={styles.poster} />
      <div style={styles.content}>
        <h2 style={styles.title}>{name}</h2>
        <p style={styles.details}>Year: {year} | Rating: {rating}%</p>
        <p style={styles.overview}>{overview}</p>
      </div>
    </div>
  );
};

// Estilos en línea
const styles = {
  card: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    margin: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  poster: {
    width: "120px",
    height: "180px",
    objectFit: "cover",
  },
  content: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "1.2em",
    margin: "0 0 5px",
  },
  details: {
    fontSize: "0.9em",
    color: "#555",
  },
  overview: {
    fontSize: "0.8em",
    color: "#777",
  },
};

const MovieList: React.FC = () => {
  return (
    <div>
      {loadedMovies.movies.map((movie) => (
        <SmallCard key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default smallCard;
