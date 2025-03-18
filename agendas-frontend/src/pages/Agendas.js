import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import AgendaForm from "../components/AgendaForm";
import AgendaList from "../components/AgendaList";
import api from "../services/api";

const Agendas = () => {
  const [agendas, setAgendas] = useState([]);
  const [selectedAgenda, setSelectedAgenda] = useState(null);

  useEffect(() => {
    carregarAgendas();
  }, []);

  const carregarAgendas = async () => {
    console.log(" Buscando novas agendas...");
    try {
      const dados = await api.listarAgendas();
      console.log(" Novas agendas retornadas:", dados);
      setAgendas([...dados]); //  Garante que React detecte a atualização
    } catch (error) {
      console.error(" Erro ao carregar agendas:", error);
    }
  };

  const handleSave = async () => {
    console.log(" handleSave foi chamado! Atualizando lista...");
    await carregarAgendas(); //  Atualiza a lista automaticamente
    setSelectedAgenda(null);
  };

  const handleDelete = async (id) => {
    await api.excluirAgenda(id);
    await carregarAgendas(); //  Atualiza a lista após excluir
  };

  return (
    <Container>
      <Typography variant="h4">Gerenciar Agendas</Typography>
      <AgendaForm agenda={selectedAgenda} onSave={handleSave} />
      <AgendaList agendas={agendas} onEdit={setSelectedAgenda} onDelete={handleDelete} />

      <Button variant="contained" color="primary" onClick={carregarAgendas}>
        Atualizar Listagem
      </Button>
    </Container>
  );
};

export default Agendas;
