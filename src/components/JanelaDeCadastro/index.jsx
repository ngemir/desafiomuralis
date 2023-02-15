import React, {useState} from 'react';
import './index.css';



//Renderização
export default function JanelaDeCadastro() {
  
  // Criação de Estados
  const [ingressante, setIngressante] = useState({
    nome: "",
    curso: "",
    estado: "",
    cidade: ""
  });
  
  const [estadoNaoSelecionado, setEstadoNaoSelecionado] = useState(true);
  
  //ação do botão Voltar
  function limparCampos(){
    setIngressante({
      nome: "",
      curso: "",
      estado: "",
      cidade: ""
    })
    setEstadoNaoSelecionado(true);
  }

  //Funções lidar
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

  // fim das funções lidar

  //Função Listar
  function listaCidadePadrao(){
    return (
      <div className='seta'>
        <select name="inputCidade" id="cidade" disabled={estadoNaoSelecionado}>
          <option value="">Selecione antes o Estado</option>
        </select>
      </div>
    )
  }

  function listarCidade(estado){
    switch (estado){
      case "SP":
        return (
          <div className="seta">
            <select name="inputCidade" id="cidade" disabled={estadoNaoSelecionado} onChange={(cidadeEscolhido) => lidarInputCidade(cidadeEscolhido)}>
              <option value='MogiDasCruzes'>Mogi das Cruzes</option>
              <option value='Suzano'>Suzano</option>
              <option value='Poa'>Poá</option>
              <option value='Guararema'>Guararema</option>
            </select>
          </div>
        );
      case "RJ":
        return (
          <div className="seta">
            <select name="inputCidade" id="cidade" disabled={estadoNaoSelecionado} onChange={(cidadeEscolhido) => lidarInputCidade(cidadeEscolhido)}>
              <option value="AngraDosReis">Angra dos Reis</option>
              <option value="Niteroi">Niterói</option>
              <option value="Itaborai">Itaboraí</option>
            </select>
          </div>
        );
      case "MG":
        return (
          <div className="seta">
            <select name="inputCidade" id="cidade" disabled={estadoNaoSelecionado} onChange={(cidadeEscolhido) => lidarInputCidade(cidadeEscolhido)}>
              <option value="BeloHorizonte">Belo Horizonte</option>
              <option value="MonteAzul">Monte Azul</option>
              <option value="Muzambinho">Muzambinho</option>
            </select>
          </div>
        );
      default:
        return (
          <div className="seta">
            <select name="inputCidade" id="cidade" disabled={estadoNaoSelecionado} onChange={(cidadeEscolhido) => lidarInputCidade(cidadeEscolhido)}>
              <option value="">Selecione a cidade</option>
            </select>
          </div>
        );
    }
  }
  
  //Fim da função Listar

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
          <div className="seta">
            <select name="inputCurso" id="curso" onChange={(cursoEscolhido) => lidarInputCurso(cursoEscolhido)}>
              <option value="" defaultChecked>Escolha seu Curso</option>
              
              <option value="Matematica">Matemática</option>
              <option value="Letras">Letras</option>
              <option value="Geografia">Geografia</option>
            </select>
          </div>
        </div>
        <div className='campoDePreenchimento'>
          <label htmlFor="estado">Estado</label>
          <div className="seta">  
            <select name="inputEstado" id="estado" onChange={(estadoEscolhido) => lidarInputEstado(estadoEscolhido)}>
              <option value="" defaultChecked>Escolha seu Estado</option>
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">MinasGerais</option>
            </select>
          </div>
        </div>
        <div className='campoDePreenchimento'>
          <label htmlFor="cidade">Cidades</label>
          {estadoNaoSelecionado ? listaCidadePadrao() : listarCidade(ingressante.estado)}
        </div>
        <div className='campoDosBotoes'>
          <button type="button" className='botaoVoltar' onClick={limparCampos}>Voltar</button>
          <button type="submit" className='botaoGravar'>Gravar</button>
        </div>
      </form>
      <pre>
        {JSON.stringify(ingressante,null,2)}
      </pre>
    </div>
  )
}
