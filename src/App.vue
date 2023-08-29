<template>
  <div>
    <ContatoList :contatos="contatos" @excluir="excluirContato"></ContatoList>
    <NovoContato @adicionar="adicionarContato"></NovoContato>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ContatoList from './components/ListarContatos.vue';
import NovoContato from './components/AdicionarContato.vue';
import apiClient from '@/api';

const contatos = ref([]);

const carregarContatos = async () => {
  try {
    const response = await apiClient.get('/contatos');
    contatos.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar contatos:', error);
  }
};

const adicionarContato = (novoContato) => {
  contatos.value.push(novoContato);
};

const excluirContato = (id) => {
  contatos.value = contatos.value.filter((contato) => contato.id !== id);
};

onMounted(carregarContatos);
</script>

<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f8f8;
}
</style>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f8f8;
}
</style>