import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { getBrancDetails, getCommits } from '../../utilities/axiosRequests';
import { useRouter } from 'next/router';

const Branch = () => {
  const router = useRouter();

  //added efect to validate if router.query.branch exist
  React.useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  let branch = router.query.branch || 'master';

  const [commits, setCommits] = React.useState('');
  const [branchData, setBranchData] = React.useState('');
  const repoName = 'fullstack-interview-test';

  //get the commits of the branch and the details of the branch
  React.useEffect(() => {
    getCommits(repoName, branch).then((data) => setCommits(data));
  }, []);

  React.useEffect(() => {
    getBrancDetails(repoName, branch).then((data) => setBranchData(data.data));
  }, []);
  //Log

  //console.log(branchData);

  // const commitDetails = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   // router.push(`/commit/${commit.shaId}`);
  // };

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
            <h3>Vista General de la rama</h3>

            <div className="branchContainer">
              <div className="branchContainer__details">
                <p>
                  <span>Nombre de la Rama: </span>
                  {branchData.name}
                </p>
                <p>
                  <span>Autor: </span>
                  {branchData ? branchData.author : 'N/A'}
                </p>
                <p>
                  <span>Fecha de Creacion: </span>
                  {branchData
                    ? branchData.commit.author.date.substring(0, 10)
                    : 'N/A'}
                </p>
                <p>
                  <span>Email del autor: </span>
                  {branchData ? branchData.commit.author.email : 'N/A'}
                </p>
              </div>
            </div>

            <div className="commitContainer">
              <table>
                <tr>
                  <th>Commit Id</th>
                  <th>Autor</th>
                  <th>Mensaje</th>
                  <th>Fecha</th>
                  <th>Detalles</th>
                </tr>
                {commits
                  ? commits.data.map((commit) => (
                      <tr>
                        <td className="sha" value={commit.shaId}>
                          {commit.shaId}
                        </td>
                        <td className="author">{commit.author}</td>
                        <td className="message">{commit.message}</td>
                        <td className="date">{commit.date.substring(0, 10)}</td>
                        <td className="commitDetailButton">
                          <button
                            onClick={(e) =>
                              router.push(`/commit/${commit.shaId}`)
                            }
                          >
                            <Image
                              src={`/boton-mas.png`}
                              alt="details"
                              width={25}
                              height={25}
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  : 'No commits found'}
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p className="text-center">
          Developed by: Rodolfo Murguia Copyright &copy; flat.mx{' '}
        </p>
      </footer>
    </div>
  );
};

export default Branch;
