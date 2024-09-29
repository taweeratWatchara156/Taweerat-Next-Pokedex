"use client";

import Card from '@/app/components/Card';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';

const getGenIndex = (type: string) => {
  const typeIndices: { [key: string]: number } = {
    i: 0,
    ii: 1,
    iii: 2,
    iv: 3,
    v: 4,
    vi: 5,
    vii: 6,
    viii: 7,
    xi: 8
  };
  return typeIndices[type] ?? typeIndices["default"];
}
import React, { useEffect, useState } from 'react';

const GEN_DATA = [
  { generation: "i", total: 151, startId: 1 },
  { generation: "ii", total: 100, startId: 152 },
  { generation: "iii", total: 135, startId: 252 },
  { generation: "iv", total: 107, startId: 387 },
  { generation: "v", total: 156, startId: 494 },
  { generation: "vi", total: 72, startId: 650 },
  { generation: "vii", total: 88, startId: 722 },
  { generation: "viii", total: 96, startId: 810 },
  { generation: "xi", total: 120, startId: 906 },
];



function Page({ params }: { params: any }) {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const gen: string = params.gen;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { total, startId } = GEN_DATA[getGenIndex(gen)] || { total: 0, startId: 0 };
        const promises = Array.from({ length: total }, (_, index) => {
          const id = startId + index;
          return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => res.json());
        });

        const allData = await Promise.all(promises);
        setPokemons(allData);
      } catch (error) {
        console.error(`Error occurred while fetching data: ${error}`);
      }
    };

    fetchData();
  }, [gen]); // Adding gen as a dependency

  return (
    <>
    <div className='h-screen flex flex-col'>
      <Navbar />
      <div className='nn flex w-full flex-grow'>
        <div className='flex flex-col my-5 w-full flex-grow'>
          <h1 className={`text-2xl font-bold text-blue-500 drop-shadow-lg shadow-blue-400`}>
            Generation {gen.toUpperCase()}
          </h1>

          {pokemons.length === 0 ? (
            <div className='loading flex items-center justify-center w-full h-full'>
              <img
                src='https://styleshit-pokedex.netlify.app/static/media/pokeball.8b0d0c2b.svg'
                alt="Loading"
                className="pokeball md:w-60 w-40"
              />
            </div>
          ) : (
            <div className='pokemon-grid mt-5 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border'>
              {pokemons.map((p, index) => (
                <Card
                  key={index}
                  no={p.id} // Optional chaining for safety
                  name={p.name}
                  types={p.types}
                  image={p.sprites.other['official-artwork'].front_default}
                />
              ))}
            </div>
            
          )}
          
        <Footer/>
        </div>
      </div>
    </div>
    </>
  );
}

export default Page;
