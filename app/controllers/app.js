var app = angular.module("CalculatorApp", []);

app.controller("appCtrl", ['$scope', '$http', function($scope, $http){

    const operands = ['+', '-', '/', '*', '.'];
    const URL = 'http://data.fixer.io/api/';
    const API_KEY = '60408f3b0e3acb55c5c6b29420577593';
    const BASE = 'EUR';

    $scope.initialize = () => {
        $scope.input = '';
        $scope.res = '0';
        $scope.rates = [];
        $scope.previousCurrency = '';
        $scope.selectedCurrency = null;
        cnt = 0;

        $http({
            url: URL + 'latest',
            method: 'GET',
            params: {access_key: API_KEY}
        }).then(resp => {
            angular.forEach(resp.data.rates, (val, idx) => {
                $scope.rates[cnt] = {
                    name: idx,
                    rate: val
                }
                cnt++;
            })
        }, resp => {
            console.log('Failed to get a response: ', resp);
        });
    };

    $scope.clearAll = () => {
        $scope.input = '';
        $scope.res = '0';
        $scope.previousCurrency = '';
        $scope.selectedCurrency = null;
    }

    $scope.backspace = () => {

        if ($scope.res.length == 1) {
            $scope.input = '';
            $scope.res = '0';
        } else if ($scope.res.length > 1) {
            $scope.input = $scope.res.slice(0, -1);
            $scope.res = $scope.input;
        }
    };

    $scope.handleOperand = (operand) => {
        if ($scope.input.length == 0) {
            $scope.input = '0' + operand;
        } else if (!operands.includes($scope.input.slice(-1))) {
            $scope.input += operand;
        } else {
            $scope.input = $scope.input.slice(0, -1);
            $scope.input += operand;
        }
        $scope.res = $scope.input;
    };

    $scope.operate = () => {

        if (!operands.includes($scope.input.slice(-1))) {
            $scope.input = eval($scope.input).toString();
        } else {
            $scope.input = $scope.input.slice(0, -1);
            $scope.input = eval($scope.input).toString();
        }

        $scope.res = $scope.input;
    };

    $scope.handleNum = (input) => {

        $scope.input += input.toString();
        $scope.res = $scope.input;
    };

    function search(nameKey){
        for (var i=0; i < $scope.rates.length; i++) {
            if ($scope.rates[i].name === nameKey) {
                return $scope.rates[i].rate;
            }
        }
    };

    $scope.convert = () => {

        if($scope.previousCurrency != '') {
            $scope.input = (($scope.input / search($scope.previousCurrency.name)) * search($scope.selectedCurrency.name)).toString();
            $scope.previousCurrency = $scope.selectedCurrency;
        } else {
            $scope.input = ($scope.input * search($scope.selectedCurrency.name)).toString();
            $scope.previousCurrency = $scope.selectedCurrency;
        }

        $scope.res = $scope.input;
    };

}]);