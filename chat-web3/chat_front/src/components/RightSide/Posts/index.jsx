import "./styles.css";

const Posts = ({ data }) => {
  const capitalize = (str) => {
    if (typeof str !== "string") {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.substring(1);
  };

  return (
    <section className="rightside__post--unique">
      {data.length > 0 ? (
        <section>
          {data.map((wave, index) => {
            return (
              <section
                key={index}
                style={{
                  backgroundColor: "rgba(173, 213, 173, 0.712)",
                  marginTop: "16px",
                  padding: "8px",
                  width: "40rem",
                }}
              >
                <div className="post-card">
                  <span>Mensagem:</span>
                  <p className="post-card-message">
                    {capitalize(wave.message)}
                  </p>
                </div>
                <div className="post-card">
                  <span>Endereço: </span>
                  <p>{wave.address}</p>
                </div>
                <div className="post-card">
                  <span>Data/Horário:</span>{" "}
                  <p>{wave.timestamp.toLocaleDateString()}</p>
                </div>
              </section>
            );
          })}
        </section>
      ) : (
        <p></p>
      )}
    </section>
  );
};

export default Posts;
