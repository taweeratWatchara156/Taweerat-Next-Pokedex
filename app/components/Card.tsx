import { useRouter } from 'next/navigation';
import React from 'react';

interface PokemonCardProps {
  no: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  image: string;
}

const getTypeIndex = (type: string) => {
  const typeIndices: { [key: string]: number } = {
    normal: 0,
    fire: 1,
    water: 2,
    electric: 3,
    grass: 4,
    ice: 5,
    fighting: 6,
    poison: 7,
    ground: 8,
    flying: 9,
    psychic: 10,
    bug: 11,
    rock: 12,
    ghost: 13,
    dragon: 14,
    dark: 15,
    steel: 16,
    fairy: 17,
    default: 18,
  };
  return typeIndices[type] ?? typeIndices["default"];
}

const TYPE_STYLES = [
  {
    name: "normal",
    background: "bg-gradient-to-r from-gray-400 to-gray-300",
    color: "bg-gray-400",
  },
  {
    name: "fire",
    background: "bg-gradient-to-r from-red-600 to-red-500",
    color: "bg-red-500",
  },
  {
    name: "water",
    background: "bg-gradient-to-r from-blue-600 to-blue-500",
    color: "bg-blue-500",
  },
  {
    name: "electric",
    background: "bg-gradient-to-r from-yellow-400 to-yellow-300",
    color: "bg-yellow-400",
  },
  {
    name: "grass",
    background: "bg-gradient-to-r from-green-500 to-green-400",
    color: "bg-green-500",
  },
  {
    name: "ice",
    background: "bg-gradient-to-r from-blue-400 to-blue-300",
    color: "bg-blue-200",
  },
  {
    name: "fighting",
    background: "bg-gradient-to-r from-red-700 to-red-500",
    color: "bg-red-600",
  },
  {
    name: "poison",
    background: "bg-gradient-to-r from-violet-600 to-violet-500",
    color: "bg-violet-500",
  },
  {
    name: "ground",
    background: "bg-gradient-to-r from-yellow-600 to-yellow-500",
    color: "bg-yellow-500",
  },
  {
    name: "flying",
    background: "bg-gradient-to-r from-indigo-400 to-indigo-300",
    color: "bg-indigo-300",
  },
  {
    name: "psychic",
    background: "bg-gradient-to-r from-pink-600 to-pink-500",
    color: "bg-pink-500",
  },
  {
    name: "bug",
    background: "bg-gradient-to-r from-green-600 to-green-400",
    color: "bg-green-600",
  },
  {
    name: "rock",
    background: "bg-gradient-to-r from-yellow-700 to-yellow-600",
    color: "bg-yellow-600",
  },
  {
    name: "ghost",
    background: "bg-gradient-to-r from-purple-600 to-purple-500",
    color: "bg-purple-700",
  },
  {
    name: "dragon",
    background: "bg-gradient-to-r from-indigo-700 to-indigo-500",
    color: "bg-indigo-600",
  },
  {
    name: "dark",
    background: "bg-gradient-to-r from-gray-800 to-gray-700",
    color: "bg-gray-700",
  },
  {
    name: "steel",
    background: "bg-gradient-to-r from-gray-500 to-gray-300",
    color: "bg-gray-300",
  },
  {
    name: "fairy",
    background: "bg-gradient-to-r from-pink-400 to-pink-300",
    color: "bg-pink-300",
  },
  {
    name: "default",
    background: "bg-gradient-to-r from-gray-200 to-gray-100",
    color: "bg-gray-200",
  },
];

const Card: React.FC<PokemonCardProps> = ({ no, name, types, image }) => {
  const getTypeStyles = (typeName: string) => TYPE_STYLES[getTypeIndex(typeName)] || TYPE_STYLES[18];
  const route = useRouter()
  const formatNumber = (num: number) => `# ${num.toString().padStart(3, '0')}`;
  const capitalizeString = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
  const primaryType = types[0].type.name;
  const { background } = getTypeStyles(primaryType);

  return (
    <div className={`poke-card flex p-3 ${background} rounded-lg hover:scale-105 duration-100 active:scale-100 cursor-pointer`} onClick={() => route.push(`../pokemon/${name}`)}>
      {/* Details */}
      <div className="flex flex-col">
        <h1 className={`font-bold opacity-50`}>{formatNumber(no)}</h1>
        <h1 className={`font-bold lg:text-2xl text-3xl text-white`}>{capitalizeString(name)}</h1>

        {/* Types */}
        <div className="flex mt-2 gap-1">
          {types.map((t, index) => {
            const { color } = getTypeStyles(t.type.name);
            return (
              <div key={index} className={`${color} py-1 px-2 rounded-lg`}>
                <h1 className={`text-sm text-white font-bold`}>{capitalizeString(t.type.name)}</h1>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image */}
      <div className="flex justify-center items-center w-full z-20">
        <img src={image} alt={name} className={`lg:w-40 w-60`} />
      </div>
    </div>
  );
};

export default Card;
