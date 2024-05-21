import React from 'react';
import { useEffect, useState } from "react";
import styles from "./PhotoList.module.scss";
import PhotosService from "../../services/photosService";
import { Link } from 'react-router-dom';

const PostsList = () => {

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await PhotosService.fetchPhotos();
                setPhotos(data);
            } catch (error) {
                console.error('Failed to fetch photos:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className={styles.photos}>
            <div className={styles.photos__list}>
                {photos.map(photo => (
                    <div className={styles.photos__card} key={photo.id}>
                        <Link to={`/photos/${photo.id}`}>
                            <img src={photo.thumbnailUrl} alt={photo.title} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostsList;