import { db } from "../db.js";

export const getLugar = (_, res) => {
  const q = "SELECT * FROM lugares";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addLugar = (req, res) => {
  const q =
    "INSERT INTO lugares(`nome`, `descricao`, `cidade`, `estado`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.cidade,
    req.body.estado,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cadastro realizado com sucesso.");
  });
};


export const updateLugar = (req, res) => {
  const q =
    "UPDATE lugares SET `nome` = ?, `descricao` = ?, `cidade` = ?, `estado` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.cidade,
    req.body.estado,
  ];


  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Ponto Turístico atualizado com sucesso.");
  });
};


export const deleteLugar = (req, res) => {
  const q = "DELETE FROM lugares WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json(" Ponto Turístico deletado com sucesso.");
  });
};