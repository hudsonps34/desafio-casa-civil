import React, { useState, useEffect } from "react"; 
import { TextField, Button, MenuItem } from "@mui/material";
import api from "../services/api";

const estados = ["RECEBIDO", "CONFIRMADO", "ATENDIDO", "CANCELADO"];

const AgendaForm = ({ agenda, onSave }) => {
  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    dataInicio: "",
    dataFim: "",
    local: "",
    estadoAtualAgenda: "",
    tabela: "agenda", // 🔹 Garantindo que tabela esteja sempre presente
  });

  const [loading, setLoading] = useState(false); // Estado de carregamento

  // Atualiza o estado quando a agenda for carregada
  useEffect(() => {
    if (agenda) {
      setFormData({ ...agenda, tabela: "agenda" }); // 🔹 Garante que tabela seja sempre "agenda"
    }
  }, [agenda]);

  // Função para limpar o formulário
  const handleClear = () => {
    setFormData({
      titulo: "",
      descricao: "",
      dataInicio: "",
      dataFim: "",
      local: "",
      estadoAtualAgenda: "",
      tabela: "agenda"
    });
  };

  // Manipula mudanças nos inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value || "",
    });
  };

  // Manipula o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dadosParaEnvio = { ...formData, tabela: "agenda" }; // 🔹 Adicionando tabela antes do envio

    console.log("Dados enviados para API:", JSON.stringify(dadosParaEnvio, null, 2));
    alert(`Enviando ${formData.id ? "atualização" : "criação"} da agenda...`);

    try {
      if (formData.id) {
        await api.editarAgenda(formData.id, "agenda", dadosParaEnvio);
      } else {
        await api.criarAgenda(dadosParaEnvio);
      }

      alert("Operação concluída com sucesso!");
      
      // 🔹 Garante que a lista será atualizada
      if (onSave) {
        console.log("✅ onSave foi chamado após salvar a agenda!"); // ✅ Debug
        onSave();
      }

      // 🔹 Após salvar, limpa os campos do formulário
      handleClear();

    } catch (error) {
      console.error("Erro ao salvar agenda:", error);
      alert("Erro ao salvar agenda. Verifique os dados e tente novamente.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="titulo">Título</label>
      <TextField
        id="titulo"
        label="Título"
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <label htmlFor="descricao">Descrição</label>
      <TextField
        id="descricao"
        label="Descrição"
        name="descricao"
        value={formData.descricao}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <label htmlFor="dataInicio">Data de Início</label>
      <TextField
        id="dataInicio"
        type="datetime-local"
        name="dataInicio"
        value={formData.dataInicio}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <label htmlFor="dataFim">Data de Fim</label>
      <TextField
        id="dataFim"
        type="datetime-local"
        name="dataFim"
        value={formData.dataFim}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <label htmlFor="local">Local</label>
      <TextField
        id="local"
        label="Local"
        name="local"
        value={formData.local}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <label htmlFor="estadoAtualAgenda">Status</label>
      <TextField
        id="estadoAtualAgenda"
        select
        label="Status"
        name="estadoAtualAgenda"
        value={formData.estadoAtualAgenda}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      >
        {estados.map((estado) => (
          <MenuItem key={estado} value={estado}>
            {estado}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? "Atualizando..." : formData.id ? "Atualizar" : "Salvar"}
      </Button>

      {/* 🔹 Botão para limpar o formulário manualmente */}
      <Button onClick={handleClear} variant="contained" color="secondary" style={{ marginLeft: "10px" }}>
        Limpar
      </Button>
    </form>
  );
};

export default AgendaForm;
