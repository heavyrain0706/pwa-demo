import styles from "./Photo.module.scss";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PhotosService from "../../services/photosService";

const Photo = () => {

    const { id } = useParams();
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await PhotosService.fetchPhotoById(id);
                setPhoto(data);
            } catch (error) {
                console.error(`Failed to fetch photo with id ${id}:`, error);
            }
        };

        fetchData();
    }, [id]);

    if (!photo) {
        return <div>Loading...</div>;
    }


    return (
        <div className={styles.photo}>
            <div className={styles.photo__media}>
                <img src={photo.url} alt={photo.title} />
            </div>
            <div className={styles.photo__textbox}>
                <h1>{photo.title}</h1>
            </div>
        </div>
    )
}

export default Photo;