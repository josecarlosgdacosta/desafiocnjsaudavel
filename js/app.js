var http = location.protocol;
var slashes = http.concat("//");
var host = slashes.concat(window.location.hostname);

var cnjsaudavel = angular.module("CnjSaudavel", ["highcharts-ng"]);

cnjsaudavel.service("AtletaService", ["$http", function ($http) {
    return {
        getAtletas: function () {
            return $http.get(host + "/desafiocnjsaudavel/js/atletas.json");
        }
    }
}]);

cnjsaudavel.controller("AtletaController", ["$scope", "$location", "$anchorScroll", "AtletaService", function ($scope, $location, $anchorScroll, AtletaService) {

    // Pesquisando todos os atletas.
    AtletaService.getAtletas().success(function (resposta) {
       $scope.atletas = resposta;
    });

    $scope.atletaSelecionado = null;

    $scope.selecionarAtleta = function (atleta) {
        atleta.selected = true;
        $scope.atletaSelecionado = atleta;
        $scope.updateGraficoPeso();
        $scope.updateGraficoIMC();
        $scope.updateGraficoRCQ();
        $scope.updateGraficoPercentualMassa();
        $scope.updateGraficoPercentualGordura();
        $scope.updateGraficoCintura();
        $scope.updateGraficoAbdomen();
        $scope.updateGraficoQuadril();
        $location.hash("graficos");
        $anchorScroll();
    };

    $scope.updateGraficoPeso = function () {

        var dscSerie = $scope.atletaSelecionado["nome"];
        var arrBateria = $scope.atletaSelecionado["bateria"];

        var categories = [];
        var arrPesos = [];
        for (var i = 0; i < arrBateria.length; i++) {
            categories.push(arrBateria[i].indice);
            arrPesos.push(arrBateria[i].peso);
        }
        $scope.chartPeso.xAxis[0].setCategories(categories);
        $scope.chartPeso.addSeries(
            {
                name: dscSerie,
                data: arrPesos,
                tooltip: {
                    pointFormat: "{series.name}: {point.y}",
                    valueSuffix: " Kg"
                }
            }
        );
    };

    $scope.updateGraficoIMC = function () {
        var dscSerie = $scope.atletaSelecionado["nome"];
        var arrBateria = $scope.atletaSelecionado["bateria"];
        var altura = $scope.atletaSelecionado["altura"];

        var categories = [];
        var arrIMC = [];
        for (var i = 0; i < arrBateria.length; i++) {
            categories.push(arrBateria[i].indice);

            var imc = arrBateria[i].peso / (altura * altura);
            imc = Number(imc.toPrecision(4));
            arrIMC.push(imc);
        }
        $scope.chartIMC.xAxis[0].setCategories(categories);
        $scope.chartIMC.addSeries(
            {
                name: dscSerie,
                data: arrIMC
            }
        );
    };

    $scope.updateGraficoRCQ = function () {
        var dscSerie = $scope.atletaSelecionado["nome"];
        var arrBateria = $scope.atletaSelecionado["bateria"];

        var categories = [];
        var arrRCQ = [];
        for (var i = 0; i < arrBateria.length; i++) {
            categories.push(arrBateria[i].indice);

            var rcq = arrBateria[i].cintura / arrBateria[i].quadril;

            if (isNaN(rcq)) {
                arrRCQ.push("");
            } else {
                rcq = Number(rcq.toPrecision(3));
                //console.log(rcq); return false;
                arrRCQ.push(rcq);
            }
        }

        $scope.chartRCQ.xAxis[0].setCategories(categories);
        $scope.chartRCQ.addSeries(
            {
                name: dscSerie,
                data: arrRCQ
            }
        );
    };

    $scope.updateGraficoPercentualMassa = function () {
        var dscSerie = $scope.atletaSelecionado["nome"];
        var arrBateria = $scope.atletaSelecionado["bateria"];

        var categories = [];
        var arrPercMassaMagra = [];
        for (var i = 0; i < arrBateria.length; i++) {
            categories.push(arrBateria[i].indice);

            var percMassaMagra = arrBateria[i].percMassaMagra;
            arrPercMassaMagra.push(percMassaMagra);
        }

        $scope.chartPercentualMassa.xAxis[0].setCategories(categories);
        $scope.chartPercentualMassa.addSeries(
            {
                name: dscSerie,
                data: arrPercMassaMagra
            }
        );
    };

    $scope.updateGraficoPercentualGordura = function () {
        var dscSerie = $scope.atletaSelecionado["nome"];
        var arrBateria = $scope.atletaSelecionado["bateria"];

        var categories = [];
        var arrPercGordura = [];
        for (var i = 0; i < arrBateria.length; i++) {
            categories.push(arrBateria[i].indice);

            var percMassaGordura = arrBateria[i].percGordura;
            arrPercGordura.push(percMassaGordura);
        }

        $scope.chartPercentualGordura.xAxis[0].setCategories(categories);
        $scope.chartPercentualGordura.addSeries(
            {
                name: dscSerie,
                data: arrPercGordura
            }
        );
    };

    $scope.updateGraficoCintura = function () {
        var dscSerie = $scope.atletaSelecionado["nome"];
        var arrBateria = $scope.atletaSelecionado["bateria"];

        var categories = [];
        var arrMedCintura = [];
        for (var i = 0; i < arrBateria.length; i++) {
            categories.push(arrBateria[i].indice);

            var medCintura = arrBateria[i].cintura;
            arrMedCintura.push(medCintura);
        }

        $scope.chartCintura.xAxis[0].setCategories(categories);
        $scope.chartCintura.addSeries(
            {
                name: dscSerie,
                data: arrMedCintura
            }
        );
    };

    $scope.updateGraficoAbdomen = function () {
        var dscSerie = $scope.atletaSelecionado["nome"];
        var arrBateria = $scope.atletaSelecionado["bateria"];

        var categories = [];
        var arrMedAbdomen = [];
        for (var i = 0; i < arrBateria.length; i++) {
            categories.push(arrBateria[i].indice);

            var medAbdomen = arrBateria[i].abdomen;
            arrMedAbdomen.push(medAbdomen);
        }

        $scope.chartAbdomen.xAxis[0].setCategories(categories);
        $scope.chartAbdomen.addSeries(
            {
                name: dscSerie,
                data: arrMedAbdomen
            }
        );
    };

    $scope.updateGraficoQuadril = function () {
        var dscSerie = $scope.atletaSelecionado["nome"];
        var arrBateria = $scope.atletaSelecionado["bateria"];

        var categories = [];
        var arrMedQuadril = [];
        for (var i = 0; i < arrBateria.length; i++) {
            categories.push(arrBateria[i].indice);

            var medQuadril = arrBateria[i].quadril;
            arrMedQuadril.push(medQuadril);
        }

        $scope.chartQuadril.xAxis[0].setCategories(categories);
        $scope.chartQuadril.addSeries(
            {
                name: dscSerie,
                data: arrMedQuadril
            }
        );
    };

    $scope.graficoPeso = {

        options: {
            chart: {
                type: "column"
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: "bold"
                }
            }
        },
        title: {
            text: "Massa corporal"
        },
        subtitle: {
            text: "Peso corporal em quilogramas (Kg)."
        },
        yAxis: {
            title: {text: "Peso (Kg)"},
            tickInterval: 10
        },
        size: {
            width: 600,
            height: 380
        },
        func: function (chart) {
            $scope.chartPeso = chart;
        }
    };

    $scope.graficoIMC = {

        options: {
            chart: {
                type: "column"
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: "bold"
                }
            }
        },
        title: {
            text: "Índice de massa corporal"
        },
        subtitle: {
            text: "O índice de massa corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso ideal. "
        },
        yAxis: {
            title: {text: "IMC"},
            plotBands: [
                {
                    from: 0,
                    to: 18.4,
                    color: "rgba(230, 230, 250, .1)",
                    label: {
                        text: "Abaixo",
                        style: {
                            fontSize: "9px"
                        }
                    }
                },
                {
                    from: 18.5,
                    to: 24.9,
                    color: "rgba(68, 170, 213, .2)",
                    label: {
                        text: "Normal",
                        style: {
                            fontSize: "9px"
                        }
                    }
                },
                {
                    from: 25,
                    to: 29.9,
                    color: "rgba(132, 112, 255, .2)",
                    label: {
                        text: "Sobrepeso",
                        style: {
                            fontSize: "9px"
                        }
                    }
                },
                {
                    from: 30,
                    to: 34.9,
                    color: "rgba(255, 236, 139, .2)",
                    label: {
                        text: "Obesidade grau 1",
                        style: {
                            fontSize: "9px"
                        }
                    }
                },
                {
                    from: 35,
                    to: 39.9,
                    color: "rgba(238, 99, 99, .2)",
                    label: {
                        text: "Obesidade grau 2",
                        style: {
                            fontSize: "9px"
                        }
                    }
                }
            ],
            minTickInterval: 0.5,
            max: 40
        },
        size: {
            width: 600,
            height: 380
        },
        func: function (chart) {
            $scope.chartIMC = chart;
        }
    };

    $scope.graficoRCQ = {

        options: {
            chart: {
                type: "column"
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: "bold"
                }
            }
        },
        title: {
            text: "RELAÇÃO CINTURA X QUADRIL"
        },
        subtitle: {
            text: "A relação cintura-quadril é um índice utilizado para verificar a presença de gordura na região abdominal, e constitui um elemento para prognóstico de eventos cardiovasculares em adultos."
        },
        yAxis: {
            title: {text: "RCQ"},
            tickInterval: 0.5
        },
        size: {
            width: 600,
            height: 380
        },
        func: function (chart) {
            $scope.chartRCQ = chart;
        }
    };

    $scope.graficoPercentualMassa = {

        options: {
            chart: {
                type: "column"
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: "bold"
                }
            }
        },
        title: {
            text: "Massa muscular"
        },
        subtitle: {
            text: "Percentual de massa muscular."
        },
        yAxis: {
            title: {text: "Percentual (%)"},
            tickInterval: 5
        },
        size: {
            width: 600,
            height: 380
        },
        func: function (chart) {
            $scope.chartPercentualMassa = chart;
        }
    };

    $scope.graficoPercentualGordura = {

        options: {
            chart: {
                type: "column"
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: "bold"
                }
            }
        },
        title: {
            text: "Gordura corporal"
        },
        subtitle: {
            text: "Percentual de gordura corporal."
        },
        yAxis: {
            title: {text: "Percentual (%)"},
            tickInterval: 5,
        },
        size: {
            width: 600,
            height: 380
        },
        func: function (chart) {
            $scope.chartPercentualGordura = chart;
        }
    };

    $scope.graficoCintura = {

        options: {
            chart: {
                type: "column"
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: "bold"
                }
            }
        },
        title: {
            text: "Cintura"
        },
        subtitle: {
            text: "Medida da cintura."
        },
        yAxis: {
            title: {text: "Centímetros (cm)"},
            tickInterval: 5,
        },
        size: {
            width: 600,
            height: 380
        },
        func: function (chart) {
            $scope.chartCintura = chart;
        }
    };

    $scope.graficoAbdomen = {

        options: {
            chart: {
                type: "column"
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: "bold"
                }
            }
        },
        title: {
            text: "Abdomen"
        },
        subtitle: {
            text: "Medida do abdomen."
        },
        yAxis: {
            title: {text: "Centímetros (cm)"},
            tickInterval: 1,
        },
        size: {
            width: 600,
            height: 380
        },
        func: function (chart) {
            $scope.chartAbdomen = chart;
        }
    };

    $scope.graficoQuadril = {

        options: {
            chart: {
                type: "column"
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: "bold"
                }
            }
        },
        title: {
            text: "Quadril"
        },
        subtitle: {
            text: "Medida do quadril."
        },
        yAxis: {
            title: {text: "Centímetros (cm)"},
            tickInterval: 1,
        },
        size: {
            width: 600,
            height: 380
        },
        func: function (chart) {
            $scope.chartQuadril = chart;
        }
    };

}]);