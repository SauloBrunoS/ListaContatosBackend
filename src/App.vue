<template>
  <div>
    <ContatoList :contatos="contatos" @excluir="excluirContato" @alterar = "alterarContato"></ContatoList>
    <NovoContato :contatoParaEditar = "contatoParaEditar" @adicionar="adicionarContato"></NovoContato>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ContatoList from './components/ListarContatos.vue';
import NovoContato from './components/AdicionarContato.vue';
import apiClient from '@/api';
import {Contact, ContatoParaEditar} from '@/types'

const contatos = ref<Contact[]>([]);
const contatoParaEditar = ref<ContatoParaEditar>({
  nomeContato: '',
  telefone: '',
  endereco: '',
  status: '',
});

const carregarContatos = async () => {
  try {
    const response = await apiClient.get('/contatos');
    contatos.value = response.data._embedded.contatos  } catch (error) {
    console.error('Erro ao carregar contatos:', error);
    }
};

const adicionarContato = (novoContato : Contact) => {
  contatos.value.push(novoContato);
};

const alterarContato = (dados:Contact) => {
  contatoParaEditar.value.nomeContato = dados.nomeContato;
  contatoParaEditar.value.telefone = dados.telefone;
  contatoParaEditar.value.endereco = dados.endereco;
  contatoParaEditar.value.nomeContato = dados.nomeContato;

};

const excluirContato = (id: string) => {
  contatos.value = contatos.value.filter((contato) => contato.idContato !== id);
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