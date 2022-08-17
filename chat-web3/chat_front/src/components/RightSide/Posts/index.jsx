const Posts = ({ data }) => {
  return (
    <section>
      {data.length > 0 ? (
        <div>
          {data.map((wave, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "rgba(173, 213, 173, 0.712)",
                  marginTop: "16px",
                  padding: "8px",
                  width: "37rem",
                }}
              >
                <div>Mensagem: {wave.message}</div>
                <div>Endereço: {wave.address}</div>
                <div>Data/Horário: {wave.timestamp.toLocaleDateString()}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <p></p>
      )}
    </section>
  );
};

export default Posts;
