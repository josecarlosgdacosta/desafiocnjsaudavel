var cnjsaudavel = angular.module("CnjSaudavel", ["highcharts-ng"]);

cnjsaudavel.service("AtletaService", ["$http", function ($http) {
    return {
        getAtletas: function () {
            return $http.get("http://localhost/desafiocnjsaudavel/js/atletas.json");
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
                    valueSuffix: ' Kg'
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

    $scope.graficoPeso = {

        options: {
            chart: {
                type: "column"
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            }
        },
        title: {
            text: 'Massa corporal'
        },
        subtitle: {
            text: "Peso corporal em quilogramas (Kg)."
        },
        yAxis: {
            title: {text: 'Peso (Kg)'},
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
                    fontWeight: 'bold'
                }
            }
        },
        title: {
            text: 'RELAÇÃO CINTURA X QUADRIL'
        },
        subtitle: {
            text: "A relação cintura-quadril é um índice utilizado para verificar a presença de gordura na região abdominal, e constitui um elemento para prognóstico de eventos cardiovasculares em adultos."
        },
        yAxis: {
            title: {text: 'RCQ'},
            tickInterval: 0.5,
            max: 2
        },
        size: {
            width: 600,
            height: 380
        },
        func: function (chart) {
            $scope.chartRCQ = chart;
        }
    };

}]);