import React, {useState} from 'react';
import './index.css';

//Renderização
export default function JanelaDeCadastro() {
  
  // Manipulação de Dados
  const [ingressante, setIngressante] = useState({
    nome: "",
    curso: "",
    estado: "",
    cidade: ""
  });
  
  const [estadoNaoSelecionado, setEstadoNaoSelecionado] = useState(true);

  function lidarInputNome(nome){
    let valorNovo = {};
    valorNovo = {nome: nome.target.value};
    setIngressante(ingressante => ({
      ...ingressante,
      ...valorNovo
    }));
  }
  
  function lidarInputCurso(curso){
    setIngressante(ingressante => ({...ingressante, curso: curso.target.value}));
  }
  
  function lidarInputEstado(estado){
    setIngressante(ingressante => ({...ingressante, estado: estado.target.value}));
    
    //bloqueia o menu dropdows da cidade quando não tem Estado selecionado
    if(estado.target.value === ""){
      setEstadoNaoSelecionado(true);
      ingressante.cidade = ''
    }else{
      setEstadoNaoSelecionado(false);
    }
  }

  function lidarInputCidade(cidade){
    setIngressante(ingressante => ({...ingressante, cidade: cidade.target.value}));
  }

  //Listar Cidade
  function listaCidadePadrao(){
    return (
      <select name="inputCidade" id="cidade" disabled={estadoNaoSelecionado}>
        <option value="">Selecione antes o Estado</option>
      </select>
    )
  }

  function listarCidade(estado){
    switch (estado){
      case "SP":
        return (
          <select name="inputCidade" id="cidade" disabled={estadoNaoSelecionado} onChange={(cidadeEscolhido) => lidarInputCidade(cidadeEscolhido)}>
            <option value='MogiDasCruzes'>Mogi das Cruzes</option>
            <option value='Suzano'>Suzano</option>
            <option value='Poa'>Poá</option>
            <option value='Guararema'>Guararema</option>
          </select>
        );
      case "RJ":
        return (
          <select name="inputCidade" id="cidade" disabled={estadoNaoSelecionado} onChange={(cidadeEscolhido) => lidarInputCidade(cidadeEscolhido)}>
            <option value="AngraDosReis">Angra dos Reis</option>
            <option value="Niteroi">Niterói</option>
            <option value="Itaborai">Itaboraí</option>
          </select>
        );
      case "MG":
        return (
          <select name="inputCidade" id="cidade" disabled={estadoNaoSelecionado} onChange={(cidadeEscolhido) => lidarInputCidade(cidadeEscolhido)}>
            <option value="BeloHorizonte">Belo Horizonte</option>
            <option value="MonteAzul">Monte Azul</option>
            <option value="Muzambinho">Muzambinho</option>
          </select>
        );
      default:
        return (
          <select name="inputCidade" id="cidade" disabled={estadoNaoSelecionado} onChange={(cidadeEscolhido) => lidarInputCidade(cidadeEscolhido)}>
            <option value="">Selecione a cidade</option>
          </select>
        );
    }
  }
  
  //Interface
  return (
    <div className='janelaDeCadastro'>
      <div className='titulo'>
        <h1>Cadastro de Ingressantes</h1>
      </div>
      <form className='formulario'>
        <div className='campoDePreenchimento'>
          <label htmlFor="nome">Nome</label>
          <input type="text" name="inputNome" id="nome" onChange={(nomeInserido) => lidarInputNome(nomeInserido)}/>
        </div>
        <div className='campoDePreenchimento'>
          <label htmlFor="curso">Curso</label>
          <select name="inputCurso" id="curso" onChange={(cursoEscolhido) => lidarInputCurso(cursoEscolhido)}>
            <option value="" defaultChecked>Escolha seu Curso</option>
            <option value="Matematica">Matemática</option>
            <option value="Letras">Letras</option>
            <option value="Geografia">Geografia</option>
          </select>
        </div>
        <div className='campoDePreenchimento'>
          <label htmlFor="estado">Estado</label>
          <select name="inputEstado" id="estado" onChange={(estadoEscolhido) => lidarInputEstado(estadoEscolhido)}>
            <option value="" defaultChecked>Escolha seu Estado</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">MinasGerais</option>
          </select>
        </div>
        <div className='campoDePreenchimento'>
          <label htmlFor="cidade">Cidades</label>
          {estadoNaoSelecionado ? listaCidadePadrao() : listarCidade(ingressante.estado)}
        </div>
        <div className='campoDosBotões'>
          <button className='botaoVoltar'>Voltar</button>
          <input type="submit" value="Gravar" className='botaoGravar' />
        </div>
      </form>
      <pre>
        {JSON.stringify(ingressante,null,2)}
      </pre>
    </div>
  )
}
