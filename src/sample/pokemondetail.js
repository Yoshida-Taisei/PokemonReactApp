"use strict";
/*
 ポケモンAPIから詳細情報を取得する
  $ npx tsc sample/pokemondetail.ts
  $ node sample/pokemondetail.js
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
function fetchPokemonInfo(pokemonNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var response, speciesUrl, responseSpecies, names, nameData, name_1, genera, generaData, generaName, responseTypes, typeNumber, typesString, i, responseType, responseTypeName, type, flavorTextEntries, flavorTextEntryData, flavorText, formattedFlavorText, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, axios_1["default"].get("https://pokeapi.co/api/v2/pokemon/".concat(pokemonNumber))];
                case 1:
                    response = _a.sent();
                    speciesUrl = response.data.species.url;
                    return [4 /*yield*/, axios_1["default"].get(speciesUrl)];
                case 2:
                    responseSpecies = _a.sent();
                    names = responseSpecies.data.names;
                    nameData = names.find(function (v) { return v.language.name == "ja"; });
                    name_1 = nameData ? nameData.name : "";
                    genera = responseSpecies.data.genera;
                    generaData = genera.find(function (v) { return v.language.name == "ja"; });
                    generaName = generaData ? generaData.genus : "";
                    responseTypes = response.data.types;
                    typeNumber = responseTypes.length;
                    typesString = "";
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < typeNumber)) return [3 /*break*/, 6];
                    return [4 /*yield*/, axios_1["default"].get(responseTypes[i].type.url)];
                case 4:
                    responseType = _a.sent();
                    responseTypeName = responseType.data.names;
                    type = responseTypeName.find(function (v) { return v.language.name == "ja"; });
                    if (i > 0) {
                        typesString += "/";
                    }
                    typesString += type.name;
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    flavorTextEntries = responseSpecies.data.flavor_text_entries;
                    flavorTextEntryData = flavorTextEntries.find(function (v) { return v.language.name == "ja"; });
                    flavorText = flavorTextEntryData
                        ? flavorTextEntryData.flavor_text.trim()
                        : "";
                    formattedFlavorText = flavorText
                        .replace(/\s+/g, "")
                        .trim();
                    // 出力
                    console.log("\u540D\u524D: ".concat(name_1));
                    console.log("\u5206\u985E: ".concat(generaName));
                    console.log("\u30BF\u30A4\u30D7: ".concat(typesString));
                    console.log("\u8AAC\u660E: ".concat(formattedFlavorText));
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error("エラー:", error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
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
