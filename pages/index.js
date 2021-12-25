import Head from 'next/head';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRepo } from '../utilities/axiosRequests';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const [selectedBranch, setSelectedBranch] = React.useState('');
  const [branches, setBranches] = React.useState('');
  const repoName = 'fullstack-interview-test';

  useEffect(() => {
    getRepo(repoName).then((data) => setBranches(data));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/branch/${selectedBranch}`);
  };

  //pending on change selected branch

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
            <label htmlFor="search">
              Selecciona un repositorio para continuar:
            </label>
            <br />
            <div className="searchForm__input">
              <select
                name="search"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="default">Seleccionar rama </option>

                {branches
                  ? branches.data.map((branch) => (
                      <>
                        <option key={branch.name} value={branch.name}>
                          {branch.name}
                        </option>
                      </>
                    ))
                  : 'No branches found'}
              </select>
              <br />
              <button onClick={handleClick}>Buscar</button>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p className="text-center">
          Developed by: Rodolfo Murguia Copyright &copy;{' '}
          <a href="https://www.flat.mx/">flat.mx</a>{' '}
        </p>
      </footer>
    </div>
  );
}
