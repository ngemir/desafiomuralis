const [cursosState, setCursos] = useState();

  //Requisição de dados
  const getCursos = () => {
    fetch(
      './data/cursos.json'
    )
    .then((response) => {
      return response.json()
    })
    .then((cursosJson) => {
      const listaDeCursos = cursosJson.Curso;
      console.log(listaDeCursos);
      listaDeCursos.forEach(curso => {
        console.log(curso);
        setCursos(...cursosState, curso);
      });
      console.log(cursosState);
    });
  }

  useEffect(() => {
    getCursos();
  }, []);