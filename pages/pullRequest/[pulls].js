import React from "react";
import Head from "next/head";
import Image from "next/image";
import {
  getBrancDetails,
  getCommits,
  getPullRequests,
} from "../../utilities/axiosRequests";
import { Router, useRouter } from "next/router";

const branch = () => {
  const router = useRouter();

  //added efect to validate if router.query.branch exist
  React.useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  let branch = router.query.branch || "master";

  const [pullRequest, setPullRequest] = React.useState("");
  const [branchData, setBranchData] = React.useState("");
  const repoName = "fullstack-interview-test";

  //get the commits of the branch and the details of the branch
  React.useEffect(() => {
    getPullRequests(repoName).then((data) => setPullRequest(data));
  }, []);

  React.useEffect(() => {
    getBrancDetails(repoName, branch).then((data) => setBranchData(data.data));
  }, []);
  //Log

  console.log(pullRequest);

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
            <h3>Pull Requests</h3>

            <div className="branchContainer">
              <div className="branchContainer__details">
                <p>
                  <span>Nombre de la Rama: </span>
                  {branchData.name}
                </p>
                <p>
                  <span>Autor: </span>
                  {branchData ? branchData.author : "N/A"}
                </p>
                <p>
                  <span>Fecha de Creacion: </span>
                  {branchData
                    ? branchData.commit.author.date.substring(0, 10)
                    : "N/A"}
                </p>
                <p>
                  <span>Email del autor: </span>
                  {branchData ? branchData.commit.author.email : "N/A"}
                </p>
              </div>
            </div>

            <div className="prContainer">
              <table>
                <tr>
                  <th>Pr Id</th>
                  <th># PR</th>
                  <th>Estado</th>
                  <th>Titulo</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                  <th>Head</th>
                  <th>Base</th>
                </tr>
                {pullRequest
                  ? pullRequest.data.map((pullRequest) => (
                      <tr>
                        <td className="tableCol">{pullRequest.id}</td>
                        <td className="tableCol_2">{pullRequest.number}</td>
                        <td className="tableCol">{pullRequest.state}</td>
                        <td className="tableCol">{pullRequest.title}</td>
                        <td className="tableCol">{pullRequest.user.login}</td>
                        <td className="tableCol">
                          {pullRequest.created_at.substring(0, 10)}
                        </td>
                        <td className="tableCol">{pullRequest.head.label}</td>
                        <td className="tableCol">{pullRequest.base.label}</td>
                      </tr>
                    ))
                  : "No commits found"}
              </table>
            </div>

            <div className="buttonContainer">
              <button className="button" onClick={() => Router.push("/")}>
                <Image
                  src={`/flecha-hacia-atras.png`}
                  alt="Flat Repo Explorer"
                  width={25}
                  height={25}
                />
              </button>

              <button
                className="button"
                onClick={() => Router.push("/pullRequest")}
              >
                Create Pull Requests
              </button>
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
