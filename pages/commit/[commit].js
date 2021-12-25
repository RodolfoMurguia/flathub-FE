import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { getCommitDetails } from '../../utilities/axiosRequests';

import { useRouter } from 'next/router';

const commit = () => {
  //we define the router, and recover the commit id
  const router = useRouter();

  //added efect to validate if router.query.branch exist
  React.useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  //variables and states
  const commit =
    router.query.commit || '3e489f26eb5eaca5e66812223f00dc33185dd9ed';

  const repoName = 'fullstack-interview-test';
  const [selectedCommit, setSelectedCommit] = React.useState('');

  //we call the axios request to get the commit
  React.useEffect(() => {
    getCommitDetails(repoName, commit).then((data) => setSelectedCommit(data));
  }, []);

  //
  var commitDataDetail = selectedCommit.data;

  console.log(selectedCommit);

  return (
    <div className="container__commitDetail">
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

          <div className="commitDetailForm">
            <div className="commitDetailForm__title">
              <h3>Detalle de commit</h3>
            </div>

            <div className="commit__DetailContainer">
              <p>
                <span>Identificador del Commit: </span>
                {commitDataDetail ? commitDataDetail.sha : 'N/A'}
              </p>
              <p>
                <span>SHA del Commit: </span>
                {commitDataDetail ? commitDataDetail.shaIndex : 'N/A'}
              </p>
              <p>
                <span>Mensaje del Commit: </span>
                {commitDataDetail ? commitDataDetail.message : 'N/A'}
              </p>
              <p>
                <span>Fecha del Commit: </span>
                {commitDataDetail ? commitDataDetail.date : 'N/A'}
              </p>
              <p>
                <span>Autor del Commit: </span>
                {commitDataDetail ? commitDataDetail.author : 'N/A'}
              </p>
              <p>
                <span>Email del autor del Commit: </span>
                {commitDataDetail ? commitDataDetail.authorEmail : 'N/A'}
              </p>

              <button onClick={(e) => router.push(`/`)}>
                <Image
                  src={`/flecha-hacia-atras.png`}
                  alt="Flat Repo Explorer"
                  width={25}
                  height={25}
                />
              </button>
            </div>

            {/* <div className="commitDetailForm__back">
              <button>
                <Image
                  src={`/flecha-hacia-atras.png`}
                  alt="Flat Repo Explorer"
                  width={25}
                  height={25}
                />
              </button>
            </div> */}
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
};

export default commit;
