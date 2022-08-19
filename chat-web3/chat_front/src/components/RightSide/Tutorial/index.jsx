import "./style.css";

const Tutorial = () => {
  return (
    <section className="rightside--noPosts">
      <h1>Como utilizar o chat web3</h1>
      <ol>
        <li>
          Conecte sua
          <a target="_blank" href="https://metamask.io/">
            metamask
          </a>{" "}
          na rede Rinkeby Testnet
        </li>
        <li>
          Tenha certeza de que você tem ETH na rede especificada acima(se não,
          dê uma olhada nessa faucet
          <a target="_blank" href="https://rinkebyfaucet.com/">
            aqui
          </a>
          )
        </li>
        <li>
          Clique no botão conectar carteira (esse verdinho ai do lado esquerdo)
        </li>
        <li>
          Pronto, depois de seguidos os passos acima você conseguirá utilizar
          nosso chat web3 🥳
        </li>
      </ol>
    </section>
  );
};

export default Tutorial;
