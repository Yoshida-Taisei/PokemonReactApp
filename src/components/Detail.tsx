import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetail } from '../pokemondetail';

function Detail() {
    const { pokemonName } = useParams<{ pokemonName: string }>();
    const [pokemonDetail, setPokemonDetail] = useState({
        imageUrl: "",
        name: "",
        generaName: "",
        typesString: "",
        formattedFlavorText: "",
    });

    useEffect(() => {
        async function fetchPokemonDetail() {
            try {
                const detail = await getPokemonDetail(Number(pokemonName));
                setPokemonDetail(detail);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPokemonDetail();
    }, [pokemonName]);

    return (
        <div>
            <img
                src={pokemonDetail.imageUrl}
                alt={pokemonDetail.name}
                style={{ width: "150px", height: "150px" }}
            />
            <p><strong>名前:</strong> {pokemonDetail.name}</p>
            <p><strong>分類:</strong> {pokemonDetail.generaName}</p>
            <p><strong>タイプ:</strong> {pokemonDetail.typesString}</p>
            <p><strong>説明:</strong> {pokemonDetail.formattedFlavorText}</p>
        </div>
    );
}

export default Detail;