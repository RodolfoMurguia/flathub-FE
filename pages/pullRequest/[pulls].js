import React from "react";
import Head from "next/head";
import Image from "next/image";
import { commit } from "../../components/commits/commit";

const branch = () => {
  let branch = "Master";

  return (
    <div className="container">
      <Head>
        <title>Flat Repo Explorer - Branches</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main>
        <div className="squaredFrameBranch">
          <div className="squaredFrame__content">
            <Image
              src={`/logo.png`}
              alt="Flat Repo Explorer"
              width={100}
              height={100}
            />
          </div>

          

          <div className="searchForm">
            <h3>Vista General de la rama: {branch}</h3>
            
            <div className="branchContainer">

                <p>
                    Creado por:
                </p>

                <p>
                    Creado por:
                </p>

            </div>

            <div className="commitContainer">

                <commit/>


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
};

export default branch;
