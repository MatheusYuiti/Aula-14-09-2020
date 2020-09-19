var ID_CURSO_INC = 4

var cursos = [
    {_id: 1, nome: 'Engenharia de Produção', email: 'fernando.mendonca@ifsp.edu.br'},
    {_id: 2, nome: 'Tecnologia em Análise e Desenvolvimento de Sistemas', email: 'thiago.homem@ifsp.edu.br'},
    {_id: 3, nome: 'Licenciatura em Letras Português/Inglês', email: 'vanessa.regina@ifsp.edu.brr'},
    {_id: 4, nome: 'Tecnologia em Gestão Pública', email: 'igor.munhoz@ifsp.edu.br'}
]

module.exports = function() {
    var controller = {};
    controller.listaCursos = function(req, res) {
        res.json(cursos);
    };
    controller.obtemCurso = function(req, res) {
        console.log('Selecionou o curso: ' + req.params.id);
        var idCurso = req.params.id;
        var curso = cursos.filter(function(curso) {
            return curso._id == idCurso;
        })[0];
        curso ? res.json(curso) : res.status(404).send('Curso não encontrado!');
    };
    controller.removeCurso = function(req, res) {
        var idCurso = req.params.id;
        cursos = cursos.filter(function(curso) {
            return curso._id != idCurso;
        });
        res.send(204).end();
    };

    controller.salvaCurso = function(req, res) {
        var curso = req.body;
        curso = curso._id ? atualiza(curso) : adiciona(curso);
        res.json(curso);
    };

    function adiciona(cursoNovo) {
        cursoNovo._id = ++ID_CURSO_INC;;
        cursos.push(cursoNovo);
        return cursoNovo;
    }

    function atualiza(cursoAlterar) {
        cursos = cursos.map(function(curso) {
        if(curso._id == cursoAlterar._id) {
            curso = cursoAlterar;
        }
        return curso;
    });

    return cursoAlterar;
  }

    return controller;
};