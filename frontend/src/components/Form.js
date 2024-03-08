import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Label = styled.label``;

const Form = ({ onEdit, setOnEdit, getLugares }) => {
  const ref = useRef();
  
  useEffect(() => {
    if (onEdit) {
      const lugar = ref.current;

      lugar.nome.value = onEdit.nome;
      lugar.descricao.value = onEdit.descricao;
      lugar.cidade.value = onEdit.cidade;
      lugar.estado.value = onEdit.estado;
    }
  }, [onEdit]);
    



  const handleSubmit = async (e) => {
    e.preventDefault();

    const lugar = ref.current;

    if (
      !lugar.nome.value ||
      !lugar.descricao.value ||
      !lugar.cidade.value ||
      !lugar.estado.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: lugar.nome.value,
          descricao: lugar.descricao.value,
          cidade: lugar.cidade.value,
          estado: lugar.estado.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: lugar.nome.value,
          descricao: lugar.descricao.value,
          cidade: lugar.cidade.value,
          estado: lugar.estado.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    lugar.nome.value = "";
    lugar.descricao.value = "";
    lugar.cidade.value = "";
    lugar.estado.value = "";

    setOnEdit(null);
    getLugares();
  };


    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
          <InputArea>
            <Label>Nome</Label>
            <Input name="nome" />
          </InputArea>
          <InputArea>
            <Label>Descrição</Label>
            <Input name="descricao" />
          </InputArea>
          <InputArea>
            <Label>Cidade</Label>
            <Input name="cidade" />
          </InputArea>
          <InputArea>
            <Label>Estado(Sigla)</Label>
            <Input name="estado" />
          </InputArea>

          <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;