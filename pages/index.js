import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { getRepo } from "../utilities/axiosRequests";


export default function Home() {

  const [branches, setBranches] = React.useState("");
  const repoName = 'fullstack-interview-test';

  useEffect(() => {
    getRepo(repoName).then((data) => setBranches(data));
  }, [])

  console.log(branches);

  return (
    <div className="container">
      <Head>
        <title>Flat Repo Explorer</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main>
        <div className="squaredFrame">
          <div className="squaredFrame__content">
            <Image
              src={`/logo.png`}
              alt="Flat Repo Explorer"
              width={100}
              height={100}
            />  
          </div>

         

          <div className="searchForm">
            <h3>Bienvenido a Flat Repo Explorer</h3>
            <label htmlFor="search">Selecciona un repositorio para continuar:</label>
            <br />
            <div className="searchForm__input">
              <select name="search">
                {branches ?  branches.data.map((branch) => (
                  <option key={branch.name} value={branch.name}>{branch.name}</option>
                )) : 'No branches found'}
              </select>
              <br/>
              <button>Buscar</button>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p className="text-center">
          Developed by: Rodolfo Murguia Copyright &copy; flat.mx{" "}
        </p>
      </footer>
    </div>
  );
}
