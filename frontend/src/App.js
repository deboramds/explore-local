import GlobalStyle from "./styles/global.js";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js"
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
// import Form from "./components/Form.js";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [lugares, setLugares] = useState([]);
  const [onEdit, setOnEdit] = useState(null);


  const getLugares = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setLugares(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getLugares();
  }, [setLugares]);

  return (
    <>
      <Container>
        <Title>LUGARES</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getLugares={getLugares} />
        <Grid lugares={lugares} setLugares={setLugares} setOnEdit={setOnEdit}/>
      </Container>
      <GlobalStyle />
    </>
  );
}

export default App;