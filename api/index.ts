import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria uma instância do Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Habilita o CORS
app.use(express.json()); // Permite o uso de JSON no corpo das requisições

// Verifica se as variáveis de ambiente necessárias estão definidas
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL e SUPABASE_KEY devem ser definidos no ambiente.');
}

// Cria o cliente do Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Rota de teste para consultar a tabela 'distritos'
app.get('/api/test', async (req: any, res: any) => {
  try {
    // Consulta todos os dados da tabela 'distritos'
    const { data, error } = await supabase.from('distritos').select('*');

    // Se houver um erro, retorna um status 500 com a mensagem de erro
    if (error) {
      return res.status(500).json({ error });
    }

    // Retorna os dados da consulta
    res.json(data);
  } catch (err) {
    // Captura erros inesperados e retorna um status 500
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});