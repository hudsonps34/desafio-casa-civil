import React from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";

const AgendaList = ({ agendas, onEdit, onDelete }) => {
  return (
    <List>
      {agendas.length === 0 ? (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>Nenhuma agenda cadastrada.</p>
      ) : (
        agendas.map((agenda) => (
          <ListItem key={agenda.id} divider>
            <ListItemText
              primary={`📌 ${agenda.titulo}`}
              secondary={`📅 Início: ${new Date(agenda.dataInicio).toLocaleString()} | 
                          🏁 Fim: ${new Date(agenda.dataFim).toLocaleString()} | 
                          📍 Local: ${agenda.local} | 
                          🔹 Estado: ${agenda.estadoAtualAgenda}`}
            />

            <Button 
              onClick={() => onEdit(agenda)} 
              variant="contained" 
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Editar
            </Button>
            
            <Button 
              onClick={() => onDelete(agenda.id)} 
              variant="contained" 
              color="secondary"
            >
              Excluir
            </Button>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default AgendaList;
