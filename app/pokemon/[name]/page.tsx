"use client";

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading';
import Footer from '@/app/components/Footer';

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

function Page({ params }: { params: any }) {
  const [nextPokemon, setNextPokemon] = useState<any>({});
  const [previousPokemon, setPrivousPokemon] = useState<any>({});
  const [pagePokemon, setPagePokemon] = useState<any>({});
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(true); // Loading state
  const name: string = params.name;
  const router = useRouter();
  const formatNumber = (num: number) => `# ${num.toString().padStart(3, '0')}`;
  const getTypeStyles = (typeName: string) => TYPE_STYLES[getTypeIndex(typeName)] || TYPE_STYLES[18];
  const convertCmToFeetAndInches = (cm: number): string => {
    // 1 inch = 2.54 cm, so to convert cm to inches:
    const totalInches = cm / 2.54;

    // Calculate feet and inches
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);

    // Return formatted string with padding for inches if less than 10
    return `${feet}' ${inches.toString().padStart(2, '0')}"`;
  }
  const convertKgToPounds = (kg: number): string => {
    const pounds = (kg * 2.20462) / 10; // Convert kg to pounds and divide by 10
    return pounds.toFixed(1); // Format to one decimal place
  };

  const capitalizeString = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
  const textLimit = (text: string) => (text.length >= 15 ? text.slice(0, 12) + '...' : text);
  const maxStats = {
    hp: 255,
    attack: 190,
    defense: 230,
    specialAttack: 194,
    specialDefense: 230,
    speed: 180,
  };


  // Fetch Page's Pokemon
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`).then((res) => res.status !== 404 ? res.json() : null);
        if (data) {
          setPagePokemon(data);
        }
      } catch (error) {
        console.error(`Error occurred while fetching data: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  // Fetch Next Pokemon And Page's Description

  useEffect(() => {
    if (pagePokemon?.id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pagePokemon.id + 1}/`).then((res) => res.status !== 404 ? res.json() : null);
          if (data) setNextPokemon(data);
        } catch (error) {
          console.error(`Error occurred while fetching data: ${error}`);
        } finally {
          setLoading(false)
        }
      };

      const fetchPreviousData = async () => {
        try {

          setLoading(true);
          const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pagePokemon.id - 1 <= 0 ? 1025 : pagePokemon.id - 1}/`).then((res) => res.status !== 404 ? res.json() : null);
          if (data) setPrivousPokemon(data);
        } catch (error) {
          console.error(`Error occurred while fetching data: ${error}`);
        } finally {
          setLoading(false)
        }
      };


      // Fetch Description
      const fetchDescription = async () => {
        try {
          const data = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pagePokemon.id}/`).then((res) => res.status !== 404 ? res.json() : null);
          if (data) setDescription(data.flavor_text_entries[0].flavor_text);
        } catch (error) {
          console.error(`Error occurred while fetching data: ${error}`);
        }
      }



      fetchData();
      fetchDescription();
      fetchPreviousData();
    }
  }, [pagePokemon]);

  return (
    <>
    <div className='h-full w-full flex flex-col'>
      {/* ---------------------------------------------------------------- */}
      <div className='flex  justify-between mb-2'>
        {/* Back Button */}
        <div className='bg-red-500 hover:bg-red-400 rounded-lg md:text-lg text-sm md:p-3 p-2 font-bold text-white duration-100 cursor-pointer hover:scale-105 active:scale-100' onClick={() => router.push(`${previousPokemon?.name ? `../pokemon/${previousPokemon?.name}` : '../generation'}`)}>
          <FontAwesomeIcon icon={faCaretLeft} /> &nbsp;{previousPokemon?.id ? formatNumber(previousPokemon.id.toString().toUpperCase()) : ""} {previousPokemon?.name ? capitalizeString(previousPokemon.name) : 'Home'}
        </div>
        {nextPokemon?.name ? (
          <div className='bg-red-500 hover:bg-red-400 rounded-lg md:text-lg text-sm md:p-3 p-2 font-bold text-white duration-100 cursor-pointer hover:scale-105 active:scale-100' onClick={() => router.push(`../pokemon/${nextPokemon.name.toLowerCase()}`)}>
            {capitalizeString(nextPokemon.name)}&nbsp; {formatNumber(nextPokemon.id.toString().toUpperCase())}&nbsp;<FontAwesomeIcon icon={faCaretRight} />
          </div>
        ) : (
          ''
        )}
      </div>

      {/* ---------------------------------------------------------------- */}

      {loading ? (
        <Loading />
      ) : pagePokemon?.name ? (
        <div className='poke-background border-2 shadow-lg lg:w-2/4 md:w-3/4 w-full rounded-lg  mx-auto pb-10  flex flex-col md:text-3xl sm:text-xl text-sm font-bold md:p-5 p-3'>
          {/* Name and no */}
          <div className='flex justify-center md:text-3xl text-xl font-bold mb-5 text-black relative w-full'>
            {pagePokemon.name.toString().toUpperCase()}
            <div className='absolute right-0 text-gray-400'>{formatNumber(pagePokemon.id.toString().toUpperCase())}</div>
            <div className='absolute left-0 text-white bg-red-500 md:text-xl text-base rounded-lg p-1 px-2 hover:bg-red-400 cursor-pointer hover:scale-105 active:scale-100 duration-100' onClick={() => router.push("../generation")}>Home</div>
          </div>

          {/* Detail */}
          <div className='flex lg:flex-row flex-col w-full mb-5'>
            {/* Left */}
            <div className='md:w-2/5 w-3/4 flex flex-col lg:mr-5 mx-auto lg:mb-0 md:mb-5 mb-3'>
              {/* Image */}
              <div className='flex justify-center items-center bg-gray-200 rounded-lg'>
                <img src={pagePokemon.sprites.other['official-artwork'].front_default} alt=""/>
              </div>
            </div>
            {/* Right */}
            <div className='lg:w-3/5 w-full flex flex-col'>
              {/* Description */}
              <div className='flex lg:text-balance text-center md:text-lg text-base font-thin text-black mb-5'>
                {description}
              </div>

              {/* Blue Card */}
              <div className='flex mb-5 bg-blue-400 md:p-5 p-3 rounded-lg'>
                {/* Left */}
                <div className='flex flex-col justify-between w-1/2'>
                  {/* Height */}
                  <div className='flex flex-col md:text-lg text-base text-white mb-10'>
                    Height
                    <div className='text-black font-thin mt-2'>{convertCmToFeetAndInches(pagePokemon.height * 10)}</div>
                  </div>

                  {/* Weight */}
                  <div className='flex flex-col md:text-lg text-base text-white'>
                    Weight
                    <div className='text-black font-thin mt-2'>{convertKgToPounds(pagePokemon.weight)} lbs</div>
                  </div>

                </div>

                {/* Right */}
                <div className='flex flex-col justify-between w-1/2'>
                  {/* CAtegory */}
                  <div className='flex flex-col md:text-lg text-base text-white mb-10'>
                    Category
                    <div className='text-black font-thin mt-2'>{capitalizeString(pagePokemon.types[0].type.name)}</div>
                  </div>

                  {/* Abilities */}
                  <div className='flex flex-col md:text-lg text-base text-white'>
                    Abilities
                    <div className='flex flex-col text-black font-thin mt-2'>
                      {pagePokemon.abilities.map((a: any, index: any) => (
                        <div key={index}>{capitalizeString(a.ability.name)}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Types */}
              <div className='flex flex-col md:text-xl text-base text-black font-thin'>
                Types
                <div className='flex gap-2 mt-3'>
                  {pagePokemon.types.map((t: any, index: any) => {
                    const { color } = getTypeStyles(t.type.name);
                    return (
                      <div key={index} className={`${color} py-1 px-2 rounded-lg`}>
                        <h1 className={`md:text-lg text-base text-white font-bold`}>{capitalizeString(t.type.name)}</h1>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className='flex flex-col w-full md:text-xl text-base font-thin'>
            Stats
            {/* HP */}
            <div className='flex flex-col md:text-lg text-base mt-3'>
              HP
              <div className='w-full h-2 bg-gray-300 rounded-full relative mt-1'>
                <div className='absolute h-full bg-gray-500 rounded-full' style={{ width: `${(pagePokemon.stats[0].base_stat / maxStats.hp) * 100}%` }} />
              </div>
            </div>s

            {/* Attack */}
            <div className='flex flex-col  md:text-lg text-base mt-3'>
              Attack
              <div className='w-full h-2 bg-gray-300 rounded-full relative mt-1'>
                <div className='absolute h-full bg-gray-500 rounded-full' style={{ width: `${(pagePokemon.stats[1].base_stat / maxStats.attack) * 100}%` }} />
              </div>
            </div>

            {/* Defense */}
            <div className='flex flex-col  md:text-lg text-base mt-3'>
              Defense
              <div className='w-full h-2 bg-gray-300 rounded-full relative mt-1'>
                <div className='absolute h-full bg-gray-500 rounded-full' style={{ width: `${(pagePokemon.stats[2].base_stat / maxStats.defense) * 100}%` }} />
              </div>
            </div>

            {/* SP Attack */}
            <div className='flex flex-col  md:text-lg text-base mt-3'>
              Special Attack
              <div className='w-full h-2 bg-gray-300 rounded-full relative mt-1'>
                <div className='absolute h-full bg-gray-500 rounded-full' style={{ width: `${(pagePokemon.stats[3].base_stat / maxStats.specialAttack) * 100}%` }} />
              </div>
            </div>

            {/* SP Defense */}
            <div className='flex flex-col  md:text-lg text-base mt-3'>
              Special Defense
              <div className='w-full h-2 bg-gray-300 rounded-full relative mt-1'>
                <div className='absolute h-full bg-gray-500 rounded-full' style={{ width: `${(pagePokemon.stats[4].base_stat / maxStats.specialDefense) * 100}%` }} />
              </div>
            </div>

            {/* Speed */}
            <div className='flex flex-col text-lg mt-3'>
              Speed
              <div className='w-full h-2 bg-gray-300 rounded-full relative mt-1'>
                <div className='absolute h-full bg-gray-500 rounded-full' style={{ width: `${(pagePokemon.stats[5].base_stat / maxStats.speed) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex justify-center items-center md:text-3xl sm:text-xl text-sm font-bold'>
          <FontAwesomeIcon icon={faWarning} className='mr-2' />
          No pokemon named&nbsp;<div className='text-red-500'>"{textLimit(capitalizeString(name))}"</div>&nbsp;were found.
        </div>
      )}
      

    <Footer/>
    </div></>
  );
}

export default Page;
