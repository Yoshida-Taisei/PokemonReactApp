import React from 'react';
import { useParams } from 'react-router-dom'; // useParamsのインポート

function Detail() {
    const { pokemonName } = useParams<{ pokemonName: string }>(); // パラメータからポケモンの名前を取得

    return (
        <div>
            {pokemonName}の詳細ページ
        </div>
    )
}

export default Detail;