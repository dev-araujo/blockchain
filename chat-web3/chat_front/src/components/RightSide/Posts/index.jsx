const Posts = ({ data }) => {
  return (
    <section>
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
    </section>
  );
};

export default Posts;
