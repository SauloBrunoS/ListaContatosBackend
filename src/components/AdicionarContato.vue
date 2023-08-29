<template>
  <div>
    <h2>Novo Contato</h2>
    <form @submit.prevent="adicionarContato">
      <label for="nome">Nome:</label>
      <input v-model="novoContato.nome" required />
      <label for="telefone">Telefone:</label>
      <input v-model="novoContato.telefone" required />
      <label for="endereco">Endereço:</label>
      <input v-model="novoContato.endereco" />
      <label for="status">Status:</label>
      <select v-model="novoContato.status" required>
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>
      <button type="submit">Adicionar Contato</button>
    </form>
  </div>
</template>

<script setup lang = "ts">
import { ref, defineEmits } from 'vue';
import apiClient from '@/api';

const novoContato = ref({
  nome: '',
  telefone: '',
  endereco: '',
  status: 'ativo',
});

const emit = defineEmits<{
  (e: 'adicionar', data:any): void
}>()

const adicionarContato = async () => {
  try {
    const response = await apiClient.post('/contatos', novoContato.value);
    emit('adicionar', response.data);
    novoContato.value = {
      nome: '',
      telefone: '',
      endereco: '',
      status: 'ativo',
    };
    console.log('Contato adicionado com sucesso');

  } catch (error) {
    console.error('Erro ao adicionar contato:', error);
  }
};

</script>

<style scoped>
form {
  background-color: #fff;
  border-radius: 5px;
  padding: 30px; 
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  width: 400px; 
  max-width: 100%; 
  margin: 20px auto; 
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
