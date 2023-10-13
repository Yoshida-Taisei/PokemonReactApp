/*
 ポケモンAPIから詳細情報を取得する
  $ npx tsc sample/pokemondetail.ts
  $ node sample/pokemondetail.js
*/

import axios from "axios";

async function fetchPokemonInfo(pokemonNumber: number) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
    );

    // ポケモン種族情報取得.
    const speciesUrl: string = response.data.species.url;
    const responseSpecies = await axios.get(speciesUrl);

    // 名前.
    const names: { name: string; language: { name: string } }[] =
      responseSpecies.data.names;
    const nameData = names.find((v) => v.language.name == "ja");
    const name: string = nameData ? nameData.name : "";

    // 分類
    const genera: { genus: string; language: { name: string } }[] =
      responseSpecies.data.genera;
    const generaData = genera.find((v) => v.language.name == "ja");
    const generaName: string = generaData ? generaData.genus : "";

    // タイプ.
    const responseTypes = response.data.types;
    const typeNumber = responseTypes.length;
    let typesString = "";
    for (let i = 0; i < typeNumber; i++) {
      const responseType = await axios.get(responseTypes[i].type.url);
      const responseTypeName = responseType.data.names;
      const type = responseTypeName.find(
        (v: { language: { name: string } }) => v.language.name == "ja"
      );
      if (i > 0) {
        typesString += "/";
      }
      typesString += type.name;
    }

    // 説明.
    const flavorTextEntries: {
      flavor_text: string;
      language: { name: string };
    }[] = responseSpecies.data.flavor_text_entries;
    const flavorTextEntryData = flavorTextEntries.find(
      (v) => v.language.name == "ja"
    );
    const flavorText: string = flavorTextEntryData
      ? flavorTextEntryData.flavor_text.trim()
      : "";
    const formattedFlavorText = flavorText
      .replace(/\s+/g, "")
      .trim();
    
      // 出力
    console.log(`名前: ${name}`);
    console.log(`分類: ${generaName}`);
    console.log(`タイプ: ${typesString}`);
    console.log(`説明: ${formattedFlavorText}`);
  } catch (error) {
    console.error("エラー:", error);
  }
}

// 名前: ピカチュウ
// 分類: ねずみポケモン
// タイプ: でんき
// 説明: 尻尾を立ててまわりの様子を探っているとときどき雷が尻尾に落ちてくる。
fetchPokemonInfo(25);

// 名前: ゲンガー
// 分類: シャドーポケモン
// タイプ: ゴースト/どく
// 説明: 物陰に姿を隠す。ゲンガーの潜んでいる部屋は温度が５度下がるといわれる。
fetchPokemonInfo(94);