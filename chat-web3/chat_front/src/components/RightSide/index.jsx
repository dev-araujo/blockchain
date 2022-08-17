import Posts from "./Posts";
import "./styles.css";

const RightSide = ({ callFunction, initialValue, controlValue, data }) => {
  return (
    <main>
      {data.length !== 0 ? (
        <section className="rightside">
          <section className="rightside__posts">
            <Posts data={data} />
          </section>

          <footer className="rightside__sendPost">
            <textarea
              value={initialValue}
              onChange={controlValue}
              rows="4"
              cols="50"
              type="text"
            ></textarea>

            <div className="rightside__sendButton" onClick={callFunction}>
              <i className="bi bi-send"></i>
            </div>
          </footer>
        </section>
      ) : (
        <section className="rightside--noPosts">
          <h1>Como utilizar o chat web3</h1>
          <ol>
            <li>Conecte sua metamask na rede Rinkeby Testnet</li>
            <li>
              Tenha certeza de que você tem ETH na rede especificada acima(se
              não, dê uma olhada nessa faucet
              <a href="https://rinkebyfaucet.com/">aqui</a>)
            </li>
            <li>
              Clique no botão conectar carteira (esse verdinho ai do lado
              esquerdo)
            </li>
            <li>
              Pronto, depois de seguidos os passos acima você conseguirá
              utilizar nosso chat web3
            </li>
          </ol>
        </section>
      )}
    </main>
  );
};
export default RightSide;
