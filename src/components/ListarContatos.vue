<template>
  <div>
    <h2 class="centered-title">Lista de Contatos</h2>
    <ul>
      <li v-for="(contato, id) in contatos" :key="id">
        <pre>{{ formatoContato(contato) }}</pre>
        <button @click="alterarContatoFormulario(contato)" class="alterar-button">Alterar</button>
       <button @click="excluirContato(contato.idContato)">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang = "ts">
import { defineProps, defineEmits } from 'vue';
import apiClient from '@/api';
import {Contact} from '../types'

const props = defineProps({
  contatos: Array as () => Contact[],
});

const emit = defineEmits(['excluir', 'alterar']);

const excluirContato = async (id: string) => {
  try {
    await apiClient.delete(`/contatos/${id}`);
    emit('excluir', id);
    console.log(`Contato com o ID ${id} excluído`);
  } catch (error) {
    console.error('Erro ao excluir contato:', error);
  }
};

/* const alterarContato = async (id: string, novosDados: Contact) => {
  try {
    await apiClient.put(`/contatos/${id}`, novosDados);
    emit('alterar', id);
    console.log(`Contato com o ID ${id} alterado`);
  } catch (error) {
    console.error('Erro ao alterar contato:', error);
  }
};  */

const alterarContatoFormulario = (dados: Contact) => {
  emit('alterar', dados);  
}; 

const formatoContato = (contato: Contact) => {
  return `Nome: ${contato.nomeContato}\nTelefone: ${contato.telefone}\nEndereço: ${contato.endereco}\nStatus: ${
    contato.status}`;
};
</script>

<style>

.centered-title {
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #fff;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

pre {
  white-space: pre-wrap;
}

.alterar-button {
  background-color: #4caf50; 
}

button {
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>