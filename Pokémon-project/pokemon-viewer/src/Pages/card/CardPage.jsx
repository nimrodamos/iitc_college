import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import styles from "./CardPage.module.css";
import typeColors from "./typeColors";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function CardPage({
  name,
  image,
  types,
  stats,
  abilities,
  weight,
  height,
  baseExperience,
}) {
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleFavoriteClick = (event) => {
    event.stopPropagation(); // מונע סגירה של המודל בעת לחיצה על הכפתור
    setIsFavorite(!isFavorite);
  };

  const primaryType = types[0];
  const backgroundColor = typeColors[primaryType] || "#f4f4f4";

  return (
    <div
      className={styles.card}
      onClick={handleOpen}
      style={{ backgroundColor }}
    >
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <IconButton
        onClick={handleFavoriteClick}
        color={isFavorite ? "error" : "primary"}
        aria-label="favorite"
        sx={{
          fontSize: "2rem",
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className={styles.modalBox} style={{ backgroundColor }}>
          <h2 id="modal-title">
            {name.toUpperCase()} ({types.join(", ")})
          </h2>
          <img src={image} alt={name} className={styles.modalImage} />
          <div className={styles.section}>
            <h3>Stats:</h3>
            <p>HP: {stats.hp}</p>
            <p>Attack: {stats.attack}</p>
            <p>Defense: {stats.defense}</p>
            <p>Speed: {stats.speed}</p>
          </div>
          <div className={styles.section}>
            <h3>Abilities:</h3>
            <ul>
              {abilities.map((ability, index) => (
                <li key={index}>{ability}</li>
              ))}
            </ul>
          </div>
          <div className={styles.section}>
            <p>Weight: {weight} kg</p>
            <p>Height: {height} m</p>
            <p>Base Experience: {baseExperience}</p>
          </div>
          <button onClick={handleClose} className={styles.modalCloseButton}>
            Close
          </button>
          <IconButton
            onClick={handleFavoriteClick}
            color={isFavorite ? "error" : "primary"}
            aria-label="favorite"
            sx={{
              fontSize: "2rem",
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
      </Modal>
    </div>
  );
}

export default CardPage;
