import React, { useState, useEffect } from 'react'; // useStateのインポート
import { useParams } from 'react-router-dom';
import { getPokemonDetail } from '../pokemondetail';

function Detail() {
    const { pokemonName } = useParams<{ pokemonName: string }>();
    const [pokemonDetail, setPokemonDetail] = useState({
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
            <h2>{pokemonDetail.name}の詳細ページ</h2>
            <p><strong>名前:</strong> {pokemonDetail.name}</p>
            <p><strong>分類:</strong> {pokemonDetail.generaName}</p>
            <p><strong>タイプ:</strong> {pokemonDetail.typesString}</p>
            <p><strong>説明:</strong> {pokemonDetail.formattedFlavorText}</p>
        </div>
    );
}

export default Detail;