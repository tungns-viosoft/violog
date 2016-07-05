
var config = {
    type: 'line',
    data: {
        labels: input.size,
        datasets: []
    },
    options: {
        responsive: true,
        legend: {
            position: 'bottom',
        },
        hover: {
            mode: 'label'
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Size'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Zero loss'
                }
            }]
        },
        title: {
            display: true,
            text: 'CAW test'
        }
    }
};

var randomColorFactor = function() {
    return Math.round(Math.random() * 255);
};

var randomColor = function(opacity) {
    return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
};


function loadChart(input, canvasId){

    addChart(input);

    window.onload = function() {
        var ctx = document.getElementById(canvasId).getContext("2d");
        window.myLine = new Chart(ctx, config);
    };

};

function reloadChart(){
    window.myLine.update();
}



function addChart(input){
    var ln = input.lines[0].zero_loss;

    for(var i = 1; i < input.lines.length; i++){
        $.each(input.lines[i].zero_loss, function(j, vl){
            ln[j] += vl;
        });
    }

    $.each(input.lines, function(i, l){
        ln[i] = ln[i] / input.lines.length;
    });

    console.log(ln);

    var background = randomColor(0.5);

    var newset = {
        label: input.session,
        data: ln;
        fill: false

        borderColor: background,
        backgroundColor: background,
        pointBorderColor: background,
        pointBackgroundColor: background,
        pointBorderWidth: 1,
    }

    config.data.datasets.push(newset);
}

