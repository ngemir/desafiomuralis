import React, {useState, useEffect} from 'react';
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

  //Funções para lidar com os dados dos setStates do dado de Registro
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

  //Setor de listagem ↓

  //Tratamento dos Cursos existente no JSON
  const [cursos, setCursos] = useState([]);

  const listarCursos=()=>{
    fetch('./data/cursos.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(dados) {
        setCursos(dados.Cursos);
      });
  }
  useEffect(()=>{
    listarCursos()
  },[])
  

  //Fim do tratamento da lista Curso

  //Tratamento da Lista de Estado
  const [estadoNaoSelecionado, setEstadoNaoSelecionado] = useState(true);
  const [estados, setEstados] = useState([]);

  const listarEstados=()=>{
    fetch('./data/estadoecidade.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(dados) {
        let es = Object.keys(dados.Estados)
        setEstados(es);
      });
  }
  useEffect(()=>{
    listarEstados()
  },[])
  

  //Tratamento da lista de cidades de acordo com o Estado selecionado
  const [cidades, setCidades] = useState([]);
  
  const listarCidades=()=>{
    fetch('./data/estadoecidade.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(dados) {
        const estadoSelecionado = ingressante.estado
        const ci = dados.Estados[estadoSelecionado]
        setCidades(ci.cidades);
      });
  }
  useEffect(()=>{
    listarCidades()
  },[ingressante])

  // Fim do tratamento da Lista de Estado
  
  //Fim da listagem ↑ 

  //Enviar Registro para alert
  function enviar(event){
    event.preventDefault();
    let nomeInserido = event.target[0].value;
    let cursoSelecionado = event.target[1].value;
    let estadoSelecionado = event.target[2].value;
    let cidadeSelecionado = event.target[3].value;
    
    let dadoEnviado = {
      nome: nomeInserido,
      curso: cursoSelecionado,
      estado: estadoSelecionado,
      cidade: cidadeSelecionado
    }

    alert(JSON.stringify(dadoEnviado));
  }

  //Interface
  return (
    <div className='janelaDeCadastro'>
      <div className='titulo'>
        <h1>Cadastro de Ingressantes</h1>
      </div>
      <form className='formulario' onSubmit={enviar}>
        <div className='campoDePreenchimento'>
          <label htmlFor="nome">Nome</label>
          <input type="text" value={ingressante.nome} name="inputNome" id="nome" onChange={(nomeInserido) => lidarInputNome(nomeInserido)}/>
        </div>
        <div className='campoDePreenchimento'>
          <label htmlFor="curso">Curso</label>
          <div className="seta">
            <select name="inputCurso" value={ingressante.curso} id="curso" onChange={(cursoEscolhido) => lidarInputCurso(cursoEscolhido)}>
              <option value="" defaultChecked>Escolha seu Curso</option>
              {cursos.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
        <div className='campoDePreenchimento'>
          <label htmlFor="estado">Estado</label>
          <div className="seta">  
            <select name="inputEstado" value={ingressante.estado} id="estado" onChange={(estadoEscolhido) => lidarInputEstado(estadoEscolhido)}>
              <option value="" defaultChecked>Escolha seu Estado</option>
              {estados.map(estado => <option key={estado} value={estado}>{estado}</option> )}
            </select>
          </div>
        </div>
        <div className='campoDePreenchimento'>
          <label htmlFor="cidade">Cidades</label>
          <div className="seta">
            <select name="inputCidade" value={ingressante.cidade} id="cidade" disabled={estadoNaoSelecionado} onChange={(cidadeEscolhido) => lidarInputCidade(cidadeEscolhido)}>
              <option value="" defaultChecked>Escolha sua Cidade</option>
              {cidades.map(cidade => <option key={cidade} value={cidade}>{cidade}</option>)}
            </select>
          </div>
        </div>
        <div className='campoDosBotoes'>
          <button type="button" className='botaoVoltar' onClick={limparCampos}>Voltar</button>
          <button type="submit" className='botaoGravar'>Gravar</button>
        </div>
      </form>
    </div>
  )
}
