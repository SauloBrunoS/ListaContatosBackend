<template>
  <div>
    <h2>Lista de Contatos</h2>
    <ul>
      <li v-for="contato in contatos" :key="contato.id">
        {{ formatoContato(contato) }}
        <button @click="alterarContato(contato)">Alterar</button>
        <button @click="excluirContato(contato.id)">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang = "ts">
import { defineProps, defineEmits } from 'vue';
import apiClient from '@/api';
import {Contact} from '../types'

const props = defineProps<{
  contatos: Contact[];
}>();

const emit = defineEmits(['excluir']);

const excluirContato = async (id: number) => {
  try {
    await apiClient.delete(`/contatos/${id}`);
    emit('excluir', id);
    console.log(`Contato com o ID ${id} excluído`);
  } catch (error) {
    console.error('Erro ao excluir contato:', error);
  }
};

const alterarContato = async (id: number, novosDados: Contact) => {
  try {
    await apiClient.put(`/contatos/${id}`, novosDados);
    emit('alterar', id);
    console.log(`Contato com o ID ${id} alterado`);
  } catch (error) {
    console.error('Erro ao alterar contato:', error);
  }
};

const formatoContato = (contato: Contact) => {
  return `${contato.nome} - Telefone: ${contato.telefone} - Endereço: ${contato.endereco} - Status: ${contato.status ? 'Ativo' : 'Inativo'}`;
};
</script>


<style>
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

button {
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>