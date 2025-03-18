import axios from "axios";

const API_URL = "http://localhost:5000"; // Endereço do backend

const api = {
  //  Buscar todas as agendas
  listarAgendas: async () => {
    try {
      const response = await axios.get(`${API_URL}/dados/agenda`);

      // Se a resposta estiver vazia ou com erro, retorna uma lista vazia
      if (!response.data || response.data.length === 0) {
        console.warn("Nenhuma agenda encontrada.");
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar as agendas:", error.response?.data || error);
      return [];
    }
  },

 // Criar uma nova agenda
 criarAgenda: async (dadosParaEnvio) => { 
  try {
      console.log(" Dados enviados para API:", JSON.stringify(dadosParaEnvio, null, 2));

      // 🔹 Criando um FormData
      const formData = new FormData();
      
      // 🔹 Convertendo JSON para um Blob (mantendo 'tabela' no JSON)
      const jsonBlob = new Blob([JSON.stringify([dadosParaEnvio])], { type: "application/json" });

      // 🔹 Adicionando o arquivo ao FormData com nome "arquivo"
      formData.append("arquivo", jsonBlob, "agenda.json");

      // 🔹 Fazendo a requisição POST corretamente (sem tabela na URL)
      const response = await axios.post(`${API_URL}/upload-arquivo/`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
      });

      
      console.log("Agenda criada com sucesso:", response.data);
       
      return response.data;
  } catch (error) {
      console.error("Erro ao criar agenda:", error.response ? error.response.data : error);
      return { erro: "Falha ao criar agenda" };
  }
},



  
  
  // Editar uma agenda existente
  editarAgenda: async (id, tabela, dadosAtualizados) => {
    try {
      if (!id || !tabela || !dadosAtualizados) {
        throw new Error(" Parâmetros inválidos para edição da agenda.");
      }

      console.log(` Editando a agenda ID: ${id}...`);
      console.log(" JSON enviado:", JSON.stringify(dadosAtualizados, null, 2));

      const response = await axios.put(
        `${API_URL}/dados/${tabela}/${id}`,
        dadosAtualizados,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(" Resposta da API:", response.data);
      return response.data;
    } catch (error) {
      console.error(" Erro ao editar agenda:", error.response?.data || error);
      return { erro: "Falha ao editar agenda" };
    }
  },

  // ✅ Excluir uma agenda
  excluirAgenda: async (id) => {
    try {
      if (!id) {
        throw new Error("ID inválido para exclusão.");
      }

      await axios.delete(`${API_URL}/dados/agenda/${id}`);
      console.log("Agenda excluída com sucesso.");
      return { mensagem: "Agenda excluída com sucesso" };
    } catch (error) {
      console.error("Erro ao excluir agenda:", error.response?.data || error);
      return { erro: "Falha ao excluir agenda" };
    }
  },
};

export default api; // Exportando para ser usado nos componentes
